import { forgetPassword } from "@/apis";
import { axiosInstance } from "@/apis/axios/axios";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isLoadding, setIsLoadding] = useState(false);
  const handleSubmit = (event) => {
    setIsLoadding(true);
    event.preventDefault();
    forgetPassword(email)
      .then((res) => {
        navigate("/verifycodeforforgetpassword");
        toast.info("Code is Send Your Gmail.");
        localStorage.setItem("signin-email", res?.data?.data);
        setIsLoadding(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setIsLoadding(false);
      });
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
                  setEmail(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex justify-center">
            {isLoadding ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Forget Password
              </button>
            )}
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
