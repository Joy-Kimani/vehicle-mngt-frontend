import React, { useMemo } from "react";
import AdminLayout from "../../components/adminDashboard/AdminLayout";
import { BookingsApi } from "../../features/Api/BookingsApi";
import { paymentsApi } from "../../features/Api/paymentApi";
import { saveAs } from "file-saver";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { UserApi } from "../../features/Api/UsersAPI";

const Analytics: React.FC = () => {
  // theme
  const GOLD_COLOR = "#d97706"; 
  const ZINC_AXIS = "#52525b";
  const ZINC_GRID = "#e4e4e7"; 

  const { data: bookings = [] } = BookingsApi.useGetAllBookingsQuery();
  const { data: payments = [] } = paymentsApi.useGetAllPaymentsQuery();
  const {data: users = []} = UserApi.useGetAllCustomersQuery();

  
  // const Api: any = (window as any).usersApi; 

  //kpi cal
  const totalRevenue = useMemo(() =>
    payments.reduce((sum: number, p: any) => sum + Number(p.amount || 0), 0), [payments]);

  const totalBookings = bookings.length;

  const completedBookings = bookings.filter((b: any) => b.booking_status === "Completed").length;
  
  const totalUsers = users.length || 0; 
 

  //chart data
  const revenueByMonth = useMemo(() => {
    const map: Record<string, number> = {};
    payments.forEach((p: any) => {
      const month = new Date(p.created_at).toLocaleString("default", { month: "short", year: "numeric" });
      map[month] = (map[month] || 0) + Number(p.amount || 0);
    });
    return Object.entries(map).map(([month, revenue]) => ({ month, revenue }));
  }, [payments]);

  const bookingsByMonth = useMemo(() => {
    const map: Record<string, number> = {};
    bookings.forEach((b: any) => {
      const month = new Date(b.created_at).toLocaleString("default", { month: "short", year: "numeric" });
      map[month] = (map[month] || 0) + 1;
    });
    return Object.entries(map).map(([month, count]) => ({ month, count }));
  }, [bookings]);

  const usersByMonth = useMemo(() => {
  const map: Record<string, number> = {};

  users.forEach((u: any) => {
    const month = new Date(u.created_at).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    map[month] = (map[month] || 0) + 1;
  });

  return Object.entries(map).map(([month, users]) => ({
    month,
    users,
  }));
}, [users]);



 //csv
  const exportCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => Object.values(row).join(","));
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, filename);
  };

  const chartTooltipStyle = {
    backgroundColor: "#09090b", 
    border: `1px solid ${GOLD_COLOR}`,
    color: 'white',
    borderRadius: '8px',
    padding: '10px'
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-10 bg-zinc-900 min-h-screen">
        <h1 className="text-2xl font-extrabold text-amber-500 tracking-tight border-b border-zinc-200 pb-4">
            Analytics Dashboard
        </h1>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 1. Total Revenue  */}
          <div className="bg-zinc-950 p-6 rounded-2xl shadow-xl border border-blue-800">
            <p className="text-sm font-semibold uppercase tracking-wider text-yellow-500 mb-1">Total Revenue</p>
            <h2 className="text-3xl font-black text-white">KES {totalRevenue.toLocaleString()}</h2>
          </div>
          {/* 2. Total Bookings */}
          <div className="bg-zinc-950 p-6 rounded-2xl shadow-xl border border-green-800">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-1">Total Bookings</p>
            <h2 className="text-3xl font-black text-white">{totalBookings}</h2>
          </div>
          {/* 3. Completed Trips */}
          <div className="bg-zinc-950 p-6 rounded-2xl shadow-xl border border-indigo-800">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-1">Completed Trips</p>
            <h2 className="text-3xl font-black text-white">{completedBookings}</h2>
          </div>
          {/* 4. Total Users */}
          <div className="bg-zinc-950 p-6 rounded-2xl shadow-xl border border-yellow-800">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-1">Total Users</p>
            <h2 className="text-3xl font-black text-white">{totalUsers}</h2>
          </div>
        </div>

        {/* EXPORT BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={() => exportCSV(bookings, "bookings-report.csv")}
            className="px-6 py-3 bg-amber-500 text-zinc-500 font-bold rounded-xl hover:bg-amber-700 transition-colors shadow-lg shadow-zinc-900/10"
          >
            Export Bookings CSV
          </button>
          <button
            onClick={() => exportCSV(payments, "payments-report.csv")}
            className="px-6 py-3 bg-amber-500 text-zinc-500 font-bold rounded-xl hover:bg-amber-700 transition-colors shadow-lg shadow-zinc-900/10"
          >
            Export Payments CSV
          </button>
        </div>

        {/* CHART SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 1. REVENUE TREND */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-zinc-200">
                <h2 className="font-bold text-lg text-zinc-900 mb-6">Revenue Over Time (KES)</h2>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={revenueByMonth} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="5 5" stroke={ZINC_GRID} />
                        <XAxis dataKey="month" stroke={ZINC_AXIS} />
                        <YAxis tickFormatter={(value) => `K${value.toLocaleString()}`} stroke={ZINC_AXIS} />
                        <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [`KES ${Number(value).toLocaleString()}`, 'Revenue']} />
                        <Line type="monotone" dataKey="revenue" stroke={GOLD_COLOR} strokeWidth={3} dot={{ stroke: GOLD_COLOR, strokeWidth: 2, r: 4 }} activeDot={{ r: 8, fill: GOLD_COLOR, stroke: 'white', strokeWidth: 3 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* 2. BOOKINGS TREND */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-zinc-200">
                <h2 className="font-bold text-lg text-zinc-900 mb-6">Bookings Volume Over Time</h2>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={bookingsByMonth} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="5 5" stroke={ZINC_GRID} vertical={false} />
                        <XAxis dataKey="month" stroke={ZINC_AXIS} />
                        <YAxis stroke={ZINC_AXIS} />
                        <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [Number(value).toLocaleString(), 'Bookings']} />
                        <Bar dataKey="count" fill={GOLD_COLOR} radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 3. USER GROWTH TREND (New Chart) */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-zinc-200 lg:col-span-2">
                <h2 className="font-bold text-lg text-zinc-900 mb-6">User Growth Over Time</h2>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={usersByMonth} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="5 5" stroke={ZINC_GRID} />
                        <XAxis dataKey="month" stroke={ZINC_AXIS} />
                        <YAxis stroke={ZINC_AXIS} />
                        <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [Number(value).toLocaleString(), 'New Users']} />
                        <Line type="monotone" dataKey="users" stroke={GOLD_COLOR} strokeWidth={3} dot={{ stroke: GOLD_COLOR, strokeWidth: 2, r: 4 }} activeDot={{ r: 8, fill: GOLD_COLOR, stroke: 'white', strokeWidth: 3 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
