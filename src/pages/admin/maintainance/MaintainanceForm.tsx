import React, { useState } from "react";

export default function MaintenanceForm() {
  const [form, setForm] = useState({
    property: "",
    issue: "",
    tenant: "",
    cost: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Maintenance Request</h2>

      <div className="form-control mb-3">
        <label className="label">Property</label>
        <input name="property" className="input input-bordered" onChange={handleChange} />
      </div>

      <div className="form-control mb-3">
        <label className="label">Tenant</label>
        <input name="tenant" className="input input-bordered" onChange={handleChange} />
      </div>

      <div className="form-control mb-3">
        <label className="label">Issue Description</label>
        <textarea name="issue" className="textarea textarea-bordered" onChange={handleChange} />
      </div>

      <button className="btn btn-primary mt-3">Submit</button>
    </div>
  );
}
