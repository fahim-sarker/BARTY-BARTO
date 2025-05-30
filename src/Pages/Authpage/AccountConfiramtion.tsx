import { useForm } from "react-hook-form";
import Authbg from "/authbg.jpg";
import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";

const AccountConfirmation = () => {
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(25);
  const [resendAvailable, setResendAvailable] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: {},
  } = useForm();

  useEffect(() => {
    if (!resendAvailable && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendAvailable(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendAvailable, timer]);

  const onSubmit = () => {
    if (otp.length !== 6) {
      alert("Please enter the complete 6-digit code.");
      return;
    }

    console.log("OTP Entered:", otp);
    // Add API submission logic here
  };

  const handleResend = () => {
    if (!resendAvailable) return;

    console.log("Resending OTP...");
    // Add resend logic (e.g., API call) here
    setOtp("");
    setTimer(25);
    setResendAvailable(false);
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat w-full lg:pt-[220px] pt-32 lg:pb-20 pb-10 min-h-screen px-4"
      style={{ backgroundImage: `url(${Authbg})` }}
    >
      <div className="w-full max-w-[900px] bg-white mx-auto px-6 md:px-[94px] py-10 rounded-[18px] backdrop-blur-[16px]">
        <h2 className="text-[32px] md:text-[40px] text-center font-sans text-[#222] font-bold">
          Confirmation Code
        </h2>
        <h4 className="text-[16px] md:text-[18px] text-[#5A5C5F] font-normal text-center mt-5 md:px-18">
          Enter the confirmation code sent to your email address:{" "}
          <span className="font-semibold text-black">abcdfgf@gmail.com</span>
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
            className="bg-[#13A6EF] lg:px-[100px] px-[40px] lg:py-[18px] py-[15px] mt-10 text-white font-bold font-sans lg:text-[18px] text-[16px] rounded-[8px] w-full cursor-pointer border border-[#13A6EF] hover:bg-white hover:text-black duration-300 ease-in-out"
          >
            Confirm Code
          </button>

          <p className="text-[#5A5C5F] font-sans font-normal pt-5 text-center">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={!resendAvailable}
              className={`font-bold ${
                resendAvailable
                  ? "text-[#222]"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Resend
            </button>{" "}
            {!resendAvailable && `in ${timer}s`}
          </p>
        </form>
      </div>
    </section>
  );
};

export default AccountConfirmation;
