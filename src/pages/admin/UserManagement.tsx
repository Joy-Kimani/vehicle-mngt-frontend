import React, { useState } from "react";

// Example user type
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "staff" | "tenant";
  status: "active" | "blocked";
}

const UserManagement: React.FC = () => {
  // Dummy user data
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Joy Kimani", email: "joy@example.com", role: "tenant", status: "active" },
    { id: 2, name: "Admin User", email: "admin@example.com", role: "admin", status: "active" },
    { id: 3, name: "Manager Mike", email: "manager@example.com", role: "manager", status: "blocked" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter users by search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle user block/unblock
  const toggleStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user
      )
    );
  };

  // Delete user
  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // Change role
  const changeRole = (id: number, role: User["role"]) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role } : user))
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      {/* Search Bar */}
      <div className="form-control w-full max-w-xs">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="select select-sm select-bordered"
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value as User["role"])}
                  >
                    <option value="tenant">Tenant</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="staff">Staff</option>
                  </select>
                </td>
                <td>
                  <span className={user.status === "active" ? "text-success" : "text-error"}>
                    {user.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => toggleStatus(user.id)}
                  >
                    {user.status === "active" ? "Block" : "Unblock"}
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => alert(`View booking/payment history for ${user.name}`)}
                  >
                    History
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
