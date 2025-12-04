import React from "react";

export default function TicketDetails() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-3">Ticket #1 - Rent Overcharge</h2>

      <div className="chat chat-start mb-4">
        <div className="chat-bubble">Hello, I was overcharged this month.</div>
      </div>

      <div className="chat chat-end mb-4">
        <div className="chat-bubble">We are checking this for you.</div>
      </div>

      <textarea className="textarea textarea-bordered w-full" placeholder="Reply..."></textarea>

      <button className="btn btn-primary mt-3">Send Reply</button>
    </div>
  );
}
