import React, { useState, useCallback, useEffect } from "react";
import UserLayOut from "../../components/userDashboard/UserLayOut";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { BookingsApi } from "../../features/Api/BookingsApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { paymentsApi } from "../../features/Api/paymentApi";
import { useInitializePaymentMutation } from "../../features/Api/paymentApi";


const Bookings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.authSlice);
  const user_id = user?.user_id;

  const {
    data: bookings,
    isLoading: loadingBookings,
    error: bookingsError,
  } = BookingsApi.useGetBookingsByUserQuery(user_id ?? skipToken);

  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: details,
    isLoading: loadingDetails,
    refetch,
  } = BookingsApi.useGetAllBookingandPaymentDetailsQuery(
    selectedBookingId ?? skipToken
  );
  const {data:payment = [], isLoading:isLoadingPayment, error: isPaymentError} = paymentsApi.useGetAllPaymentsQuery();
  console.log("payment data", payment);

  const [initializePayment, { isLoading: isInitializing }] = useInitializePaymentMutation();
 



  const [extendBooking, { isLoading: extending }] =
    BookingsApi.usePutExtensionDeadlineMutation();
  const [cancelBooking, { isLoading: cancelling }] =
    BookingsApi.useCancelBookingMutation();

    const bookingPayment = details ? payment.find(p => p.booking_id === details.booking.booking_id) || null : null;
  

  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);


  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const openModalFor = (bookingId: number) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  const handleExtend = useCallback(async (bookingId: number) => {
    const newDate = prompt("Enter new return date (YYYY-MM-DD):");
    if (!newDate || !/^\d{4}-\d{2}-\d{2}$/.test(newDate)) return;
    try {
      await extendBooking({ booking_id: bookingId, return_date: newDate }).unwrap();
      setToast({ type: "success", text: "Booking extended successfully." });
      refetch();
    } catch (err: any) {
      setToast({ type: "error", text: "Failed to extend booking." });
    }
  }, [extendBooking, refetch]);

  const handleCancel = useCallback(async (bookingId: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await cancelBooking({ booking_id: bookingId }).unwrap();
      setToast({ type: "success", text: "Booking cancelled." });
      refetch();
    } catch (err: any) {
      setToast({ type: "error", text: "Failed to cancel." });
    }
  }, [cancelBooking, refetch]);

const handlePayNow = async () => {
  if (!details?.booking) return;

  const bookingId = details.booking.booking_id;
  const email = user?.email || "";
  const amount = details.booking.total_amount;

  try {
    const response = await initializePayment({
      email,
      amount,
      booking_id: bookingId,
      method: "Card"
    }).unwrap();

    if (response?.authorization_url) {
      window.location.href = response.authorization_url;
    } else {
      setToast({ type: "error", text: "Payment initialization failed." });
    }
  } catch (err: any) {
    setToast({ type: "error", text: "Payment initialization failed." });
    console.error(err);
  }
};




  return (
    <UserLayOut>
      <div className="p-6 space-y-8 min-h-screen bg-zinc-900">
        <header>
          <h1 className="text-2xl font-bold text-amber-500 tracking-tight">Manage Bookings</h1>
          <p className="text-zinc-500 font-medium">View history, extend durations, or download receipts.</p>
        </header>

        {loadingBookings && <div className="space-y-4">{[1, 2].map(i => <div key={i} className="h-16 bg-zinc-200 animate-pulse rounded-xl" />)}</div>}

        {Array.isArray(bookings) && bookings.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-zinc-200">
              <thead className="bg-amber-500 text-white-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-center font-semibold text-yellow-500">Actions</th>
                  <th className="px-6 py-4 text-right font-semibold">Overview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {bookings.map((b: any) => (
                  <tr key={b.booking_id} className="hover:bg-zinc-600 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-white">{b.booking_id}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase border ${
                        b.booking_status === "Active" ? "bg-zinc-900 text-yellow-500 border-yellow-500/30" : "bg-zinc-900 text-zinc-600 border-red-500"
                      }`}>{b.booking_status}</span>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-3">
                      {b.booking_status === "Active" && (
                        <button onClick={() => handleExtend(b.booking_id)} className="text-sm font-semibold text-indigo-900 border-indigo-700 hover:text-indigo-800">Extend</button>
                      )}
                      {["Pending", "Active"].includes(b.booking_status) && (
                        <button onClick={() => handleCancel(b.booking_id)} className="text-sm font-semibold text-red-600">Cancel</button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openModalFor(b.booking_id)} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg text-xs transition-all shadow-md">DETAILS</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-auto">
            <div className="bg-zinc-900 text-zinc-100 w-full max-w-4xl rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              {/* Modal Header */}
              <div className="bg-zinc-950 p-6 border-b border-zinc-800 flex justify-between items-center">
                <h3 className="text-xl font-bold text-yellow-500 uppercase tracking-widest">Booking Profile {selectedBookingId}</h3>
                <button onClick={() => { setIsModalOpen(false); setSelectedBookingId(null); }} className="text-zinc-400 hover:text-white text-2xl">✕</button>
              </div>

              <div className="p-8 space-y-8">
                {loadingDetails ? <div className="animate-pulse space-y-4"><div className="h-48 bg-zinc-800 rounded-xl" /></div> : details && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left: Vehicle Image & Basic Info */}
                    <div className="space-y-6">
                      <div className="relative group">
                        <img src={details.vehicle?.front_image_url} className="w-full h-64 object-cover rounded-xl border-2 border-zinc-800 group-hover:border-yellow-500 transition-all duration-300 shadow-lg" alt="car" />
                        <div className="absolute top-4 left-4 bg-zinc-950/80 px-3 py-1 rounded-md border border-yellow-500/50">
                          <p className="text-xs text-yellow-500 font-bold tracking-tighter uppercase">{details.vehicle?.manufacturer}</p>
                        </div>
                      </div>
                      <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700">
                        <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Specs & Identification</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><span className="text-zinc-500">Model:</span> <p className="font-semibold">{details.vehicle?.model}</p></div>
                          <div><span className="text-zinc-500">Year:</span> <p className="font-semibold">{details.vehicle?.year}</p></div>
                          <div><span className="text-zinc-500">Features:</span> <p className="font-semibold text-yellow-500 font-mono tracking-wider">{details.vehicle?.features}</p></div>
                          <div><span className="text-zinc-500">Color:</span> <p className="font-semibold">{details.vehicle?.color}</p></div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Booking & Payment Details */}
                    <div className="space-y-6">
                      <div className="bg-zinc-950 p-6 rounded-xl border-l-4 border-yellow-500">
                        <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Rental Period</h4>
                        <div className="flex justify-between items-center mb-6">
                          <div><span className="text-xs text-zinc-500">PICKUP</span><p className="text-lg font-bold">{format(new Date(details.booking.booking_date), "MMM dd, yyyy")}</p></div>
                          <div className="text-yellow-500">→</div>
                          <div className="text-right"><span className="text-xs text-zinc-500">RETURN</span><p className="text-lg font-bold">{format(new Date(details.booking.return_date), "MMM dd, yyyy")}</p></div>
                        </div>
                        <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
                          <span className="text-zinc-400">Total Amount:</span>
                          <span className="text-2xl font-black text-yellow-500">Ksh {details.booking.total_amount}</span>
                        </div>
                      </div>

                      <div className="bg-zinc-800/30 p-6 rounded-xl border border-zinc-700 space-y-4">
                        <div className="flex justify-between items-center">
                           <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Payment Summary</h4>
                           
<span className={`px-3 py-1 text-[10px] font-black rounded-full border ${
  bookingPayment?.payment_status === "Success" ? "border-green-500 text-green-500" : "border-yellow-500 text-yellow-500"
}`}>
  {bookingPayment?.payment_status?.toUpperCase() || "UNPAID"}
</span>

                        </div>
                        <div className="text-xs text-zinc-500 space-y-2 font-medium">
                          <p>ID: <span className="text-zinc-300 font-mono">{details.payment?.payment_id || "PENDING"}</span></p>
                          <p>Reference: <span className="text-zinc-300 uppercase">{user?.email}</span></p>
                        </div>
                        <div className="flex gap-2 pt-4">
                          {details.payment?.payment_status !== "Success" ? (
                            // <button onClick={() => navigate(`payment/initialize`)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-black py-3 rounded-lg text-xs uppercase tracking-widest">Pay Outstanding</button>
                              <button
                                onClick={() => navigate(`/dashboard/payments/${details.booking.booking_id}`)}
                              
                                className="bg-yellow-500 text-black px-4 py-2 rounded"
                              >
                                Pay Now
                              </button>
                          ) : (
                            <button className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-widest">Download Invoice</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-zinc-950 border-t border-zinc-800 flex justify-end">
                <button onClick={() => setIsModalOpen(false)} className="px-8 py-2 text-sm font-bold text-zinc-500 hover:text-white transition-colors">CLOSE</button>
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className="fixed bottom-8 right-8 z-[100] bg-zinc-900 border border-yellow-500 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce">
            {toast.text}
          </div>
        )}
      </div>
    </UserLayOut>
  );
};

export default Bookings;