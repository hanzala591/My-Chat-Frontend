import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [form, setForm] = useState({
    email: "",
    prepassword: "",
    newpassword: "",
    confirmPassword: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.newpassword !== form.confirmPassword) {
      toast.error("New Password and Confirm Does Not Match");
    }
    console.log(form);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[300px] flex flex-col justify-center  gap-4">
        <h1 className="font-bold text-2xl">Change Password</h1>
        <form
          action="#"
          onSubmit={handleSubmit}
          method="POST"
          className="space-y-6"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(event) => {
                  setForm({ ...form, email: event.target.value });
                }}
              />
            </div>
          </div>

          {/* Previous Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="prepassword"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Previous Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="prepassword"
                name="prepassword"
                type={hiddenPassword ? "password" : "text"}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(event) => {
                  setForm({ ...form, prepassword: event.target.value });
                }}
              />
              <div
                className="absolute top-1/2 right-3 -translate-1/2"
                onClick={() => setHiddenPassword((v) => !v)}
              >
                {hiddenPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="newpassword"
                className="block text-sm/6 font-medium text-gray-900"
              >
                New Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="newpassword"
                name="newpassword"
                type={hiddenPassword ? "password" : "text"}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(event) => {
                  setForm({ ...form, newpassword: event.target.value });
                }}
              />
              <div
                className="absolute top-1/2 right-3 -translate-1/2"
                onClick={() => setHiddenPassword((v) => !v)}
              >
                {hiddenPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          {/* Confirm Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={hiddenPassword ? "password" : "text"}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(event) => {
                  setForm({ ...form, confirmPassword: event.target.value });
                }}
              />
              <div
                className="absolute top-1/2 right-3 -translate-1/2"
                onClick={() => setHiddenPassword((v) => !v)}
              >
                {hiddenPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Forget Password
            </button>
          </div>
        </form>
        <div className="mt-10 text-sm/6 text-gray-500 flex justify-center gap-1">
          Back To ?{"   "}
          <Link to="/signin">
            <div className="font-semibold text-indigo-600 hover:text-indigo-500 underline">
              Signin
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
