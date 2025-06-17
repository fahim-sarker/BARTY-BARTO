import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import Avatar1 from "../../public/Avatar1.png";
import CountrySelect, { type CountryOption } from "./Reusable/CountrySelect";

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
  const [country, setCountry] = useState<CountryOption | null>({
    label: "United States",
    value: "United States",
    flag: "https://flagcdn.com/w40/us.png",
    callingCode: "+1",
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log({
      ...data,
      country: country?.value,
      callingCode: country?.callingCode,
      avatar,
    });
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Avatar */}
        <div className="relative w-full max-w-[200px] self-center lg:self-start">
          <img
            src={avatar}
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

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* First Name */}
          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-2">
              First name
            </h3>
            <input
              {...register("firstName", { required: "First name is required" })}
              placeholder="Charli"
              className="border border-[#CFCFCF] rounded-[8px] py-3 px-6 text-[#3F3F3F] text-[16px] w-full"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
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

          {/* Email */}
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
              placeholder="charlicurs@gmai.com"
              className="border border-[#CFCFCF] rounded-[8px] py-3 px-6 text-[#3F3F3F] text-[16px] w-full"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
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
                {...register("phone", { required: "Phone number is required" })}
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

          {/* Business Name */}
          <div>
            <h3 className="text-[18px] font-medium text-[#222] pb-2">
              Business name
            </h3>
            <input
              {...register("businessName", {
                required: "Business name is required",
              })}
              placeholder="Business name here...."
              className="border border-[#CFCFCF] rounded-[8px] py-3 px-6 text-[#3F3F3F] text-[16px] w-full"
            />
            {errors.businessName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.businessName.message}
              </p>
            )}
          </div>

          {/* Business Address */}
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
          className="bg-[#13A6EF] text-white px-8 py-3 rounded-lg cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
