import React, { useState, type ChangeEvent, useEffect } from "react";
import { ticketsApi } from "../../features/Api/TicketsApi";
import { ticketMessagesApi } from "../../features/Api/TicketMessagesApi";
import AdminLayout from "../../components/adminDashboard/AdminLayout";
import { skipToken } from "@reduxjs/toolkit/query/react";

interface Ticket {
  ticket_id: number;
  user_id: number;
  subject: string;
  description?: string;
  status: boolean; 
}

interface Message {
  message: string;
  from_admin: boolean;
  created_at?: string;
}

const AllTickets: React.FC = () => {
  
  const { data: tickets = [], isLoading, refetch: ticketsRefetch } =
    ticketsApi.useGetAllTicketsQuery();

  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  const {
    data: messages = [],
    refetch: messagesRefetch,
  } = ticketMessagesApi.useGetMessagesQuery(selectedTicket ?? skipToken);

  /* ---------------- Mutations ---------------- */
  const [sendMessage] = ticketMessagesApi.useSendMessageMutation();
  const [resolveTicket] = ticketMessagesApi.useResolveTicketMutation();

  const [reply, setReply] = useState("");

  /* ---------------- Effects ---------------- */
  // Select first ticket by default
  useEffect(() => {
    if (tickets.length && !selectedTicket) {
      setSelectedTicket(tickets[0].ticket_id);
    }
  }, [tickets]);

  /* ---------------- Handlers ---------------- */
  const handleSend = async () => {
    if (!reply.trim() || !selectedTicket) return;

    try {
      await sendMessage({
        ticket_id: selectedTicket,
        message: reply,
        from_admin: true,
      }).unwrap();

      setReply("");
      messagesRefetch(); // refresh messages
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleResolve = async () => {
    if (!selectedTicket) return;

    try {
      await resolveTicket(selectedTicket).unwrap();
      ticketsRefetch(); // refresh tickets
    } catch (error) {
      console.error("Failed to resolve ticket:", error);
    }
  };

  /* ---------------- UI ---------------- */
  if (isLoading) return <div className="p-6">Loading tickets...</div>;

  return (
    <AdminLayout>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT – TICKET LIST */}
        <div className="col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">All Tickets</h1>
            <button
              className="btn btn-sm btn-info"
              onClick={() => ticketsRefetch()}
            >
              Refresh
            </button>
          </div>

          <div className="space-y-3">
            {tickets.map((t: Ticket) => (
              <div
                key={t.ticket_id}
                onClick={() => setSelectedTicket(t.ticket_id)}
                className={`card shadow-md p-4 cursor-pointer transition hover:bg-base-200
                  ${selectedTicket === t.ticket_id ? "bg-base-200" : ""}`}
              >
                <h3 className="font-bold">{t.subject}</h3>
                <p className="text-sm opacity-70">
                  Ticket #{t.ticket_id} • User {t.user_id}
                </p>

                <span
                  className={`badge mt-2 ${
                    t.status ? "badge-warning" : "badge-success"
                  }`}
                >
                  {t.status ? "Open" : "Resolved"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – CHAT VIEW */}
        <div className="col-span-2">
          {selectedTicket ? (
            <>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">
                  Ticket #{selectedTicket} Conversation
                </h2>
                <div className="space-x-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => messagesRefetch()}
                  >
                    Refresh Messages
                  </button>
                  <button
                    className="btn btn-success"
                    disabled={
                      !tickets.find(
                        (t) => t.ticket_id === selectedTicket
                      )?.status
                    }
                    onClick={handleResolve}
                  >
                    Resolve Ticket
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[60vh] overflow-y-auto p-4 bg-base-200 rounded-lg space-y-2">
                {messages.map((m: Message, idx: number) => (
                  <div
                    key={idx}
                    className={`chat ${
                      m.from_admin ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div
                      className={`chat-bubble ${
                        m.from_admin ? "chat-bubble-primary" : "chat-bubble"
                      }`}
                    >
                      {m.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="mt-4 flex gap-3">
                <input
                  type="text"
                  placeholder="Type a reply..."
                  value={reply}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setReply(e.target.value)
                  }
                  className="input input-bordered w-full"
                />
                <button className="btn btn-primary" onClick={handleSend}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <p className="text-lg opacity-70">
              Select a ticket to view messages
            </p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllTickets;
