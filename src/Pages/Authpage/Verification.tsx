"use client";

import { useForm } from "react-hook-form";
import Authbg from "/authbg.jpg";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../../Hooks/UseAxios";
import { PiSpinnerBold } from "react-icons/pi";

const Verification = () => {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { handleSubmit } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "your email";
  const Axiosinstance = useAxios();

  const resendAvailable = true;

  const onSubmit = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit code.");
      return;
    }

    try {
      setLoading(true);
      const response = await Axiosinstance.post("/users/register/otp-verify", {
        email,
        otp,
      });

      if (response.data.success) {
        toast.success("Email verified successfully!");
        setTimeout(() => {
          navigate("/sign-in");
        }, 1500);
      } else {
        toast.error(response.data.message || "Verification failed.");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!resendAvailable) return;
    try {
      const response = await Axiosinstance.post("/users/register/otp-resend", {
        email,
      });

      if (response.data.success) {
        toast.info("Verification code resent to your email.");
        setOtp("");
      } else {
        toast.error(response.data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while resending OTP.");
    }
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat w-full lg:pt-[220px] pt-32 lg:pb-20 pb-10 min-h-screen px-4"
      style={{ backgroundImage: `url(${Authbg})` }}
    >
      <ToastContainer />
      <div className="w-full max-w-[900px] bg-white mx-auto px-6 md:px-[94px] py-10 rounded-[18px] backdrop-blur-[16px]">
        <h2 className="text-[32px] md:text-[40px] text-center font-sans text-[#222] font-bold">
          Verification Code
        </h2>
        <h4 className="text-[16px] md:text-[18px] text-[#5A5C5F] font-normal text-center mt-5 md:px-18">
          Enter verification code sent to your email address{" "}
          <span className="font-semibold text-black">{email}</span>
        </h4>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-10">
          <div>
            <h5 className="text-[#222] font-sans font-medium pb-4">Code</h5>
            <div className="flex justify-center">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputType="tel"
                shouldAutoFocus
                renderSeparator={<span className="mx-1 md:mx-5">-</span>}
                renderInput={props => (
                  <input
                    {...props}
                    className="!w-8 !h-8 md:!w-20 md:!h-20 text-center text-xl font-bold border border-[#CFCFCF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#13A6EF] transition-all duration-200"
                  />
                )}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#13A6EF] lg:px-[100px] px-[40px] lg:py-[18px] py-[15px] mt-10 text-white font-bold font-sans lg:text-[18px] text-[16px] rounded-[8px] w-full cursor-pointer border border-[#13A6EF] hover:bg-white hover:text-black duration-300 ease-in-out flex justify-center items-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <PiSpinnerBold className="animate-spin size-5 fill-black" />
            ) : (
              "Confirm Code"
            )}
          </button>

          <p className="text-[#5A5C5F] font-sans font-normal pt-5 text-center">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className={`font-bold cursor-pointer ${
                !loading ? "text-[#222]" : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Resend
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Verification;
