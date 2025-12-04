import React from "react";

export default function MaintenanceDetails() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Maintenance Request #1</h2>

      <div className="card bg-base-100 shadow p-4">
        <p><strong>Property:</strong> House A</p>
        <p><strong>Tenant:</strong> John Doe</p>
        <p><strong>Issue:</strong> Water leakage in kitchen</p>
        <p><strong>Status:</strong> Pending</p>

        <select className="select select-bordered mt-3">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button className="btn btn-primary mt-3">Update Status</button>
      </div>
    </div>
  );
}
