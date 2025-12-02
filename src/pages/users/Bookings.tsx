import React, { useState, useCallback, useEffect } from "react";
import UserLayOut from "../../components/userDashboard/UserLayOut";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { BookingsApi } from "../../features/Api/BookingsApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { format } from "date-fns";

const Bookings: React.FC = () => {
  // Get logged in user
  const { user } = useSelector((state: RootState) => state.authSlice);
  const user_id = user?.user_id;

  // 1️⃣ Fetch: ALL bookings for the user
  const {
    data: bookings,
    isLoading: loadingBookings,
    error: bookingsError,
  } = BookingsApi.useGetBookingsByUserQuery(user_id ?? skipToken);

  // 2️⃣ Selected booking ID (for details)
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );

  // 3️⃣ Fetch: Payment + Vehicle details (only when selected)
  const {
    data: details,
    isLoading: loadingDetails,
    refetch,
  } = BookingsApi.useGetAllBookingandPaymentDetailsQuery(
    selectedBookingId ?? skipToken
  );

  // Mutations
  const [extendBooking, { isLoading: extending }] =
    BookingsApi.usePutExtensionDeadlineMutation();
  const [cancelBooking, { isLoading: cancelling }] =
    BookingsApi.useCancelBookingMutation();

  // Toast
  const [toast, setToast] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Extend booking
  const handleExtend = useCallback(
    async (bookingId: number) => {
      const newDate = prompt("Enter new return date (YYYY-MM-DD):");
      if (!newDate) return;

      if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
        setToast({ type: "error", text: "Invalid date format (YYYY-MM-DD)." });
        return;
      }

      try {
        await extendBooking({ booking_id: bookingId, return_date: newDate }).unwrap();
        setToast({ type: "success", text: "Booking extended successfully." });
        refetch();
      } catch (err: any) {
        const msg = err?.data?.message || "Failed to extend booking.";
        setToast({ type: "error", text: msg });
      }
    },
    [extendBooking, refetch]
  );

  // Cancel booking
  const handleCancel = useCallback(
    async (bookingId: number) => {
      if (!confirm("Are you sure you want to cancel this booking?")) return;

      try {
        await cancelBooking({ booking_id: bookingId }).unwrap();
        setToast({ type: "success", text: "Booking cancelled." });
        refetch();
      } catch (err: any) {
        const msg = err?.data?.message || "Failed to cancel booking.";
        setToast({ type: "error", text: msg });
      }
    },
    [cancelBooking, refetch]
  );

  return (
    <UserLayOut>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Your Bookings</h1>
        <p className="text-gray-500">Manage, extend, or cancel your rentals.</p>

        {/* LOADING BOOKINGS */}
        {loadingBookings && (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 h-24 rounded-lg"
              ></div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {bookingsError && (
          <div className="text-red-600 text-center">
            Failed to load bookings.
          </div>
        )}

        {/* EMPTY */}
        {Array.isArray(bookings) && bookings.length === 0 && (
          <div className="text-center text-gray-600 p-6 bg-gray-100 rounded-lg">
            You have no bookings.
          </div>
        )}

        {/* BOOKINGS LIST */}
        <div className="space-y-4">
          {Array.isArray(bookings) &&
            bookings.map((b) => (
              <div
                key={b.booking_id}
                className="p-4 border rounded-xl bg-white shadow-sm"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-semibold">
                      Booking #{b.booking_id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Status: {b.booking_status}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedBookingId(b.booking_id)}
                    className="text-blue-600 underline text-sm"
                  >
                    View Details
                  </button>
                </div>

                {/* ACTIONS */}
                <div className="mt-4 flex gap-3">
                  {b.booking_status === "Active" && (
                    <button
                      onClick={() => handleExtend(b.booking_id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                      disabled={extending}
                    >
                      {extending ? "Extending..." : "Extend"}
                    </button>
                  )}

                  {["Pending", "Active"].includes(b.booking_status) && (
                    <button
                      onClick={() => handleCancel(b.booking_id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                      disabled={cancelling}
                    >
                      {cancelling ? "Cancelling..." : "Cancel"}
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* DETAILS PANEL */}
        {selectedBookingId && details && (
          <div className="p-5 mt-6 border rounded-xl bg-white shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Booking Details #{details.booking.booking_id}
            </h2>

            <p><strong>Vehicle:</strong> {details.vehicle.manufacturer} {details.vehicle.model}</p>
            <p><strong>From:</strong> {format(new Date(details.booking.booking_date), "yyyy-MM-dd")}</p>
            <p><strong>To:</strong> {format(new Date(details.booking.return_date), "yyyy-MM-dd")}</p>
            <p><strong>Total:</strong> Ksh {details.booking.total_amount}</p>
            <p><strong>Payment:</strong> {details.payment?.payment_status ?? "Not Paid"}</p>

            <button
              onClick={() => setSelectedBookingId(null)}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6">
          <div
            className={`px-4 py-2 rounded-lg shadow-lg text-white ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.text}
          </div>
        </div>
      )}
    </UserLayOut>
  );
};

export default Bookings;


