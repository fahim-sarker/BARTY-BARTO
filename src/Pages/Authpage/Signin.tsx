import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import Authbg from "/authbg.jpg";

type FormData = {
  email: string;
  password: string;
  terms: boolean;
};

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Login data:", data);
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat w-full min-h-screen lg:pt-[220px] pt-32 lg:pb-20 pb-10 px-4 sm:px-6"
      style={{ backgroundImage: `url(${Authbg})` }}
    >
      <div className="max-w-[900px] w-full bg-white mx-auto px-6 sm:px-10 md:px-[60px] lg:px-[94px] py-10 rounded-[18px] backdrop-blur-[16px]">
        <h2 className="text-3xl sm:text-[40px] text-center font-sans text-[#222] font-bold">
          Log In
        </h2>
        <h4 className="text-base sm:text-[18px] text-[#5A5C5F] font-medium text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-[#222] font-bold">
            Sign up
          </Link>
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

          <div className="relative mt-6">
            <h3 className="text-[18px] font-medium text-[#222] pb-4">
              Password
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
              {showPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5">
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
                className="w-5 h-5 rounded-[8px] appearance-none border border-black checked:bg-black cursor-pointer"
              />
              <p className="text-[16px] text-[#494949] font-sans">
                Remember me
              </p>
            </div>
            <Link
              to="/forgot-password"
              className="text-[16px] text-[#494949] font-sans"
            >
              Forgot password?
            </Link>
          </div>
          <Link to="/flight-stats">
            <button
              type="submit"
              className="bg-[#13A6EF] py-[16px] mt-10 text-white font-bold font-sans text-[18px] rounded-[8px] w-full cursor-pointer border border-[#13A6EF] hover:bg-white hover:text-black duration-300 ease-in-out"
            >
              Log In
            </button>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Signin;
