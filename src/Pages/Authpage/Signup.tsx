import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Authbg from "/authbg.jpg";
import { Link } from "react-router-dom";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat w-full lg:pt-[220px] pt-32 lg:pb-20 pb-10 px-4 sm:px-8"
      style={{ backgroundImage: `url(${Authbg})` }}
    >
      <div className="bg-white max-w-5xl w-full mx-auto px-6 sm:px-10 md:px-16 py-10 rounded-2xl backdrop-blur-lg">
        <h2 className="text-3xl sm:text-4xl text-center font-sans text-[#222] font-bold">
          Sign up
        </h2>
        <p className="text-base sm:text-lg font-sans text-[#5A5C5F] pt-4 text-center">
          Let's have these fields
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="py-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-[#222] pb-2">
                First name
              </h3>
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="Charli"
                className="border border-[#CFCFCF] rounded-md py-3 px-4 text-[#5A5C5F] text-base w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-medium text-[#222] pb-2">
                Last name
              </h3>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                })}
                placeholder="Curs"
                className="border border-[#CFCFCF] rounded-md py-3 px-4 text-[#5A5C5F] text-base w-full"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <h3 className="text-base sm:text-lg font-medium text-[#222] pb-2">
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
                className="border border-[#CFCFCF] rounded-md py-3 px-4 text-[#5A5C5F] text-base w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <h3 className="text-base sm:text-lg font-medium text-[#222] pb-2">
                Password
              </h3>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                placeholder="********"
                className="border border-[#CFCFCF] rounded-md py-3 px-4 text-[#5A5C5F] text-base w-full"
              />
              <div
                className="absolute right-4 md:top-[52px] top-12 cursor-pointer text-gray-500"
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

            <div className="relative">
              <h3 className="text-base sm:text-lg font-medium text-[#222] pb-2">
                Confirm Password
              </h3>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: value =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder="********"
                className="border border-[#CFCFCF] rounded-md py-3 px-4 text-[#5A5C5F] text-base w-full"
              />
              <div
                className="absolute right-4 md:top-[52px] top-12 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 pt-6">
            <input
              type="checkbox"
              {...register("terms", { required: true })}
              className="w-5 h-5 mt-1 rounded border border-black checked:bg-black cursor-pointer"
            />
            <p className="text-sm sm:text-base text-[#494949]">
              I hereby confirm and accept the{" "}
              <span className="text-[#13A6EF]">Terms and Conditions</span> and{" "}
              <span className="text-[#13A6EF]">Privacy Policy.</span> I confirm
              that I am over 18 years of age.
            </p>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-2">
              You must accept the terms
            </p>
          )}
          <Link to='/sign-in'>
            <button
              type="submit"
              className="bg-[#13A6EF] hover:bg-white hover:text-black transition-all duration-300 border border-[#13A6EF] text-white text-lg font-bold py-4 w-full rounded-md mt-8 cursor-pointer"
            >
              Registration
            </button>
          </Link>

          <h4 className="text-center text-[#5A5C5F] text-base font-medium mt-5">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-[#222]">
              Log In
            </Link>
          </h4>
        </form>
      </div>
    </section>
  );
};

export default Signup;
