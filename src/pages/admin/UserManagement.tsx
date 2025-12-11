import React, { useState, useMemo } from "react";
import AdminLayout from "../../components/adminDashboard/AdminLayout";
import { UserApi, type Customer } from "../../features/Api/UsersAPI";

// Matches backend Users table
interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "user";
  created_at: string;
}

const UserManagement: React.FC = () => {
  const { data: users = [], isLoading } = UserApi.useGetAllCustomersQuery();
  const [updateRole] = UserApi.useUpdateUserRoleMutation();
  const [toggleStatus] = UserApi.useToggleUserStatusMutation();
  const [deleteUser] = UserApi.useDeleteUserMutation();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((u: Customer) =>
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  if (isLoading) {
    return <div className="p-6">Loading users...</div>;
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">User Management</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

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
              {filteredUsers.map((user: Customer) => (
                <tr key={user.user_id}>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      className="select select-sm select-bordered"
                      value={user.role}
                      onChange={(e) => updateRole({
                        user_id: user.user_id,
                        role: e.target.value
                      })}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <span className={user.is_active ? "text-success" : "text-error"}>
                      {user.is_active ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="space-x-2">
                    {/* <button
                      className="btn btn-sm btn-warning"
                      onClick={() => toggleStatus(user.user_id)}
                    >
                      Block
                    </button> */}
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => toggleStatus(user.user_id)}
                    >
                      {user.is_active ? "Block" : "Unblock"}
                    </button>
                    <td>

                    
                    </td>

                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => deleteUser(user.user_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
