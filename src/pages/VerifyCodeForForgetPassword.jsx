import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosInstance } from "@/apis/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setAuthUser } from "@/store/authSlice";
import { verfiyCodeForForgetPassword } from "@/apis";
export default function ConfirmCode() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [isloadding, setIsLoadding] = useState(false);

  const [form, setForm] = useState({
    code: "",
    password: "",
  });
  const changePassword = async (event) => {
    setIsLoadding(true);
    if (form.code.length < 6) {
      toast.error("Please Enter 6 Digit Code");
      return;
    }
    const formData = {
      email: localStorage.getItem("signin-email"),
      otp: form.code,
      password: form.password,
    };
    verfiyCodeForForgetPassword(formData)
      .then((res) => {
        toast.success(res.data.message);
        localStorage.removeItem("signin-email");
        navigate("/signin");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <p>
            Code is Send To Your Email {localStorage.getItem("signin-email")}
          </p>
          <InputOTP
            maxLength={6}
            onChange={(e) => {
              setForm({ ...form, code: e });
            }}
          >
            <InputOTPGroup className="w-full">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
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
                ></div>
              </div>
            </div>
            <div className="mt-2 relative w-[300px]">
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
          <button
            type="submit"
            className=" cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={changePassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
