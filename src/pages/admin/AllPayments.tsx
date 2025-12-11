import React, { useState } from "react";
import AdminLayout from "../../components/adminDashboard/AdminLayout";
import type { PaymentsResponse } from "../../Types/types";
import {
  paymentsApi,
  useGetAllPaymentsQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  
} from "../../features/Api/paymentApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { UserApi } from "../../features/Api/UsersAPI";

const AllPayments: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.authSlice);
  const {data:users } = UserApi.useGetAllCustomersQuery();
  const { data: payments = [], isLoading, error, refetch } = useGetAllPaymentsQuery();

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [updatingPaymentId, setUpdatingPaymentId] = useState<number | null>(null);

  const filteredPayments =
    filterStatus === "all"
      ? payments
      : payments.filter(
          (p) => p.payment_status.toLowerCase() === filterStatus.toLowerCase()
        );

  // Mutations
  const [updatePayment] = useUpdatePaymentMutation();
  const [deletePayment] = useDeletePaymentMutation();

  // Lazy query for verify
  const [verifyPaymentTrigger] = paymentsApi.useLazyVerifyPaymentQuery();

  const changeStatus = async (id: number, status: PaymentsResponse["payment_status"]) => {
    try {
      setUpdatingPaymentId(id);
      await updatePayment({ payment_id: id, payment_status: status }).unwrap();
      alert(`Payment ${id} marked as ${status}`);
      refetch();
    } catch (err: any) {
      console.error(err);
      alert(`Failed to update payment ${id}: ${err.data?.message || err.message}`);
    } finally {
      setUpdatingPaymentId(null);
    }
  };

  const issueRefund = async (id: number) => {
    try {
      setUpdatingPaymentId(id);
      await updatePayment({ payment_id: id, payment_status: "refunded" }).unwrap();
      alert(`Refund issued for payment ${id}`);
      refetch();
    } catch (err: any) {
      console.error(err);
      alert(`Failed to refund payment ${id}: ${err.data?.message || err.message}`);
    } finally {
      setUpdatingPaymentId(null);
    }
  };

  const handleVerify = async (payment_reference: string) => {
    try {
      const result = await verifyPaymentTrigger(payment_reference).unwrap();
      alert(`Payment verified: ${JSON.stringify(result)}`);
      refetch();
    } catch (err: any) {
      console.error(err);
      alert(`Failed to verify payment: ${err.data?.message || err.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(`Are you sure you want to delete payment ${id}?`)) return;
    try {
      setUpdatingPaymentId(id);
      await deletePayment(id).unwrap();
      alert(`Payment ${id} deleted`);
      refetch();
    } catch (err: any) {
      console.error(err);
      alert(`Failed to delete payment ${id}: ${err.data?.message || err.message}`);
    } finally {
      setUpdatingPaymentId(null);
    }
  };

  if (isLoading) return <AdminLayout>Loading payments...</AdminLayout>;
  if (error) return <AdminLayout>Error loading payments</AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Payments Management</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <select
            className="select select-bordered w-48"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Success">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          <button
            className="btn btn-sm btn-primary"
            onClick={() => alert("Export to CSV (placeholder)")}
          >
            Export CSV
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => alert("Export to PDF (placeholder)")}
          >
            Export PDF
          </button>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Booking ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Method</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p: PaymentsResponse) => (
                <tr key={p.payment_id}>
                  <td>{p.payment_id}</td>
                  <td>{p.booking_id}</td>
                  <td>{users?.first_name} {users?.last_name}</td>
                  <td>KES{p.amount}</td>
                  <td>
                    <span
                      className={
                        p.payment_status === "Success"
                          ? "text-success"
                          : p.payment_status === "Pending"
                          ? "text-warning"
                          : p.payment_status === "Failed"
                          ? "text-error"
                          : "text-info"
                      }
                    >
                      {p.payment_status}
                    </span>
                  </td>
                  <td>{p.payment_method}</td>
                  <td>{p.created_at}</td>
                  <td className="flex flex-wrap gap-1">
                    {p.payment_status !== "Success" && p.payment_status !== "Failed" && (
                      <button
                        className="btn btn-sm btn-success"
                        disabled={updatingPaymentId === p.payment_id}
                        onClick={() => changeStatus(p.payment_id, "Success")}
                      >
                        Mark Paid
                      </button>
                    )}
                    {p.payment_status !== "Pending" && p.payment_status !== "refunded" && (
                      <button
                        className="btn btn-sm btn-warning"
                        disabled={updatingPaymentId === p.payment_id}
                        onClick={() => changeStatus(p.payment_id, "Pending")}
                      >
                        Mark Pending
                      </button>
                    )}
                    {p.payment_status !== "Failed" && p.payment_status !== "refunded" && (
                      <button
                        className="btn btn-sm btn-error"
                        disabled={updatingPaymentId === p.payment_id}
                        onClick={() => changeStatus(p.payment_id, "Failed")}
                      >
                        Mark Failed
                      </button>
                    )}
                    {p.payment_status !== "refunded" && (
                      <button
                        className="btn btn-sm btn-info"
                        disabled={updatingPaymentId === p.payment_id}
                        onClick={() => issueRefund(p.payment_id)}
                      >
                        Refund
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-outline btn-accent"
                      onClick={() => alert(`View receipt for Payment ID: ${p.payment_id}`)}
                    >
                      Receipt
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => handleVerify(p.payment_reference)}
                    >
                      Verify
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      disabled={updatingPaymentId === p.payment_id}
                      onClick={() => handleDelete(p.payment_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center">
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Webhook logs placeholder */}
        <div className="bg-base-100 p-4 rounded-xl shadow mt-4">
          <h2 className="text-lg font-semibold mb-2">Webhook Logs</h2>
          <p>Latest webhook events will appear here (placeholder).</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllPayments;

