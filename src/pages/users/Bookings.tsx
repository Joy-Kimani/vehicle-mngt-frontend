import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserDashboardApi } from "../../features/Api/UserDashboard";
import type { RootState } from "../../features/Api/slice";
import BookingDetailsModal from "../../components/userDashboard/ BookingDetailsModal";

const Bookings: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.authSlice);
  const user_id = user?.user_id;

  const { data: bookings = [], isLoading, error } = UserDashboardApi.useGetAllBookingsQuery(
    { user_id: user_id! },
    { skip: !user_id }
  );

  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Bookings</h1>

      {isLoading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching bookings.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Vehicle</th>
                <th className="py-3 px-4">Booking Date</th>
                <th className="py-3 px-4">Return Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.booking_id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{b.booking_id}</td>
                  <td className="py-2 px-4">{b.vehicle_id}</td>
                  <td className="py-2 px-4">{new Date(b.booking_date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{new Date(b.return_date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">Ksh {b.total_amount}</td>
                  <td className="py-2 px-4">{b.booking_status}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => setSelectedBooking(b.booking_id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedBooking && (
        <BookingDetailsModal
          booking_id={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default Bookings
