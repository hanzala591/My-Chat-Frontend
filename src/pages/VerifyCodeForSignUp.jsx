import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosInstance } from "@/apis/axios/axios";
import { useNavigate } from "react-router-dom";
import { verfiyCodeForSignUp } from "@/apis";
import { setAuthUser } from "@/store/authSlice";
export default function ConfirmCode() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otpCode, setOtpCode] = useState();
  const handleverify = async (event) => {
    const formData = {
      email: localStorage.getItem("signup-email"),
      otp: otpCode,
    };
    verfiyCodeForSignUp(formData)
      .then((res) => {
        toast.success(res?.data?.data?.message);
        dispatch(setAuthUser(res?.data?.data));
        localStorage.removeItem("signup-email");
        if (res?.data?.data?.role === "admin") {
          navigate("/admin");
          console.log("Admin");
        } else {
          navigate("/");
          console.log("User");
        }
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
              setOtpCode(e);
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <button
            type="submit"
            className=" cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleverify}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
