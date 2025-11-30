import React from "react";
import { UserDashboardApi } from "../../features/Api/UserDashboard";

interface Props {
  booking_id: number;
  onClose: () => void;
}

const BookingDetailsModal: React.FC<Props> = ({ booking_id, onClose }) => {
  const { data: booking, isLoading, error } = UserDashboardApi.useGetBookingDetailsQuery({ booking_id });

  if (isLoading) return <div>Loading...</div>;
  if (error || !booking) return <div>Error loading booking details</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96 relative">
        <button className="absolute top-2 right-2" onClick={onClose}>✖</button>
        <h2 className="text-xl font-bold mb-4">Booking #{booking.booking_id}</h2>
        <p><strong>Vehicle:</strong> {booking.vehicle_id}</p>
        <p><strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleString()}</p>
        <p><strong>Return Date:</strong> {new Date(booking.return_date).toLocaleString()}</p>
        <p><strong>Total Amount:</strong> Ksh {booking.total_amount}</p>
        <p><strong>Status:</strong> {booking.booking_status}</p>
        <p><strong>Payment Status:</strong> {booking.payment_status || 'N/A'}</p>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
