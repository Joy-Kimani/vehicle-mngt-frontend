import React from "react";
import AdminLayout from "../../components/adminDashboard/AdminLayout";

const Analytics: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-4 space-y-8">

        {/* PAGE TITLE */}
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Monthly Revenue" value="$120,450" />
          <KpiCard title="Total Bookings" value="342" />
          <KpiCard title="Fleet Occupancy" value="78%" />
          <KpiCard title="New Users" value="94" />
        </div>

        {/* REVENUE REPORT */}
        <Section title="Revenue Report">
          <div className="h-64 bg-gray-800 flex items-center justify-center rounded-lg">
            Revenue Chart Placeholder
          </div>

          <Table
            headers={["Month", "Revenue", "Bookings", "Avg Amount", "Top Car"]}
            rows={[
              ["Jan", "$20,000", "32", "$410", "1965 Mustang"],
              ["Feb", "$24,500", "41", "$430", "VW Beetle"],
              ["Mar", "$18,800", "28", "$390", "Ford Cortina"],
            ]}
          />
        </Section>

        {/* BOOKINGS REPORT */}
        <Section title="Booking Report">
          <div className="h-64 bg-gray-100 flex items-center justify-center rounded-lg">
            Booking Chart Placeholder
          </div>

          <Table
            headers={["Booking ID", "Customer", "Car", "Amount", "Date"]}
            rows={[
              ["BK1021", "Sarah", "1965 Mustang", "$450", "2025-10-22"],
              ["BK1022", "James", "VW Camper", "$320", "2025-10-23"],
            ]}
          />
        </Section>

        {/* USER GROWTH REPORT */}
        <Section title="👥 User Growth">
          <div className="h-64 bg-gray-100 flex items-center justify-center rounded-lg">
            User Growth Chart Placeholder
          </div>

          <Table
            headers={["User", "Email", "Joined", "Bookings"]}
            rows={[
              ["Sarah", "sarah@example.com", "2025-08-12", "4"],
              ["John", "john@example.com", "2025-09-02", "1"],
            ]}
          />
        </Section>

        {/* OCCUPANCY REPORT */}
        <Section title="🚗 Fleet Occupancy / Utilization">
          <div className="h-64 bg-gray-100 flex items-center justify-center rounded-lg">
            Occupancy Chart Placeholder
          </div>

          <Table
            headers={["Car", "Days Available", "Days Booked", "Utilization", "Revenue"]}
            rows={[
              ["1965 Mustang", "30", "22", "73%", "$6,200"],
              ["VW Camper", "30", "17", "56%", "$4,300"],
            ]}
          />
        </Section>

        {/* MAINTENANCE REPORT */}
        <Section title="🛠 Maintenance Analytics">
          <div className="h-64 bg-gray-100 flex items-center justify-center rounded-lg">
            Maintenance Chart Placeholder
          </div>

          <Table
            headers={["Car", "Issue", "Cost", "Status", "Date"]}
            rows={[
              ["1965 Mustang", "Engine Tuning", "$250", "Completed", "2025-09-10"],
              ["VW Camper", "Brake Repair", "$140", "Pending", "2025-09-14"],
            ]}
          />
        </Section>

      </div>
    </AdminLayout>
  );
};

export default Analytics;


const KpiCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-zinc-800 p-4 rounded-lg shadow text-center">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-xl font-bold mt-1">{value}</p>
  </div>
);

const Section = ({ title, children,}: {title: string;children: React.ReactNode;}) => (
  <div className="bg-zinc-800 p-6 rounded-lg shadow space-y-4">
    <h2 className="text-xl font-semibold">{title}</h2>
    {children}
  </div>
);

const Table = ({headers,rows,}: {headers: string[];rows: string[][];}) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-50">
          {headers.map((h, i) => (
            <th key={i} className="border p-2 text-sm font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {row.map((cell, i) => (
              <td key={i} className="border p-2 text-sm">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


