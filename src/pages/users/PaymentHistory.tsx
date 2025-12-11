import React from 'react';
import { paymentsApi } from '../../features/Api/paymentApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { skipToken } from '@reduxjs/toolkit/query';
import UserLayOut from '../../components/userDashboard/UserLayOut';

const PaymentHistory: React.FC = () => {
  const user_id = useSelector((state: RootState) => state.authSlice.user?.user_id);

  const { data: paymentHistory = [], isLoading: isPaymentLoading, error: isPayError } =
    paymentsApi.useGetAllPaymentsQuery();

  return (
    <UserLayOut>
      <div className="p-6 space-y-8 min-h-screen bg-zinc-900">
        {/* Header Section */}
        <header>
          <h2 className="text-2xl font-extrabold text-amber-500 tracking-tight">Payment History</h2>
          <p className="text-zinc-500 font-medium">Review all your past transactions and rental settlements.</p>
        </header>

        <div className="bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          {isPaymentLoading ? (
            <div className="p-10 space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-zinc-100 rounded-lg" />
              ))}
            </div>
          ) : isPayError ? (
            <div className="p-10 text-center">
              <p className="text-red-500 font-bold bg-red-50 py-3 px-6 rounded-full inline-block">Failed to load payment history.</p>
            </div>
          ) : paymentHistory.length === 0 ? (
            <div className="p-20 text-center space-y-2">
              <p className="text-zinc-400 font-bold text-lg">No payment history found.</p>
              <p className="text-zinc-500 text-sm">Once you complete a booking, your receipts will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 bg-zinc-900">
                <thead className="bg-zinc-900 text-amber-400 uppercase text-xs tracking-widest">
                  <tr>
                    <th className="py-5 px-6 text-left font-semibold">Payment ID</th>
                    <th className="py-5 px-6 text-left font-semibold">Booking Ref</th>
                    <th className="py-5 px-6 text-left font-semibold text-yellow-500">Amount</th>
                    <th className="py-5 px-6 text-left font-semibold">Status</th>
                    <th className="py-5 px-6 text-right font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 bg-zinc-900">
                  {paymentHistory.map((payment) => (
                    <tr key={payment.payment_id} className="hover:bg-zinc-500 transition-colors">
                      <td className="py-4 px-6 text-sm font-mono text-white font-bold">
                        ID {payment.payment_id}
                      </td>
                      <td className="py-4 px-6 text-sm text-white font-medium">
                        BK-{payment.booking_id}
                      </td>
                      <td className="py-4 px-6 text-sm font-black text-white">
                        KES {Number(payment.amount).toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 text-[10px] font-black rounded-full border tracking-tighter ${
                          payment.payment_status === 'Success' || payment.payment_status === 'Pending'
                            ? 'bg-zinc-900 text-yellow-500 border-yellow-500/30'
                            : 'bg-zinc-100 text-zinc-500 border-red-200'
                        }`}>
                          {payment.payment_status?.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-sm text-zinc-500 font-bold">
                        {new Date(payment.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </UserLayOut>
  );
};

export default PaymentHistory;