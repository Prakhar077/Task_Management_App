import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import useAuth from '../hooks/useAuth';

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      login(response.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register('username', { required: true })}
          placeholder="Username"
          className="border p-2 rounded"
        />
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
