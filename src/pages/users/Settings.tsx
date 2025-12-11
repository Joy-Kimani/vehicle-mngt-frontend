import React, { useState } from "react";
import UserLayOut from "../../components/userDashboard/UserLayOut";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {  MapPin, User2Icon } from "lucide-react";
import { BookingsApi } from "../../features/Api/BookingsApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { paymentsApi } from "../../features/Api/paymentApi";
import { ticketsApi } from "../../features/Api/TicketsApi";
 import { useNavigate } from "react-router";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.authSlice.user);
  const user_id = user?.user_id;

  const {data: bookings} = BookingsApi.useGetBookingsByUserQuery(user_id ?? skipToken);
  const { data: paymentHistory = []} = paymentsApi.useGetPaymentsByUserQuery(user_id ?? skipToken);
  const {data: tickets = []} = ticketsApi.useGetUserTicketsQuery(user_id ?? skipToken);


  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const navigate = useNavigate();


  // Helper styles
  const GOLD_BUTTON_CLASS = "px-5 py-2 bg-yellow-600 text-zinc-950 font-semibold rounded-xl hover:bg-yellow-500 transition-colors shadow-md shadow-yellow-600/20";
  const BLUE_BUTTON_CLASS = "px-5 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20";
  const RED_BUTTON_CLASS = "px-5 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-md shadow-red-600/20";
  const ZINC_SURFACE_CLASS = "bg-zinc-950 rounded-2xl p-6 shadow-xl border border-zinc-800";

  return (
    <UserLayOut>
      <div className="max-w-7xl mx-auto p-8 bg-zinc-900 min-h-screen">

        {/* Header */}
        <h1 className="text-2xl font-extrabold text-amber-500 tracking-tight mb-8 border-b border-zinc-200 pb-4">
          <User2Icon/>User Profile & Settings
        </h1>

        {/* PROFILE CARD */}
        <div className={`${ZINC_SURFACE_CLASS} flex gap-8 items-center`}>
          {/* AVATAR */}
          <img
            src={
              user?.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="w-28 h-28 rounded-full object-cover border-4 border-yellow-600 shadow-lg"
            alt="User Avatar"
          />

          {/* INFO */}
          <div className="flex-1">
            <h2 className="text-3xl font-black text-white tracking-tight">
              {user?.first_name} {user?.last_name}
            </h2>

            <p className="text-zinc-400 text-sm mt-1 font-mono">{user?.email}</p>

            <p className="mt-3 text-zinc-300 font-medium">
              <MapPin/> {user?.location}, {user?.country}
            </p>

            <div className="flex gap-4 mt-6">
              <button className={GOLD_BUTTON_CLASS}>
                Update Profile
              </button>

              <button
                onClick={() => navigate("/reset-password")}
                className={BLUE_BUTTON_CLASS}
              >
                Change Password
              </button>

              <button
                onClick={() => setShowDeleteWarning(true)}
                className={RED_BUTTON_CLASS}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* STATS - Gold Highlighted Numbers */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className={`${ZINC_SURFACE_CLASS} p-5`}>
            <h3 className="text-sm font-semibold uppercase text-zinc-400">Total Bookings</h3>
            <p className="text-4xl font-black text-yellow-600 mt-2">{bookings?.length}</p>
            <p className="text-zinc-500 text-xs mt-1">Trips completed or pending</p>
          </div>

          <div className={`${ZINC_SURFACE_CLASS} p-5`}>
            <h3 className="text-sm font-semibold uppercase text-zinc-400">Total Payments</h3>
            <p className="text-4xl font-black text-yellow-600 mt-2">{paymentHistory?.length}</p>
            <p className="text-zinc-500 text-xs mt-1">Successful transactions or pending Payments</p>
          </div>

          <div className={`${ZINC_SURFACE_CLASS} p-5`}>
            <h3 className="text-sm font-semibold uppercase text-zinc-400">Support Tickets</h3>
            <p className="text-4xl font-black text-yellow-600 mt-2">{tickets.length}</p>
            <p className="text-zinc-500 text-xs mt-1">Tickets opened to date</p>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className={`${ZINC_SURFACE_CLASS} mt-8`}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-3">
            Regional Preferences
          </h2>
          <p className="text-zinc-400 leading-relaxed text-sm">
            These settings influence how dates, times, and language are displayed across the application.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-5">
            <div>
              <h4 className="text-zinc-500 text-sm uppercase font-semibold">Preferred Language</h4>
              <p className="text-lg font-bold text-white mt-1">{user?.language || "English"}</p>
            </div>

            <div>
              <h4 className="text-zinc-500 text-sm uppercase font-semibold">Time Zone</h4>
              <p className="text-lg font-bold text-white mt-1">{user?.time_zone || "Africa/Nairobi (EAT)"}</p>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className={`${ZINC_SURFACE_CLASS} mt-8`}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-3">
            Account Security
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <p className="text-zinc-300">Password Strength</p>
              <span className="font-bold text-green-500">Strong</span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-zinc-300">Two-Factor Authentication (2FA)</p>
              <span className="font-bold text-yellow-500">Not Enabled</span>
            </div>
          </div>

          <button className={`${BLUE_BUTTON_CLASS} mt-6`}>
            Enable Two-Factor Authentication
          </button>
        </div>

        {/* Delete Warning Modal */}
        {showDeleteWarning && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
            <div className="bg-zinc-950 p-8 rounded-2xl w-full max-w-sm shadow-2xl border border-zinc-800">
              <h2 className="text-2xl font-black text-red-500 text-center mb-3">
                 Account Deletion
              </h2>
              <p className="text-zinc-300 mt-3 text-center text-sm">
                Are you absolutely sure you want to delete your account? All data
                will be permanently lost. This action cannot be undone.
              </p>

              <div className="flex justify-between gap-3 mt-8">
                <button
                  onClick={() => setShowDeleteWarning(false)}
                  className="w-1/2 py-3 bg-zinc-700 text-white font-semibold rounded-xl hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>

                <button
                  className="w-1/2 py-3 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-colors"
                >
                  Permanently Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayOut>
  );
};

export default Profile;
