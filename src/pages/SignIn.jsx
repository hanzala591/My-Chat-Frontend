import { signInUser } from "@/apis";
import Loader from "@/components/Loader";
import { setAuthUser } from "@/store/authSlice";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignIn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    signInUser(form)
      .then((res) => {
        navigate("/");
        toast.info("You are Signin");
        dispatch(setAuthUser(res?.data?.data));
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <div
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    <Link to="/forgetpassword">Forgot password?</Link>
                  </div>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={hiddenPassword ? "password" : "text"}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(event) => {
                    setForm({ ...form, password: event.target.value });
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

            <div className="w-full flex justify-center ">
              {loading ? (
                <Loader className="h-20" />
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              )}
            </div>
          </form>

          <div className="mt-10 text-sm/6 text-gray-500 flex justify-center gap-1">
            Registered Account?{"   "}
            <Link to="/signup">
              <div className="font-semibold text-indigo-600 hover:text-indigo-500 underline">
                SignUp
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
