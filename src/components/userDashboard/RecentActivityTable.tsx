import React from "react";
import {
  Calendar,
  Clock,
  Car,
  CreditCard,
  CheckCircle,
  XCircle,
  Info, 
} from "lucide-react";

interface ActivityItem {
  id: number;
  activity_type: string;
  description: string;
  activity_date: string;
  status: string;
}

interface Props {
  activity: ActivityItem[];
}

const typeIcon = {
  booking_created: <Car className="w-5 h-5 text-blue-600" />,
  booking_status: <CheckCircle className="w-5 h-5 text-green-600" />,
  payment_completed: <CreditCard className="w-5 h-5 text-green-600" />,
  payment_failed: <XCircle className="w-5 h-5 text-red-600" />,
  payment_pending: <CreditCard className="w-5 h-5 text-yellow-600" />,
  upcoming_return: <Calendar className="w-5 h-5 text-purple-600" />,
  other: <Info className="w-5 h-5 text-gray-500" />, 
} as const;

const statusColor = {
  Completed: "bg-green-100 text-green-800 border border-green-200",
  Failed: "bg-red-100 text-red-800 border border-red-200",
  Pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  Active: "bg-blue-100 text-blue-800 border border-blue-200",
  "Due Soon": "bg-purple-100 text-purple-800 border border-purple-200",
} as const;

type StatusKey = keyof typeof statusColor;

const RecentActivityTable: React.FC<Props> = ({ activity = [] }) => {
  const getStatusColor = (status: string) =>
    statusColor[status as StatusKey] || "bg-gray-100 text-gray-700 border border-gray-200";

  return (
    
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity Timeline</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-600 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Header  */}
              <th className="py-3 px-4 text-xs font-medium tracking-wider text-gray-600 uppercase">Type</th>
              <th className="py-3 px-4 text-xs font-medium tracking-wider text-gray-600 uppercase">Description</th>
              <th className="py-3 px-4 text-xs font-medium tracking-wider text-gray-600 uppercase whitespace-nowrap">Date & Time</th>
              <th className="py-3 px-4 text-xs font-medium tracking-wider text-gray-600 uppercase text-center">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {activity.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-gray-500 text-center text-base italic">
                  <Clock className="inline-block w-4 h-4 mr-2" />
                  No recent activity found.
                </td>
              </tr>
            ) : (
              activity.map((item, index) => {
                const activityTypeKey = item.activity_type as keyof typeof typeIcon;
                const icon = typeIcon[activityTypeKey] || typeIcon.other;

                return (
                  
                  <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition duration-150 ease-in-out`}>
                    
                    
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3 font-medium text-gray-800">
                        {icon}
                        <span className="capitalize">
                          {item.activity_type.replace(/_/g, " ")}
                        </span>
                      </div>
                    </td>

                   
                    <td className="py-3 px-4 text-gray-700 max-w-xs overflow-hidden text-ellipsis">{item.description}</td>

                    <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                      {new Date(item.activity_date).toLocaleString()}
                    </td>

                  
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivityTable;

