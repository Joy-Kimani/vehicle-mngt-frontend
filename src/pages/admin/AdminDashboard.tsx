import React from "react";
import AdminLayout from "../../components/adminDashboard/AdminLayout";
import { AdminDashboardApi } from "../../features/Api/AdminDashboard";
import { BookingsApi } from "../../features/Api/BookingsApi";

const DashboardOverview: React.FC = () => {

  const {data:allUsers = [], error:isUserError, isLoading:isUserLoading} = AdminDashboardApi.useGetAllUsersQuery();
  //console.log("All Users Data:", allUsers);

  const { data: analyticsData = [], error: analyticsError, isLoading: isAnalyticsLoading } = BookingsApi.useGetAllBookingsQuery();
  //console.log("All Bookings Data:", analyticsData);

  const { data: totalVehiclesData = [], error: totalVehiclesError, isLoading: isTotalVehiclesLoading } = AdminDashboardApi.useGetTotalVehiclesQuery();
  //console.log("Total Vehicles Data:", totalVehiclesData);

  const {data:paymentStatusData, error:paymentStatusError, isLoading:isPaymentStatusLoading} = AdminDashboardApi.useGetPaymentStatusSummaryQuery();
  console.log("Payment Status Data:", paymentStatusData);

  const stats = {
    totalProperties: totalVehiclesData.length,
    totalUsers: allUsers.length,
    totalBookings: analyticsData.length,
    payments: {
      paid: paymentStatusData?.success,
      pending: paymentStatusData?.pending,
      failed: paymentStatusData?.failed,
    },
    occupancyRate: 75, // %
    activeLeases: 10,
  };

  const notifications = [
    "Payment overdue for Booking #102",
    "New booking created for Apartment A5",
    "Maintenance request submitted for Unit 3B",
  ];

  return (
    <AdminLayout>
    <div className="p-6 space-y-6">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Total Properties */}
        {isTotalVehiclesLoading ? (
          <div className="stat bg-base-100 shadow rounded-xl">
            <div className="stat-title">Total Vehicles in custody</div>
            <div className="stat-value">Loading...</div>
          </div>
        ) : totalVehiclesError ? (
          <div className="stat bg-base-100 shadow rounded-xl">
            <div className="stat-title">Total Vehicles in custody</div>
            <div className="stat-value">Error</div>
          </div>
        ) : (
          <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Total Vehicles in custody</div>
          <div className="stat-value">{stats.totalProperties}</div>
        </div>
        )}

        {/* Total Users */}
        {isUserLoading ? (
          <div className="stat bg-base-100 shadow rounded-xl">
            <div className="stat-title">Total Renters/Users</div>
            <div className="stat-value">Loading...</div>
          </div>
        ) : isUserError ? (
          <div className="stat bg-base-100 shadow rounded-xl">
            <div className="stat-title">Total Renters/Users</div>
            <div className="stat-value">Error</div>
          </div>
        ) : ( 
          <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Total Renters/Users</div>
          <div className="stat-value">{stats.totalUsers}</div>
        </div>
        )}
        

        {/* Total Bookings */}

        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Total Bookings</div>
          <div className="stat-value">{stats.totalBookings}</div>
        </div>
      </div>

      {/* PAYMENTS SUMMARY */}
      {isPaymentStatusLoading ? (
        <div className="bg-base-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Payment Summary</h2>
          <p>Loading...</p>
        </div>
      ) : paymentStatusError ? (
        <div className="bg-base-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Payment Summary</h2>
          <p>Error loading payment data.</p>
        </div>
      ) : ( 
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Payment Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat bg-base-200 rounded-xl">
            <div className="stat-title">Paid</div>
            <div className="stat-value text-success">{stats.payments.paid}</div>
          </div>

          <div className="stat bg-base-200 rounded-xl">
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning">{stats.payments.pending}</div>
          </div>

          <div className="stat bg-base-200 rounded-xl">
            <div className="stat-title">Failed</div>
            <div className="stat-value text-error">{stats.payments.failed}</div>
          </div>
        </div>
      </div>
       )}
      

      {/* OCCUPANCY RATE */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">Occupancy Rate</h2>

        <div className="w-full bg-base-300 rounded-lg h-5">
          <div
            className="bg-primary h-5 rounded-lg"
            style={{ width: `${stats.occupancyRate}%` }}
          />
        </div>

        <p className="mt-2 font-medium">{stats.occupancyRate}% occupied</p>
      </div>

      {/* QUICK STATS */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>

        <div className="stat bg-base-200 rounded-xl">
          <div className="stat-title">Active Leases</div>
          <div className="stat-value">{stats.activeLeases}</div>
        </div>
      </div>

      {/* LATEST NOTIFICATIONS */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">Latest Notifications</h2>

        <ul className="list-disc list-inside space-y-2">
          {notifications.length > 0 ? (
            notifications.map((note, index) => (
              <li key={index} className="text-sm">
                {note}
              </li>
            ))
          ) : (
            <p>No notifications found.</p>
          )}
        </ul>
      </div>

    </div>
    </AdminLayout>
  );
};

export default DashboardOverview;
