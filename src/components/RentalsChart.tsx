import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RentalsChart:React.FC = ({ data }) => {
  return (
    <div className="bg-gray-800 shadow-xl rounded-xl p-6 border border-indigo-600/50 h-96">
      <h3 className="text-lg font-bold text-indigo-400 mb-4">Monthly Rentals</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="rentals" stroke="#4F46E5" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RentalsChart;



