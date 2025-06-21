"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import CountrySelect, { type CountryOption } from "./Reusable/CountrySelect";
import defaultAvatar from "../../public/Avatar1.png";
import useAxios from "../Hooks/UseAxios";
import { toast, ToastContainer } from "react-toastify";
import useFetchData from "../Hooks/UseFetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  phone: string;
  business_name: string;
  business_address: string;
}

type ProfileFormValues = {
  first_name: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  businessAddress: string;
};

const ProfileForm = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(defaultAvatar);
  const [country, setCountry] = useState<CountryOption | null>({
    label: "United States",
    value: "United States",
    flag: "https://flagcdn.com/w40/us.png",
    callingCode: "+1",
  });

  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>();

  const { data } = useFetchData<{ data: User }>("/users/data");
  const user = data?.data;
  const baseApiUrl = import.meta.env.VITE_BASE_URL.replace(/\/api\/?$/, "");

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        businessName: user.business_name,
        businessAddress: user.business_address,
      });
      if (user.avatar) {
        setAvatarPreview(`${baseApiUrl}/${user.avatar}`);
      }
    }
  }, [user, reset, baseApiUrl]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiosInstance.post("/users/data/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["/users/data"] });
    },
    onError: () => {
      toast.error("Something went wrong while updating profile.");
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone.replace(/\D/g, ""));
    formData.append("business_name", data.businessName);
    formData.append("business_address", data.businessAddress);
    formData.append("country", country?.value || "");
    formData.append("calling_code", country?.callingCode || "");

    if (avatar) {
      formData.append("avatar", avatar);
    }

    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="relative w-full max-w-[200px] self-center lg:self-start">
          <img
            src={avatarPreview}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-2">
              First name
            </h3>
            <input
              {...register("first_name", {
                required: "First name is required",
              })}
              placeholder="Charli"
              className="border border-[#CFCFCF] rounded-[8px] py-3 px-6 text-[#3F3F3F] text-[16px] w-full"
            />
            {errors.first_name && (
              <p className="text-red-600 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-2">
              Last name
            </h3>
            <input
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Curs"
              className="border border-[#CFCFCF] rounded-[8px] py-3 px-6 text-[#3F3F3F] text-[16px] w-full"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-2">
              Email Address
            </h3>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="charlicurs@gmail.com"
              readOnly
              className="border border-[#CFCFCF] rounded-[8px] py-3 px-6 text-[#3F3F3F] text-[16px] w-full"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-2">
              Phone number
            </h3>
            <div className="relative w-full">
              <div className="absolute top-[50%] -translate-y-1/2 left-4 flex items-center gap-2">
                <CountrySelect
                  value={country}
                  onChange={setCountry}
                  name="country"
                  className="bg-transparent border-none outline-none"
                />
                <span className="text-[16px] text-[#3F3F3F]">
                  {country?.callingCode}
                </span>
              </div>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone must be numeric",
                  },
                })}
                type="tel"
                className="w-full border border-[#CFCFCF] rounded-[8px] py-3 pl-[160px] pr-6 text-[#3F3F3F] text-[16px]"
              />
            </div>
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-2">
              Business name
            </h3>
            <input
              {...register("businessName", {
                required: "Business name is required",
              })}
              placeholder="Business name here..."
              className="border border-[#CFCFCF] rounded-[8px] py-3 px-6 text-[#3F3F3F] text-[16px] w-full"
            />
            {errors.businessName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.businessName.message}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-2">
              Business Address
            </h3>
            <input
              {...register("businessAddress", {
                required: "Business address is required",
              })}
              placeholder="Fill this"
              className="border border-[#CFCFCF] rounded-[8px] py-3 px-6 text-[#3F3F3F] text-[16px] w-full"
            />
            {errors.businessAddress && (
              <p className="text-red-600 text-sm mt-1">
                {errors.businessAddress.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="bg-[#13A6EF] text-white px-8 py-3 rounded-lg cursor-pointer hover:bg-[#0f92ce] transition duration-300"
        >
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
