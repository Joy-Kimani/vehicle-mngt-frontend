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

  // fetch all bookings for the user
  const {data: bookings,isLoading: loadingBookings,error: bookingsError} = BookingsApi.useGetBookingsByUserQuery(user_id ?? skipToken);

  // booking ID 
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);

  // fetch: Payment + Vehicle details 
  const {data: details,isLoading: loadingDetails,refetch,} = BookingsApi.useGetAllBookingandPaymentDetailsQuery(selectedBookingId ?? skipToken);

  // Mutations
  const [extendBooking, { isLoading: extending }] = BookingsApi.usePutExtensionDeadlineMutation();
  const [cancelBooking, { isLoading: cancelling }] = BookingsApi.useCancelBookingMutation();

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
                className="animate-pulse bg-gray-200 h-10 rounded-lg"
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

        {/* BOOKINGS LIST TABLE */}
        {Array.isArray(bookings) && bookings.length > 0 && (
          <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((b) => (
                  <tr key={b.booking_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{b.booking_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          b.booking_status === "Active" ? "bg-green-100 text-green-800" :
                          b.booking_status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                      }`}>
                          {b.booking_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                      {b.booking_status === "Active" && (
                        <button
                          onClick={() => handleExtend(b.booking_id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600"
                          disabled={extending}
                        >
                          {extending ? "Extending..." : "Extend"}
                        </button>
                      )}

                      {["Pending", "Active"].includes(b.booking_status) && (
                        <button
                          onClick={() => handleCancel(b.booking_id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
                          disabled={cancelling}
                        >
                          {cancelling ? "Cancelling..." : "Cancel"}
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedBookingId(b.booking_id)}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DETAILS PANEL TABLE */}
        {selectedBookingId && details && (
          <div className="p-5 mt-6 border rounded-xl bg-white shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Booking Details {details.booking.booking_id}
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                  <tbody>
                      <tr className="bg-gray-50">
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700 w-1/4">Vehicle</td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{details.vehicle.manufacturer} {details.vehicle.model}</td>
                      </tr>
                      <tr>
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Rental Start Date</td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{format(new Date(details.booking.booking_date), "yyyy-MM-dd")}</td>
                      </tr>
                      <tr className="bg-gray-50">
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Scheduled Return Date</td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{format(new Date(details.booking.return_date), "yyyy-MM-dd")}</td>
                      </tr>
                      <tr>
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Total Amount</td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">Ksh {details.booking.total_amount}</td>
                      </tr>
                      <tr className="bg-gray-50">
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Payment Status</td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{details.payment?.payment_status ?? "Not Paid"}</td>
                      </tr>
                  </tbody>
              </table>
            </div>

            <button
              onClick={() => setSelectedBookingId(null)}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
            >
              Close Details
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

