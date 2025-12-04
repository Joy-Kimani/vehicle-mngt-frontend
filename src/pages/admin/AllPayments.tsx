import React, { useState } from "react";
import AdminLayout from "../../components/adminDashboard/AdminLayout";

interface Payment {
  id: number;
  bookingId: number;
  user: string;
  amount: number;
  status: "paid" | "pending" | "failed" | "refunded";
  method: string;
  date: string;
}

const AllPayments: React.FC = () => {
  // Dummy data
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 201,
      bookingId: 101,
      user: "Joy Kimani",
      amount: 15000,
      status: "paid",
      method: "Card",
      date: "2025-12-02",
    },
    {
      id: 202,
      bookingId: 102,
      user: "Michael Doe",
      amount: 25000,
      status: "pending",
      method: "Card",
      date: "2025-12-03",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Filter payments
  const filteredPayments =
    filterStatus === "all"
      ? payments
      : payments.filter((p) => p.status === filterStatus);

  // Change status manually
  const changeStatus = (id: number, status: Payment["status"]) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  // Refund payment
  const issueRefund = (id: number) => {
    alert(`Refund issued for Payment ID: ${id}`);
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "refunded" } : p))
    );
  };

  return (
    <AdminLayout>
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Payments Management</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          className="select select-bordered w-48"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>

        <button
          className="btn btn-sm btn-primary"
          onClick={() => alert("Export to CSV (placeholder)")}
        >
          Export CSV
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => alert("Export to PDF (placeholder)")}
        >
          Export PDF
        </button>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto mt-4">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Booking ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Method</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.bookingId}</td>
                <td>{p.user}</td>
                <td>KES{p.amount}</td>
                <td>
                  <span
                    className={
                      p.status === "paid"
                        ? "text-success"
                        : p.status === "pending"
                        ? "text-warning"
                        : p.status === "failed"
                        ? "text-error"
                        : "text-info"
                    }
                  >
                    {p.status}
                  </span>
                </td>
                <td>{p.method}</td>
                <td>{p.date}</td>
                <td className="flex flex-wrap gap-1">
                  {p.status !== "paid" && p.status !== "refunded" && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => changeStatus(p.id, "paid")}
                    >
                      Mark Paid
                    </button>
                  )}
                  {p.status !== "pending" && p.status !== "refunded" && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => changeStatus(p.id, "pending")}
                    >
                      Mark Pending
                    </button>
                  )}
                  {p.status !== "failed" && p.status !== "refunded" && (
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => changeStatus(p.id, "failed")}
                    >
                      Mark Failed
                    </button>
                  )}
                  {p.status !== "refunded" && (
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => issueRefund(p.id)}
                    >
                      Refund
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline btn-accent"
                    onClick={() => alert(`View receipt for Payment ID: ${p.id}`)}
                  >
                    Receipt
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={() => alert(`Verify transaction for Payment ID: ${p.id}`)}
                  >
                    Verify
                  </button>
                </td>
              </tr>
            ))}

            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Webhook logs placeholder */}
      <div className="bg-base-100 p-4 rounded-xl shadow mt-4">
        <h2 className="text-lg font-semibold mb-2">Webhook Logs</h2>
        <p>Latest webhook events will appear here (placeholder).</p>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AllPayments;

