import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import Avatar1 from "../../public/Avatar1.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

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
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log({ ...data, avatar });
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-x-10">
        <div className="relative h-[200px] w-[200px] shrink-0">
          <img
            src={avatar}
            alt="Avatar"
            className="h-full w-full rounded-full object-cover cursor-pointer"
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

        <div className="grid grid-cols-2 gap-8 w-full">
          {/* Current Password */}
          <div className="relative col-span-2">
            <h3 className="text-[18px] font-medium text-[#222] pb-4">
              Current Password
            </h3>
            <input
              type={showPassword ? "text" : "password"}
              {...register("currentPassword", {
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
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword.message}
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
              {...register("confirmPassword", {
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
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
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
          Change Password
        </button>
      </div>
    </form>
  );
};

export default Securityform;
