import React, { useState } from "react";

const mockMaintenance = [
  { id: 1, property: "House A", status: "Pending", cost: 0, tenant: "John Doe" },
  { id: 2, property: "Apartment 12", status: "In Progress", cost: 1200, tenant: "Sarah Kim" },
];

export default function MaintenanceList() {
  const [requests, setRequests] = useState(mockMaintenance);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Maintenance Requests</h2>
        <a href="/admin/maintenance/new" className="btn btn-primary">
          + New Request
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Property</th>
              <th>Tenant</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.property}</td>
                <td>{req.tenant}</td>
                <td>
                  <span className={`badge badge-${req.status === "Pending" ? "warning" :
                    req.status === "In Progress" ? "info" : "success"}`}>
                    {req.status}
                  </span>
                </td>
                <td>KES {req.cost}</td>
                <td>
                  <a href={`/admin/maintenance/${req.id}`} className="btn btn-xs btn-outline">
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
