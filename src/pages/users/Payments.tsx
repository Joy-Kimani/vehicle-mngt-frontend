import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import UserLayOut from "../../components/userDashboard/UserLayOut";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface Booking {
  booking_id: number;
  total_amount: number;
  user_email: string;
}

const Payments: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.authSlice);

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);

  const email = auth?.user?.email;

  // Fetch booking details
  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) return;

      try {
        const res = await axios.get(`http://localhost:3000/api/bookings/${bookingId}`);
        console.log("Fetched booking:", res.data);
        setBooking(res.data);
      } catch (err) {
        console.error("Failed to load booking:", err);
      }
    };

    fetchBooking();
  }, [bookingId]);

  // Initialize payment and redirect to Paystack
// const handlePay = () => {
//   if (!booking) {
//     alert("Booking not loaded yet");
//     return;
//   }

//   if (!email) {
//     alert("User email not available");
//     return;
//   }

//   setLoading(true);

//   try {
//     // Build the URL with query parameters
//     const params = new URLSearchParams({
//       email,
//       booking_id: String(booking.booking_id),
//       callback_url: "http://localhost:5173/dashboard/payment/callback",
//     });

//     // Redirect browser to backend route, backend will redirect to Paystack
//     window.location.href = `http://localhost:3000/api/payment/initialize?${params.toString()}`;
//   } catch (err) {
//     console.error("Payment initialization error:", err);
//     alert("Payment initialization failed");
//   } finally {
//     setLoading(false);
//   }
// };
const handlePay = async () => {
  if (!booking) return alert("Booking not loaded yet");
  if (!email) return alert("User email not available");

  setLoading(true);

  try {
    const res = await axios.post('http://localhost:3000/api/payment/initialize', {
      email,
      amount: booking.total_amount,
      booking_id: booking.booking_id,
      callback_url: 'http://localhost:5173/dashboard/payment/callback', // your callback page
    });

    const data = res.data;
    if (data?.authorization_url) {
      window.location.href = data.authorization_url; // redirect to Paystack
    } else {
      console.error("No authorization URL returned:", data);
      alert("Payment initialization failed");
    }
  } catch (err) {
    console.error("Payment initialization error:", err);
    alert("Payment initialization failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <UserLayOut>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {!booking ? (
          <p>Loading booking details...</p>
        ) : (
          <div className="bg-zinc-800 p-6 rounded shadow mb-4">
            <p><strong>Booking:</strong> {booking.booking_id}</p>
            <p><strong>Customer:</strong> {booking.user_email}</p>
            <p><strong>Amount:</strong> KES {Number(booking.total_amount).toLocaleString()}</p>

            <button
              onClick={handlePay}
              disabled={loading}
              className="mt-4 px-4 py-2 bg-yellow-500 rounded text-black font-bold disabled:opacity-50"
            >
              {loading ? "Initializing..." : "Pay Now"}
            </button>
          </div>
        )}
      </div>
    </UserLayOut>
  );
};

export default Payments;
