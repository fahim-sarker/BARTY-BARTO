import { useForm } from "react-hook-form";
import Authbg from "/authbg.jpg";
import { useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/UseAxios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { PiSpinnerBold } from "react-icons/pi";

type FormData = {
  email: string;
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const Axiosinstance = useAxios();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await Axiosinstance.post(
        "/users/login/email-verify",
        data
      );

      if (response.data.success) {
        toast.success("OTP sent successfully");
        setTimeout(() => {
          navigate(
            `/account-confirmation?email=${encodeURIComponent(data?.email)}`
          );
        }, 1000);
      } else {
        toast.error("Invalid email address");
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat w-full lg:pt-[220px] pt-32 lg:pb-20 pb-10 min-h-screen px-4"
      style={{ backgroundImage: `url(${Authbg})` }}
    >
      <div className="w-full max-w-[900px] bg-white mx-auto px-6 md:px-[94px] py-10 rounded-[18px] backdrop-blur-[16px]">
        <h2 className="text-[32px] md:text-[40px] text-center font-sans text-[#222] font-bold">
          Forgot Password
        </h2>
        <h4 className="text-[16px] md:text-[18px] text-[#5A5C5F] font-normal text-center mt-5 md:px-28">
          Please provide your registered email address to receive a password
          reset code.
        </h4>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-10">
          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-4">
              Email Address
            </h3>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="charlicurs@gmail.com"
              className="border border-[#CFCFCF] rounded-[8px] py-[11px] px-6 text-[#5A5C5F] text-[16px] w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#13A6EF] md:px-[100px] px-[50px] py-[18px] mt-10 text-white font-bold font-sans text-[18px] rounded-[8px] w-full cursor-pointer border border-[#13A6EF] hover:bg-white hover:text-black duration-300 ease-in-out flex justify-center items-center gap-2"
          >
            {loading ? (
              <PiSpinnerBold className="animate-spin size-5 fill-black" />
            ) : (
              "Send Code"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ForgotPassword;
