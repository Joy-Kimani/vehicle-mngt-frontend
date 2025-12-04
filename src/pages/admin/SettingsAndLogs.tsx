import React, { useState } from "react";

// Example types
interface LogEntry {
  id: number;
  type: string;
  message: string;
  date: string;
}

const SettingsAndLogs: React.FC = () => {
  // Dummy system settings
  const [settings, setSettings] = useState({
    paystackPublicKey: "",
    paystackSecretKey: "",
    commissionFee: 5, // %
    taxRate: 7, // %
    roles: ["admin", "manager", "staff", "tenant"],
    emailTemplate: "Welcome {{user}}, your booking is confirmed.",
    terms: "Default terms and conditions...",
    privacyPolicy: "Default privacy policy...",
    contactInfo: "support@rentalsystem.com",
  });

  // Dummy logs
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, type: "Error", message: "Payment failed for Booking #102", date: "2025-12-02 14:30" },
    { id: 2, type: "Info", message: "New booking created for Apartment A5", date: "2025-12-02 12:15" },
    { id: 3, type: "Webhook", message: "Unhandled webhook event type: undefined", date: "2025-12-02 10:00" },
  ]);

  // Handle input changes
  const handleChange = (field: string, value: string | number) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  // Save settings (placeholder)
  const saveSettings = () => {
    alert("Settings saved (placeholder)");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">System Settings & Logs</h1>

      {/* SYSTEM SETTINGS */}
      <div className="bg-base-100 p-4 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">System Configuration</h2>

        {/* Payment Gateway */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Paystack Public Key</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={settings.paystackPublicKey}
              onChange={(e) => handleChange("paystackPublicKey", e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Paystack Secret Key</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={settings.paystackSecretKey}
              onChange={(e) => handleChange("paystackSecretKey", e.target.value)}
            />
          </div>
        </div>

        {/* Fees & Tax */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Commission Fee (%)</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={settings.commissionFee}
              onChange={(e) => handleChange("commissionFee", Number(e.target.value))}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tax / VAT (%)</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={settings.taxRate}
              onChange={(e) => handleChange("taxRate", Number(e.target.value))}
            />
          </div>
        </div>

        {/* Roles */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Roles & Permissions (comma-separated)</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={settings.roles.join(", ")}
            onChange={(e) => handleChange("roles", e.target.value.split(",").map((r) => r.trim()))}
          />
        </div>

        {/* Email Template */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Default Email Template</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            value={settings.emailTemplate}
            onChange={(e) => handleChange("emailTemplate", e.target.value)}
          />
        </div>

        {/* Website Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Terms & Conditions</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              value={settings.terms}
              onChange={(e) => handleChange("terms", e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Privacy Policy</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              value={settings.privacyPolicy}
              onChange={(e) => handleChange("privacyPolicy", e.target.value)}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Contact Info</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={settings.contactInfo}
            onChange={(e) => handleChange("contactInfo", e.target.value)}
          />
        </div>

        <button className="btn btn-primary mt-4" onClick={saveSettings}>
          Save Settings
        </button>
      </div>

      {/* LOGS & MONITORING */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Logs & Monitoring</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.type}</td>
                  <td>{log.message}</td>
                  <td>{log.date}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center">
                    No logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SettingsAndLogs;
