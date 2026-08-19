import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/auth/login`,
  {
    email: form.email,
    password: form.password,
  },
  {
    withCredentials: true,
  }
);

    console.log("Login response:", response.data);

    if (response.data.success) {
      // IMPORTANT
      setUser(response.data.user);

      navigate("/");
    }
  } catch (error) {
    console.error("Login error:", error);

    alert(
      error.response?.data?.message ||
        "Login failed. Please try again."
    );
  }
};

  return (
    <main className="min-h-screen bg-[#fffaf4] px-5 py-6">

      <div className="mx-auto flex min-h-[90vh] max-w-md flex-col justify-center">

        {/* Back */}
        <Link
          to="/"
          className="mb-8 flex w-fit items-center gap-2 text-sm font-semibold text-gray-500"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* Logo */}
        <div className="mb-8">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff8066] text-white shadow-lg shadow-[#ff8066]/20">
            <Heart size={25} fill="currentColor" />
          </div>

          <h1 className="text-4xl font-black tracking-tight">
            Welcome back ❤️
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Sign in to continue exploring your memories.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-bold">
              Email
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="min-h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 outline-none transition focus:border-[#ff8066] focus:ring-4 focus:ring-[#ff8066]/10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-bold">
                Password
              </label>

              <button
                type="button"
                className="text-xs font-bold text-[#ff8066]"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="min-h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 outline-none transition focus:border-[#ff8066] focus:ring-4 focus:ring-[#ff8066]/10"
              />
            </div>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="min-h-14 w-full rounded-2xl bg-[#172033] font-bold text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Login
          </button>

        </form>

        {/* Register */}
        {/* <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-[#ff8066]"
          >
            Create one
          </Link>
        </p> */}

      </div>
    </main>
  );
}

export default Login;