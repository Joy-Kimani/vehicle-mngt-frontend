import React, { useState } from "react";
import UserLayOut from "../../components/userDashboard/UserLayOut";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  useCreateTicketMutation,
  useGetUserTicketsQuery,
} from "../../features/Api/TicketsApi";
import { ticketMessagesApi } from "../../features/Api/TicketMessagesApi";
import { skipToken } from "@reduxjs/toolkit/query/react";

// Types (Preserved)
interface Ticket {
  ticket_id: number;
  user_id: number;
  subject: string;
  description?: string;
  status: boolean; // true for Open, false for Resolved
}

interface Message {
  message: string;
  from_admin: boolean;
  created_at?: string;
}

const Support: React.FC = () => {
  const user = useSelector((state: RootState) => state.authSlice.user);
  const user_id = user?.user_id;

  // State (Preserved)
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // Queries (Preserved)
  const {
    data: tickets = [],
    isLoading: isTicketsLoading,
    refetch: refetchTickets,
  } = useGetUserTicketsQuery(user_id ?? skipToken);

  const {
    data: messages = [],
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = ticketMessagesApi.useGetMessagesQuery(
    selectedTicketId ?? skipToken
  );

  // Mutations (Preserved)
  const [createTicket, { isLoading: isCreating }] =
    useCreateTicketMutation();
  const [sendMessage, { isLoading: isSending }] =
    ticketMessagesApi.useSendMessageMutation();

  // Handlers (Preserved)
  const handleCreateTicket = async () => {
    if (!subject || !description) return;

    try {
      await createTicket({
        user_id,
        subject,
        description,
      }).unwrap();

      setSubject("");
      setDescription("");
      refetchTickets();
    } catch (error) {
      console.error("Create ticket failed:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedTicketId) return;

    try {
      await sendMessage({
        ticket_id: selectedTicketId,
        message,
        from_admin: false,
      }).unwrap();

      setMessage("");
      refetchMessages();
      refetchTickets();
    } catch (error) {
      console.error("Send message failed:", error);
    }
  };

  const selectedTicket = tickets.find(
    (t) => t.ticket_id === selectedTicketId
  );

  return (
    <UserLayOut>
      <div className="max-w-5xl mx-auto p-8 space-y-10 bg-zinc-900 min-h-screen">

        {/* PAGE TITLE */}
        <header className="border-b border-zinc-200 pb-4">
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Customer Support</h1>
          <p className="text-zinc-500 font-medium">Get assistance by raising a new ticket or viewing your conversation history.</p>
        </header>

        {/* MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
          {/* LEFT COLUMN: CREATE TICKET FORM */}
          <div className="md:col-span-1">
            <div className="bg-zinc-950 p-6 rounded-2xl shadow-xl border border-zinc-800">
              <h2 className="text-xl font-bold text-yellow-500 mb-6 border-b border-zinc-800 pb-3">Raise a New Ticket</h2>

              <input
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500 transition-colors placeholder-zinc-500 mb-4"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <textarea
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500 transition-colors placeholder-zinc-500 mb-6 min-h-[100px]"
                placeholder="Describe your issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <button
                className="w-full py-3 bg-yellow-500 text-zinc-950 font-black uppercase rounded-xl tracking-widest hover:bg-yellow-600 transition-all disabled:opacity-50"
                onClick={handleCreateTicket}
                disabled={isCreating || !subject || !description}
              >
                {isCreating ? "Submitting..." : "Submit Ticket"}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: TICKETS LIST */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">Your Active/Past Tickets</h2>

            {isTicketsLoading ? (
              <p className="text-zinc-500 p-4 bg-white rounded-xl">Loading tickets...</p>
            ) : tickets.length === 0 ? (
              <p className="text-zinc-500 p-4 bg-white rounded-xl">You have no support tickets yet.</p>
            ) : (
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.ticket_id}
                    className={`p-4 rounded-xl shadow cursor-pointer transition-all border ${
                        selectedTicketId === ticket.ticket_id
                        ? "bg-zinc-200 border-yellow-500 shadow-lg"
                        : "bg-white border-zinc-200 hover:bg-zinc-50"
                    }`}
                    onClick={() => setSelectedTicketId(ticket.ticket_id)}
                  >
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg text-zinc-900">{ticket.subject}</h3>
                        <div
                            className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                                ticket.status 
                                ? "bg-red-600 text-white" 
                                : "bg-green-600 text-white" 
                            }`}
                        >
                            {ticket.status ? "Open" : "Resolved"}
                        </div>
                    </div>
                    <p className="text-sm text-zinc-500 mt-1 line-clamp-1">{ticket.description}</p>
                    <p className="text-xs text-zinc-400 mt-2">Ticket ID: <span className="font-mono">{ticket.ticket_id}</span></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>


        {/* CONVERSATION MODAL (Using standard fixed positioning for modal) */}
        {selectedTicketId && selectedTicket && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-zinc-900 text-zinc-100 w-full max-w-2xl rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden transform transition-transform duration-300">
              
              {/* Modal Header */}
              <div className="p-5 border-b border-zinc-800 flex justify-between items-center">
                <h3 className="text-xl font-bold text-yellow-500">
                  {selectedTicket.subject}
                </h3>
                <div
                    className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                        selectedTicket.status 
                        ? "bg-red-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                >
                    {selectedTicket.status ? "Open" : "Resolved"}
                </div>
              </div>

              {/* Messages Container */}
              <div className="h-96 overflow-y-auto p-5 space-y-4">
                {isMessagesLoading ? (
                  <p className="text-zinc-400 text-center">Loading messages...</p>
                ) : messages.length === 0 ? (
                  <p className="text-zinc-500 text-center py-10">No messages in this conversation yet. Send the first one!</p>
                ) : (                  
                  messages.map((msg: Message, index: number) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.from_admin ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg shadow-md ${
                          msg.from_admin 
                            ? "bg-zinc-700 text-zinc-100 rounded-bl-none" 
                            : "bg-yellow-600 text-zinc-950 rounded-br-none"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <div className={`text-[10px] mt-1 ${msg.from_admin ? "text-zinc-400" : "text-zinc-950/80"} text-right`}>
                          {msg.created_at && new Date(msg.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input & Actions */}
              <div className="p-5 border-t border-zinc-800">
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500 transition-colors placeholder-zinc-500 mb-4 min-h-[60px]"
                  placeholder={
                    selectedTicket.status
                      ? "Type your message..."
                      : "This ticket is resolved. You cannot send new messages."
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={!selectedTicket.status || isSending}
                />

                <div className="flex justify-end gap-3">
                  <button
                    className="px-6 py-2 bg-zinc-700 text-white font-semibold rounded-xl hover:bg-zinc-600 transition-colors"
                    onClick={() => {
                      setSelectedTicketId(null);
                      setMessage("");
                    }}
                  >
                    Close
                  </button>

                  <button
                    className="px-6 py-2 bg-yellow-500 text-zinc-950 font-bold rounded-xl hover:bg-yellow-600 transition-colors disabled:opacity-50"
                    onClick={handleSendMessage}
                    disabled={!selectedTicket.status || isSending || !message.trim()}
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayOut>
  );
};

export default Support;