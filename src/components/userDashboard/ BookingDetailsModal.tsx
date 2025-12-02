import React from "react";

import { X, Calendar, Car, CreditCard } from "lucide-react";
import { UserDashboardApi } from "../../features/Api/UserDashboard";

interface Props {
  booking_id: number;
  onClose: () => void;
  onOpenFullDetails?: () => void; 
}

const statusColor: Record<string, string> = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
  Active: "bg-blue-100 text-blue-700",
  Completed: "bg-gray-200 text-gray-800",
};

const BookingDetailsModal: React.FC<Props> = ({ booking_id, onClose, onOpenFullDetails }) => {
  const { data, isLoading, error } = UserDashboardApi.useGetBookingDetailsQuery({ booking_id });

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <div className="text-white text-lg">Loading booking details...</div>
      </div>
    );

  if (error || !data)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <div className="bg-white p-6 rounded-xl shadow text-gray-700">Error loading booking.</div>
      </div>
    );

  const { booking, vehicle, payment } = data;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative animate-[slideUp_.3s_ease]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-3">Booking #{booking.booking_id}</h2>

        {/* Vehicle Preview */}
        <div className="flex items-center gap-3 border rounded-xl p-3 mb-4 bg-gray-50">
          <img
            src={vehicle.front_image_url}
            alt="vehicle"
            className="w-20 h-20 object-cover rounded-lg"
          />

          <div>
            <p className="font-semibold text-gray-800">
              {vehicle.manufacturer} {vehicle.model}
            </p>
            <p className="text-gray-500 text-sm">{vehicle.year}</p>
          </div>
        </div>

        {/* Booking details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-600" />
            <p>
              <strong>From:</strong> {new Date(booking.booking_date).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-600" />
            <p>
              <strong>To:</strong> {new Date(booking.return_date).toLocaleDateString()}
            </p>
          </div>

          <p>
            <strong>Total Amount:</strong>{" "}
            <span className="text-gray-800">KES {booking.total_amount}</span>
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                statusColor[booking.booking_status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {booking.booking_status}
            </span>
          </p>
        </div>

        {/* Payment */}
        <div className="border rounded-xl p-3 mb-5 bg-gray-50">
          <div className="flex items-center gap-2 mb-1">
            <CreditCard size={18} className="text-gray-600" />
            <strong>Payment</strong>
          </div>

          {payment ? (
            <p className="text-gray-700">
              {payment.payment_method} — KES {payment.amount} (
              {payment.payment_status})
            </p>
          ) : (
            <p className="text-yellow-700">Payment Pending</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">

          {/* Full details page */}
          {onOpenFullDetails && (
            <button
              onClick={onOpenFullDetails}
              className="py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              Open Full Details
            </button>
          )}

          {/* Pay */}
          {!payment && (
            <button className="py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
              Pay Now
            </button>
          )}

          {/* Extend */}
          {booking.booking_status === "Active" && (
            <button className="py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              Extend Booking
            </button>
          )}

          {/* Cancel */}
          {booking.booking_status !== "Cancelled" &&
            booking.booking_status !== "Completed" && (
              <button className="py-2 bg-red-600 text-white rounded-xl hover:bg-red-700">
                Cancel Booking
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;

