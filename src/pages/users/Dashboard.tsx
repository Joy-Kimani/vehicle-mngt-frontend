import React, { useEffect, useMemo, useState } from 'react';
import UserLayOut from '../../components/userDashboard/UserLayOut';
import { UserDashboardApi } from '../../features/Api/UserDashboard';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { CalendarArrowUp, CheckCircle, CircleEllipsis, Clock10Icon } from 'lucide-react';
import RentalsChart from '../../components/RentalsChart';
import SuggestedVehiclesCarousel from '../../components/SuggestedVehicleCarousel';
import { vehicleApi } from '../../features/Api/VehicleApi';
import RecentActivityTable from '../../components/userDashboard/RecentActivityTable';

// Example: Prepare data from your bookings
// const monthlyData = [
//   { month: 'Jan', rentals: 3 },
//   { month: 'Feb', rentals: 5 },
//   { month: 'Mar', rentals: 2 },
//   { month: 'Apr', rentals: 6 },
//   { month: 'May', rentals: 4 },
// ];


const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);
  const user_id = user?.user_id;
  //get all active bookings
  const { data: activeBookings = [], isLoading: isActiveLoading, error: activeError } = UserDashboardApi.useGetAllActiveBookingsQuery(
    { user_id: user_id! },
    { skip: !isAuthenticated || !user_id }
  );
  //get pending
  const { data: pendingPayments = [], isLoading: isPendingLoading, error: pendingError } = UserDashboardApi.useGetAllPendingBookingsQuery(
    { user_id: user_id! },
    { skip: !isAuthenticated }
  );

  //total
  const { data: totalBookings, isLoading: isTotalLoading, error: totalError } = UserDashboardApi.useGetTotalBookingsQuery(
    { user_id: user_id! },
    { skip: !isAuthenticated }
  );

   const { data: upcomingReturns = [], isLoading: isUpcomingLoading, error: upcomingError } = UserDashboardApi.useGetUpcomingReturnsQuery(
    { user_id: user_id! },
    { skip: !isAuthenticated }
  );

  const { data: recentActivity = [], isLoading: isRecentLoading, error: recentError } =
  UserDashboardApi.useGetRecentActivityQuery({ user_id: user?.user_id! });


  const { data: vehicles, error, isLoading: isVehicleLoading } = vehicleApi.useGetAllVehiclesQuery(); 

// if (isVehicleLoading) {
//   return <p>Loading suggested vehicles...</p>; // loading state
// }

// if (error) {
//   return <p>Error loading vehicles</p>; // error state
// }

  
  return (
    <UserLayOut>
      <div className="p-6 space-y-6">
        {/* header*/}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            {new Date().toLocaleString()}
          </div>
          <div className="text-lg font-semibold">Hello, {user?.first_name}</div>
        </div>

        <div className='flex flex-col lg:flex-row gap-6'>
        {/* stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* active bookings */}
          <div className="bg-gray-800 shadow-xl rounded-xl p-6 border border-blue-700/50">
            <h3 className="text-md font-bold text-blue-400 mb-4 flex items-center justify-between">
              Active Bookings
              <Clock10Icon />
            </h3>
            {isActiveLoading ? (
              <span className="loading loading-ring text-blue-400">Loading...</span>
            ) : activeError ? (
              <p className="text-red-500">Error loading active bookings</p>
            ) : (
              <>
                <div className="flex items-end justify-between">
                  <div className="text-5xl font-extrabold text-white">{activeBookings?.length || 0}</div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Current Rentals</p>
                    {activeBookings.length > 0 ? (
                      <p className="text-sm font-semibold text-blue-200">Last ID: {activeBookings[0].booking_id}</p>
                    ) : (
                      <p className="text-sm text-gray-500">No active rentals</p>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-400">View details for rental returns.</p>
              </>
            )}
          </div>

          {/* pending payments */}
          <div className="bg-gray-800 shadow-xl rounded-xl p-6 border border-yellow-600/50">
            <h3 className="text-md font-bold text-yellow-500 mb-4 flex items-center justify-between">
              Pending Payments
              <CircleEllipsis />
            </h3>
            {isPendingLoading ? (
              <span className="loading loading-ring text-yellow-500">Loading...</span>
            ) : pendingError ? (
              <p className="text-red-500">Error loading pending payments</p>
            ) : (
              <>
                <div className="flex items-end justify-between">
                  <div className="text-5xl font-extrabold text-white">{pendingPayments.length || 0}</div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Unpaid Invoices</p>
                    {pendingPayments.length > 0 && pendingPayments[0].amount ? (
                      <p className="text-lg font-bold text-yellow-300">{pendingPayments[0].amount}</p>
                    ) : (
                      <p className="text-sm text-gray-500">All clear</p>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-400">Outstanding payments to follow up on.</p>
              </>
            )}
          </div>

          {/* total rentals*/}
          <div className="bg-gray-800 shadow-xl rounded-xl p-6 border border-green-600/50">
            <h3 className="text-xl font-bold text-green-500 mb-4 flex items-center justify-between">
              Total Rentals Done
              <CheckCircle />
            </h3>
            {isTotalLoading ? (
              <span className="loading loading-ring text-green-500">Loading...</span>
            ) : totalError ? (
              <p className="text-red-500">Error loading total bookings</p>
            ) : !totalBookings ? (
              <p className="text-gray-500">No bookings yet</p>
            ) : (
              <>
                <div className="flex items-end justify-between">
                  <div className="text-5xl font-extrabold text-white">{totalBookings.total_completed || 0}</div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total Revenue</p>
                    <p className="text-lg font-bold text-green-300">
                      Ksh {totalBookings.total_amount || 0}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-400">All-time completed rental transactions.</p>
              </>
            )}
          </div>


          {isUpcomingLoading ? (
              <span className="loading loading-ring text-green-500">Loading...</span>
            ) : upcomingError ? (
              <p className="text-red-500">Error loading upcoming returns</p>
            ) : !upcomingReturns ? (
              <p className="text-gray-500">No current upcoming returns</p>
            ) : (
              <>
          {/* upcoming returns */}
          <div className="bg-gray-800 shadow-xl rounded-xl p-6 border border-red-700/50">
            <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center justify-between">
              Upcoming Returns
              <CalendarArrowUp />
            </h3>
            <p className="text-5xl font-extrabold text-white">{upcomingReturns.length}</p>
            <p className="mt-1 text-sm text-gray-400">Vehicles due for return in the next 7 days</p>
            {upcomingReturns.length > 0 && upcomingReturns[0].upcoming.length > 0 && (
              <ul className="mt-4 text-gray-200 text-sm space-y-1 max-h-40 overflow-y-auto">
                {upcomingReturns[0].upcoming.map((booking) => (
                  <li key={booking.booking_id}>
                    Vehicle {booking.vehicle_id} - Return on {new Date(booking.return_date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}

          </div>
          </>
          )}
        </div>

        {/* Chart placeholder */}
        <div className="lg:col-span-2">
          {/* Your Chart Component */}
          {/* <RentalsChart data={monthlyData} /> */}
        </div>

        </div>

        {/* Recent Activity Table */}
        {/* ... */}
        {/* <div className="bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-700/50 mt-6">
       <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
       {isActiveLoading ? (
         <span className="loading loading-ring text-blue-400">Loading...</span>
       ) : activeError ? (
         <p className="text-red-500">Error loading recent activity</p>
       ) : activeBookings.length === 0 ? (
         <p className="text-gray-400">No recent activity</p>
       ) : (
         <div className="overflow-x-auto">
           <table className="min-w-full divide-y divide-gray-700">
             <thead>
               <tr>
                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Booking ID</th>
                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Vehicle ID</th>
                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Booking Date</th>
                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Return Date</th>
                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-700">
               {activeBookings.map((booking) => (
                 <tr key={booking.booking_id} className="hover:bg-gray-700">
                   <td className="px-4 py-2 text-gray-200">{booking.booking_id}</td>
                   <td className="px-4 py-2 text-gray-200">{booking.vehicle_id}</td>
                   <td className="px-4 py-2 text-gray-200">{new Date(booking.booking_date).toLocaleDateString()}</td>
                   <td className="px-4 py-2 text-gray-200">{new Date(booking.return_date).toLocaleDateString()}</td>
                   <td className="px-4 py-2 text-gray-200">{booking.booking_status}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       )}
       </div> */}

       { isRecentLoading ? ( <span className="loading loading-ring text-blue-400">Loading...</span>)
       : recentError ? (
        <p className="text-red-500">Error recent activity table</p>
       ):(
         <RecentActivityTable activity={recentActivity} />
       )}
      



      {/* suggested cars */}
       <SuggestedVehiclesCarousel vehicles={vehicles || []}/>
      </div>
    </UserLayOut>
  );
};

export default Dashboard;

