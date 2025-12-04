import React, { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    paystack_public_key: "",
    paystack_secret_key: "",
    mode: "test",
    commission: 0,
    vat: 0,
    email_template: "Hello {{name}},\nYour payment was received.",
  });

  const handleChange = (e: any) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">System Settings</h2>

      {/* --- PAYMENT GATEWAY SECTION --- */}

      <div className="card bg-base-100 shadow p-5 mb-6">
        <h3 className="text-lg font-bold mb-2">Payment Gateway (Paystack)</h3>

        <div className="form-control mb-3">
          <label className="label">Paystack Public Key</label>
          <input
            type="text"
            name="paystack_public_key"
            className="input input-bordered"
            value={settings.paystack_public_key}
            onChange={handleChange}
          />
        </div>

        <div className="form-control mb-3">
          <label className="label">Paystack Secret Key</label>
          <input
            type="text"
            name="paystack_secret_key"
            className="input input-bordered"
            value={settings.paystack_secret_key}
            onChange={handleChange}
          />
        </div>

        <div className="form-control mb-3">
          <label className="label">Mode</label>
          <select
            name="mode"
            className="select select-bordered"
            value={settings.mode}
            onChange={handleChange}
          >
            <option value="test">Test Mode</option>
            <option value="live">Live Mode</option>
          </select>
        </div>
      </div>

      {/* --- FEES SECTION --- */}

      <div className="card bg-base-100 shadow p-5 mb-6">
        <h3 className="text-lg font-bold mb-2">Commission & Tax Settings</h3>

        <div className="form-control mb-3">
          <label className="label">Commission (%)</label>
          <input
            type="number"
            name="commission"
            className="input input-bordered"
            value={settings.commission}
            onChange={handleChange}
          />
        </div>

        <div className="form-control mb-3">
          <label className="label">VAT (%)</label>
          <input
            type="number"
            name="vat"
            className="input input-bordered"
            value={settings.vat}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* --- EMAIL TEMPLATES SECTION --- */}

      <div className="card bg-base-100 shadow p-5 mb-6">
        <h3 className="text-lg font-bold mb-2">Email Template</h3>

        <textarea
          name="email_template"
          className="textarea textarea-bordered h-40"
          value={settings.email_template}
          onChange={handleChange}
        />

        <p className="text-sm opacity-60 mt-2">
          Variables you can use:{" "}
          <code className="bg-base-200 px-1 rounded">{"{{name}}"}</code>,{" "}
          <code className="bg-base-200 px-1 rounded">{"{{amount}}"}</code>,{" "}
          <code className="bg-base-200 px-1 rounded">{"{{booking_id}}"}</code>
        </p>
      </div>

      {/* SAVE BUTTON */}

      <button className="btn btn-primary w-full">Save Settings</button>
    </div>
  );
}
