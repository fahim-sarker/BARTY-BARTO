import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Authbg from "/authbg.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAxios from "../../Hooks/UseAxios";
import { PiSpinnerBold } from "react-icons/pi";

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();

  const email = new URLSearchParams(location.search).get("email") || "";

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/login/reset-password", {
        email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });

      if (response.data.success) {
        toast.success("Password reset successful!");
        setTimeout(() => navigate("/sign-in"), 1500);
      } else {
        toast.error(response.data.message || "Failed to reset password.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat w-full min-h-screen flex items-center justify-center px-4 pt-32 pb-10"
      style={{ backgroundImage: `url(${Authbg})` }}
    >
      <div className="w-full max-w-[900px] bg-white px-6 sm:px-10 md:px-[94px] py-10 rounded-[18px] backdrop-blur-[16px]">
        <h2 className="text-3xl sm:text-[40px] text-center font-sans text-[#222] font-bold">
          Reset Your Password
        </h2>
        <p className="text-base sm:text-[18px] font-sans text-[#5A5C5F] pt-4 text-center px-0 sm:px-10 md:px-40">
          Enter a new password to continue using your account.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="py-9">
          <div className="grid gap-6">
            <div className="relative col-span-2">
              <h3 className="text-[16px] sm:text-[18px] font-medium text-[#222] pb-4">
                Enter New Password
              </h3>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                placeholder="********"
                className="border border-[#CFCFCF] rounded-[8px] py-[11px] px-6 text-[#5A5C5F] text-[16px] w-full"
              />
              <div
                className="absolute right-4 top-[57px] cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="relative col-span-2">
              <h3 className="text-[16px] sm:text-[18px] font-medium text-[#222] pb-4">
                Enter Confirm Password
              </h3>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: value => value === watch("password") || "Passwords do not match",
                })}
                placeholder="********"
                className="border border-[#CFCFCF] rounded-[8px] py-[11px] px-6 text-[#5A5C5F] text-[16px] w-full"
              />
              <div
                className="absolute right-4 top-[57px] cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#13A6EF] mt-10 py-[18px] text-white font-bold text-[18px] rounded-[8px] w-full cursor-pointer border border-[#13A6EF] hover:bg-white hover:text-black duration-300 ease-in-out flex justify-center items-center gap-2"
          >
            {loading ? <PiSpinnerBold className="animate-spin size-5" /> : "Reset Password"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ResetPassword;
