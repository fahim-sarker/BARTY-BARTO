import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import Avatar1 from "../../public/Avatar1.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import useAxios from "../Hooks/UseAxios";
import { useNavigate } from "react-router-dom";
import useFetchData from "../Hooks/UseFetchData";

type FormData = {
  old_password: string;
  newPassword: string;
  password_confirmation: string;
};
interface User {
  avatar: string;
}

const Securityform = () => {
  const [avatar, setAvatar] = useState<string>(Avatar1);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors,isLoading},
  } = useForm<FormData>();

  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        old_password: data.old_password,
        password: data.newPassword,
        password_confirmation: data.password_confirmation,
      };

      const response = await axiosInstance.post(
        "/users/password/change",
        payload
      );

      if (response.data.success) {
        toast.success("Password changed successfully!");
        navigate("/sign-in")
      } else {
        toast.error(response.data.message || "Failed to change password");
      }
    } catch (error: any) {
      console.error("Password change failed:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while changing the password");
      }
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const { data } = useFetchData<{ data: User }>("/users/data");

  const user = data?.data;
  const baseApiUrl = import.meta.env.VITE_BASE_URL.replace(/\/api\/?$/, "");

  const avatarSrc = user?.avatar
    ? `${baseApiUrl}/${user.avatar}`
    : "/avatar.png";


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row gap-y-10 gap-x-10">
        <div className="relative w-full max-w-[200px] self-center lg:self-start">
          <img
            src={avatarSrc || avatar}
            alt="Avatar"
            className="w-full h-[200px] rounded-full object-cover cursor-pointer"
            onClick={() => fileRef.current?.click()}
          />
          <div
            className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            <FiEdit2 className="text-gray-700" />
          </div>
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Current Password */}
          <div className="relative col-span-full">
            <h3 className="text-[18px] font-medium text-[#222] pb-4">
              Current Password
            </h3>
            <input
              type={showPassword ? "text" : "password"}
              {...register("old_password", {
                required: "Current password is required",
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
            {errors.old_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.old_password.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <h3 className="text-[18px] font-medium text-[#222] pb-4">
              New Password
            </h3>
            <input
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="********"
              className="border border-[#CFCFCF] rounded-[8px] py-[11px] px-6 text-[#5A5C5F] text-[16px] w-full"
            />
            <div
              className="absolute right-4 top-[57px] cursor-pointer text-gray-500"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <h3 className="text-[18px] font-medium text-[#222] pb-4">
              Confirm Password
            </h3>
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("password_confirmation", {
                required: "Please confirm your password",
                validate: value =>
                  value === watch("newPassword") || "Passwords do not match",
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
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="bg-[#13A6EF] text-white px-8 py-3 rounded-lg cursor-pointer"
        >
          {isLoading ? "Change Password..." : "Change Password"}
        </button>
      </div>
    </form>
  );
};

export default Securityform;
