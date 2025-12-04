import React, { useState } from "react";
import AdminLayout from "../../components/adminDashboard/AdminLayout";

// Example booking type
interface Booking {
  id: number;
  property: string;
  user: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: "pending" | "approved" | "rejected" | "checked-in" | "checked-out" | "cancelled";
  notes?: string;
}

const AllBookings: React.FC = () => {
  
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 101,
      property: "Apartment A1",
      user: "Joy Kimani",
      startDate: "2025-12-10",
      endDate: "2025-12-15",
      amount: 15000,
      status: "pending",
    },
    {
      id: 102,
      property: "Apartment B2",
      user: "Michael Doe",
      startDate: "2025-12-12",
      endDate: "2025-12-20",
      amount: 25000,
      status: "approved",
    },
  ]);

  // Approve booking
  const approveBooking = (id: number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "approved" } : b))
    );
  };

  // Reject booking
  const rejectBooking = (id: number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "rejected" } : b))
    );
  };

  // Check-in / Check-out
  const checkInOut = (id: number) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "checked-in" ? "checked-out" : "checked-in" }
          : b
      )
    );
  };

  // Cancel booking
  const cancelBooking = (id: number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );
  };

  // Update notes
  const updateNotes = (id: number, notes: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, notes } : b))
    );
  };

  return (
    <AdminLayout>
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Booking Management</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Model</th>
              <th>User</th>
              <th>Dates</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.property}</td>
                <td>{b.user}</td>
                <td>
                  {b.startDate} → {b.endDate}
                </td>
                <td>KES{b.amount}</td>
                <td>
                  <span
                    className={
                      b.status === "approved"
                        ? "text-success"
                        : b.status === "rejected"
                        ? "text-error"
                        : b.status === "pending"
                        ? "text-warning"
                        : b.status === "checked-in"
                        ? "text-info"
                        : b.status === "checked-out"
                        ? "text-primary"
                        : "text-gray-400"
                    }
                  >
                    {b.status}
                  </span>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Add note..."
                    className="input input-sm input-bordered w-full"
                    value={b.notes || ""}
                    onChange={(e) => updateNotes(b.id, e.target.value)}
                  />
                </td>
                <td className="flex flex-wrap gap-1">
                  {b.status === "pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => approveBooking(b.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => rejectBooking(b.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {(b.status === "approved" || b.status === "checked-in") && (
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => checkInOut(b.id)}
                    >
                      {b.status === "checked-in" ? "Check-out" : "Check-in"}
                    </button>
                  )}
                  {b.status !== "cancelled" && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => cancelBooking(b.id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AllBookings;
