/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Logged in successfully!");
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      const axiosError: AxiosError = error as any;
      setError(
        (axiosError.response?.data as any).message ?? "Invalid Credentials"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-zinc-700 shadow-zinc-900 p-6 rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer transition duration-200 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
