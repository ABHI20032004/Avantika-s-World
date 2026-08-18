import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5001/api/auth/register",
      {
        name: form.name,
        email: form.email,
        password: form.password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data);


    if (response.data.success) {
      navigate("/");
    }
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
        "Registration failed. Please try again."
    );
  }
};

  return (
    <main className="min-h-screen bg-[#fffaf4] px-5 py-6">

      <div className="mx-auto flex min-h-[90vh] max-w-md flex-col justify-center">

        <Link
          to="/"
          className="mb-8 flex w-fit items-center gap-2 text-sm font-semibold text-gray-500"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* Header */}
        <div className="mb-8">

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff8066] text-white shadow-lg shadow-[#ff8066]/20">
            <Heart size={25} fill="currentColor" />
          </div>

          <h1 className="text-4xl font-black tracking-tight">
            Create your vault ❤️
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Start preserving the moments that matter.
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-bold">
              Full Name
            </label>

            <div className="relative">

              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="min-h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 outline-none transition focus:border-[#ff8066] focus:ring-4 focus:ring-[#ff8066]/10"
              />

            </div>
          </div>

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

            <label className="mb-2 block text-sm font-bold">
              Password
            </label>

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
                placeholder="Create a password"
                required
                className="min-h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 outline-none transition focus:border-[#ff8066] focus:ring-4 focus:ring-[#ff8066]/10"
              />

            </div>

          </div>

          {/* Confirm */}
          <div>

            <label className="mb-2 block text-sm font-bold">
              Confirm Password
            </label>

            <div className="relative">

              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                required
                className="min-h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 outline-none transition focus:border-[#ff8066] focus:ring-4 focus:ring-[#ff8066]/10"
              />

            </div>

          </div>

          <button
            type="submit"
            className="mt-2 min-h-14 w-full rounded-2xl bg-[#172033] font-bold text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Create Account
          </button>

        </form>

        <p className="mt-7 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-[#ff8066]"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  );
}

export default Register;