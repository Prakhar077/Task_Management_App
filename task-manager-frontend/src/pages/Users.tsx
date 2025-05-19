import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import useAuth from '../hooks/useAuth';
import type { User } from '../types';

interface UserForm {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

const Users: React.FC = () => {
  const { token } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<UserForm>({
    username: '',
    password: '',
    role: 'user',
  });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle add or update user submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingUserId) {
        // Update user
        await axiosInstance.put(
          `/users/${editingUserId}`,
          {
            username: form.username,
            ...(form.password ? { password: form.password } : {}),
            role: form.role,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditingUserId(null);
      } else {
        // Create user
        await axiosInstance.post(
          '/users',
          {
            username: form.username,
            password: form.password,
            role: form.role,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setForm({ username: '', password: '', role: 'user' });
      fetchUsers();
    } catch (error) {
      console.error('Failed to submit user', error);
    }
  };

  // Handle edit button click
  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setForm({ username: user.username, password: '', role: user.role });
  };

  // Handle delete user
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axiosInstance.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  // Handle cancel editing
  const handleCancelEdit = () => {
    setEditingUserId(null);
    setForm({ username: '', password: '', role: 'user' });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded bg-gray-50">
        <h2 className="text-xl mb-2">{editingUserId ? 'Edit User' : 'Add User'}</h2>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
            disabled={!!editingUserId} // Disable username change on edit
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">
            {editingUserId ? 'New Password (leave blank to keep current)' : 'Password'}
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            {...(!editingUserId && { required: true })}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingUserId ? 'Update User' : 'Add User'}
          </button>
          {editingUserId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Username</th>
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No users found.
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(user)}
                  className="mr-2 bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
