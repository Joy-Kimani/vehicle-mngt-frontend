import React, { useState } from "react";
import UserLayOut from "../../components/userDashboard/UserLayOut";
import { paymentApi } from "../../features/Api/PaymentApi";
import { BookingsApi } from "../../features/Api/BookingsApi";
import PaymentHistory from "./PaymentHistory";
import PaymentConfirmModal from "../../components/PaymentConfirmModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

type SelectedPayment = {
  booking_id: number;
  email: string;
  amount: number;
};

const Payments: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);
    const user_id = user?.user_id;
  // Fetch all bookings
  const {
    data: bookings,
    isLoading: isBookingsLoading,
    error: bookingsError,
  } = BookingsApi.useGetAllBookingandPaymentDetailsQuery({ user_id } as { user_id: number });

  // Payment initialization mutation
  const [initializePayment, { isLoading: isInitializing }] =
    paymentApi.useInitializePaymentMutation();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stores booking details clicked by user
  const [selectedPayment, setSelectedPayment] = useState<SelectedPayment | null>(
    null
  );

  const handleOpenModal = (booking: any) => {
    setSelectedPayment({
      booking_id: booking.booking_id,
      email: booking.user_email,
      amount: booking.total_amount,
    });
    setIsModalOpen(true);
  };

  const handleConfirmPayment = async () => {
    if (!selectedPayment) return;

    try {
      const res: any = await initializePayment({
        email: selectedPayment.email,
        booking_id: selectedPayment.booking_id,
        amount: selectedPayment.amount,
        method: "Card",
      }).unwrap();

      console.log("Payment Initialized:", res);

      // redirect user to payment gateway
      if (res?.authorization_url) {
        window.location.href = res.authorization_url;
      } else {
        alert("Payment initialized but no redirect URL returned.");
      }
    } catch (err) {
      console.error("Payment Init Error:", err);
      alert("Payment failed!");
    }
  };

  return (
    <UserLayOut>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
          Payments Page
        </h2>

        {/* Payment History Section */}
        <PaymentHistory />

        <h3 className="text-lg font-semibold mt-6 mb-3 text-neutral-700 dark:text-neutral-300">
          Pending Bookings
        </h3>

        {/* BOOKINGS TABLE */}
        <div className="overflow-x-auto shadow rounded border border-gray-300 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Booking ID</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isBookingsLoading && (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center">
                    Loading bookings…
                  </td>
                </tr>
              )}

              {bookingsError && (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-red-500">
                    Error loading bookings
                  </td>
                </tr>
              )}

              {bookings?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center">
                    No bookings found
                  </td>
                </tr>
              )}

              {bookings?.map((booking: any) => (
                <tr key={booking.booking_id}>
                  <td className="px-4 py-3">{booking.booking_id}</td>
                  <td className="px-4 py-3">{booking.user_email}</td>
                  <td className="px-4 py-3">KES {booking.total_amount}</td>
                  <td className="px-4 py-3 capitalize">{booking.payment_status}</td>

                  <td className="px-4 py-3 text-center">
                    {booking.payment_status !== "paid" ? (
                      <button
                        onClick={() => handleOpenModal(booking)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confirmation Modal */}
        <PaymentConfirmModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          onConfirm={handleConfirmPayment}
        />

        {isInitializing && (
          <p className="text-sm mt-2 text-gray-500">Redirecting to payment…</p>
        )}
      </div>
    </UserLayOut>
  );
};

export default Payments;

