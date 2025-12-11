import React from "react";
import AdminLayout from "../../components/adminDashboard/AdminLayout";
import { BookingsApi } from "../../features/Api/BookingsApi";
import type { BookingResponse } from "../../Types/types";

const AllBookings: React.FC = () => {
  // Fetch all bookings
  const { data: bookings = [], isLoading, error } = BookingsApi.useGetAllBookingsQuery();

  // Mutations
  const [approveBookingMutation] = BookingsApi.useApproveBookingMutation();
  const [cancelBookingMutation] = BookingsApi.useCancelBookingMutation();
  const [updateBookingMutation] = BookingsApi.useUpdateBookingMutation();

  // Approve booking
  const handleApprove = async (booking_id: number) => {
    try {
      await approveBookingMutation(booking_id).unwrap();
      console.log("Booking approved:", booking_id);
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  // Reject booking
  const handleReject = async (booking_id: number) => {
    try {
      await updateBookingMutation({ booking_id, booking_status: "Rejected" }).unwrap();
      console.log("Booking rejected:", booking_id);
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  // Check-in / Check-out toggle
  const handleCheckInOut = async (b: BookingResponse) => {
    try {
      const newStatus =
        b.booking_status === "Active" || b.booking_status === "Approved"
          ? "Completed"
          : "Active";
      await updateBookingMutation({ booking_id: b.booking_id, booking_status: newStatus }).unwrap();
      console.log("Booking status updated:", b.booking_id);
    } catch (err) {
      console.error("Failed to update check-in/out:", err);
    }
  };

  // Cancel booking
  const handleCancel = async (booking_id: number) => {
    try {
      await cancelBookingMutation({ booking_id }).unwrap();
      console.log("Booking cancelled:", booking_id);
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  // Update notes
  const handleUpdateNotes = async (booking_id: number, notes: string) => {
    try {
      await updateBookingMutation({ booking_id, notes }).unwrap();
      console.log("Notes updated:", booking_id);
    } catch (err) {
      console.error("Failed to update notes:", err);
    }
  };

  if (isLoading) return <AdminLayout>Loading bookings...</AdminLayout>;
  if (error) return <AdminLayout>Error loading bookings</AdminLayout>;

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
              {bookings.map((b: BookingResponse) => (
                <tr key={b.booking_id}>
                  <td>{b.booking_id}</td>
                  <td>{b.vehicle_id}</td>
                  <td>{b.user_id}</td>
                  <td>{b.booking_date} → {b.return_date}</td>
                  <td>KES{b.total_amount}</td>
                  <td>
                    <span
                      className={
                        b.booking_status === "Approved" ? "text-success" :
                        b.booking_status === "Rejected" ? "text-error" :
                        b.booking_status === "Pending" ? "text-warning" :
                        b.booking_status === "Completed" ? "text-info" :
                        b.booking_status === "Active" ? "text-primary" : "text-gray-400"
                      }
                    >
                      {b.booking_status}
                    </span>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Add note..."
                      className="input input-sm input-bordered w-full"
                      defaultValue={b.notes || ""}
                      onBlur={(e) => handleUpdateNotes(b.booking_id, e.target.value)}
                    />
                  </td>
                  <td className="flex flex-wrap gap-1">
                    {b.booking_status === "Pending" && (
                      <>
                        <button className="btn btn-sm btn-success" onClick={() => handleApprove(b.booking_id)}>Approve</button>
                        <button className="btn btn-sm btn-error" onClick={() => handleReject(b.booking_id)}>Reject</button>
                      </>
                    )}
                    {(b.booking_status === "Approved" || b.booking_status === "Active") && (
                      <button className="btn btn-sm btn-info" onClick={() => handleCheckInOut(b)}>
                        {b.booking_status === "Active" ? "Check-out" : "Check-in"}
                      </button>
                    )}
                    {b.booking_status !== "Cancelled" && (
                      <button className="btn btn-sm btn-warning" onClick={() => handleCancel(b.booking_id)}>Cancel</button>
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

