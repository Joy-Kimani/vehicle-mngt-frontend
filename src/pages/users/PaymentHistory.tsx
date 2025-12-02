import React from "react";
import { FileText, Edit, Trash2, Loader2, AlertCircle } from "lucide-react";
import { paymentApi } from "../../features/Api/PaymentApi";

// --- 1. Type Definitions for Clarity ---
interface Payment {
  payment_id: number;
  booking_id: number;
  amount: number; // Assuming amount is a number
  payment_method: string;
  payment_date: string; // ISO date string
  payment_status: "Success" | "Failed" | "Pending"; // Explicit possible statuses
}

interface PaymentHistoryProps {
  payment_id?: number;
}

// --- 2. Status Badge Component (Utility) ---
interface StatusBadgeProps {
  status: Payment["payment_status"];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let colorClass = "bg-gray-500"; // Default
  if (status === "Success") {
    colorClass = "bg-green-500";
  } else if (status === "Failed") {
    colorClass = "bg-red-500";
  } else if (status === "Pending") {
    colorClass = "bg-yellow-500";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${colorClass} shadow-sm`}
    >
      {status}
    </span>
  );
};

// --- 3. Main Component ---
const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payment_id }) => {
  // Destructure with a consistent type assertion for the expected data shape
  const {
    data,
    isLoading,
    error,
  } = paymentApi.useGetPaymentsQuery({ payment_id }) as {
    data: Payment[] | undefined;
    isLoading: boolean;
    error: any;
  };

  // Use a fallback to an empty array for safer mapping
  const payments: Payment[] = data || [];

  // Helper function for the currency formatting
  const formatCurrency = (amount: number) => {
    // KES is the Kenyan Shilling currency code
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // --- Rendering States ---
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8 text-neutral-500 dark:text-neutral-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <p className="text-lg">Loading payment history...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center p-8 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertCircle className="w-6 h-6 mr-2" />
          <p className="text-lg font-medium">Failed to load payments. Please try again.</p>
        </div>
      );
    }

    if (payments.length === 0) {
      return (
        <div className="text-center p-8 text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
          <p className="text-lg">No payment records found.</p>
        </div>
      );
    }

    // --- Payments Table ---
    return (
      <div className="overflow-x-auto shadow-sm rounded-lg border border-neutral-200 dark:border-neutral-700">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
          {/* -------- HEAD -------- */}
          <thead className="bg-neutral-50 dark:bg-neutral-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider dark:text-neutral-300">
                
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider dark:text-neutral-300">
                Booking ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider dark:text-neutral-300">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider dark:text-neutral-300">
                Method
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider dark:text-neutral-300">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider dark:text-neutral-300">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider dark:text-neutral-300">
                Actions
              </th>
            </tr>
          </thead>

          {/* -------- BODY -------- */}
          <tbody className="bg-white divide-y divide-neutral-100 dark:bg-neutral-900 dark:divide-neutral-800">
            {payments.map((p, index) => (
              <tr
                key={p.payment_id}
                className="text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition duration-150"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  {index + 1}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className="font-mono text-blue-600 dark:text-blue-400">#{p.booking_id}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-green-700 dark:text-green-400">
                  {formatCurrency(p.amount)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm capitalize">
                  {p.payment_method}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {new Date(p.payment_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <StatusBadge status={p.payment_status} />
                </td>

                {/* -------- ACTIONS -------- */}
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    title="View Receipt"
                    className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 rounded-full transition duration-150 hover:bg-blue-50 dark:hover:bg-neutral-700/50"
                    onClick={() => console.log("View Receipt:", p.payment_id)}
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    title="Edit Payment"
                    className="p-2 text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 rounded-full transition duration-150 hover:bg-yellow-50 dark:hover:bg-neutral-700/50"
                    onClick={() => console.log("Edit Payment:", p.payment_id)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    title="Delete Payment"
                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 rounded-full transition duration-150 hover:bg-red-50 dark:hover:bg-neutral-700/50"
                    onClick={() => console.log("Delete Payment:", p.payment_id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-100 dark:border-neutral-800">
      <h2 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-100 border-b pb-3 border-neutral-100 dark:border-neutral-800">
         Payment History
      </h2>
      {renderContent()}
    </div>
  );
};

export default PaymentHistory;

