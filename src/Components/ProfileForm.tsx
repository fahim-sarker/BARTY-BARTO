import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { FiEdit2 } from "react-icons/fi";
import Avatar1 from "../../public/Avatar1.png";
import CountrySelect from "./Reusable/CountrySelect";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  businessAddress: string;
};

const ProfileForm = () => {
  const [avatar, setAvatar] = useState<string>(Avatar1);
  const [country, setCountry] = useState<string>("United States");
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log({ ...data, country, avatar });
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
          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-4">
              Fast name
            </h3>
            <input
              {...register("firstName", { required: "First name is required" })}
              placeholder="Charli"
              className="border border-[#CFCFCF] rounded-[8px] py-[11px] px-6 text-[#3F3F3F] text-[16px] w-full"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-4">
              Last name
            </h3>
            <input
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Curs"
              className="border border-[#CFCFCF] rounded-[8px] py-[11px] px-6 text-[#3F3F3F] text-[16px] w-full"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-4">
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
              placeholder="charlicurs@gmai.com"
              className="border border-[#CFCFCF] rounded-[8px] py-[11px] px-6 text-[#3F3F3F] text-[16px] w-full"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-4">
              Phone number
            </h3>
            <div className="relative w-full">
              <div className="absolute top-[20%] left-0 flex items-center pl-3">
                <CountrySelect
                  value={country}
                  onChange={setCountry}
                  name="country"
                  className="appearance-none bg-transparent border-none outline-none h-full mr-10"
                />
              </div>
              <input
                {...register("phone", { required: "Phone number is required" })}
                type="tel"
                placeholder="+ 554 564 1564"
                className="w-full border border-[#CFCFCF] rounded-[8px] py-[11px] pl-[60px] pr-6 text-[#3F3F3F] text-[16px] placeholder:ml-1"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-4">
              Business name
            </h3>
            <input
              {...register("businessName", {
                required: "Business name is required",
              })}
              placeholder="Business name here...."
              className="border border-[#CFCFCF] rounded-[8px] py-[11px] px-6 text-[#3F3F3F] text-[16px] w-full"
            />
            {errors.businessName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.businessName.message}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-4">
              Business Address
            </h3>
            <input
              {...register("businessAddress", {
                required: "Business address is required",
              })}
              placeholder="fill this"
              className="border border-[#CFCFCF] rounded-[8px] py-[11px] px-6 text-[#3F3F3F] text-[16px] w-full"
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
          className="bg-[#13A6EF] text-white px-8 py-3 rounded-lg cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
