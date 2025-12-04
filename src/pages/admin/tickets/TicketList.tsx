import React from "react";

const tickets = [
  { id: 1, subject: "Rent Overcharge", status: "Open", user: "James" },
  { id: 2, subject: "Broken AC", status: "Pending", user: "Sarah" },
];

export default function TicketList() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Support Tickets</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Subject</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.user}</td>
                <td>{t.subject}</td>
                <td>
                  <div className={`badge badge-${t.status === "Open" ? "error" : "warning"}`}>
                    {t.status}
                  </div>
                </td>
                <td>
                  <a className="btn btn-xs btn-outline" href={`/admin/tickets/${t.id}`}>
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
