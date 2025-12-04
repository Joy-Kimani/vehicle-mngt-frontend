import React from "react";

const notifs = [
  { id: 1, message: "Rent due reminder sent", date: "2025-12-01" },
  { id: 2, message: "Payment failed for Booking #12", date: "2025-12-03" },
];

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">System Notifications</h2>

      <ul className="menu bg-base-100 w-full rounded-box shadow">
        {notifs.map((n) => (
          <li key={n.id}>
            <a>{n.message} — <span className="text-sm opacity-70">{n.date}</span></a>
          </li>
        ))}
      </ul>
    </div>
  );
}
