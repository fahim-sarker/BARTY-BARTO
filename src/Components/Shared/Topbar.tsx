import Logo from "/logo.png";
import { Link } from "react-router-dom";
import useFetchData from "../../Hooks/UseFetchData";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const Topbar = () => {
  const { data } = useFetchData<{ data: User }>("/users/data");

  const user = data?.data;
  const baseApiUrl = import.meta.env.VITE_BASE_URL.replace(/\/api\/?$/, "");

  const avatarSrc = user?.avatar
    ? `${baseApiUrl}/${user.avatar}`
    : "/avatar.png";

  const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#F9FAFB] xl:py-6 py-3 lg:px-[60px] px-8 z-50 shadow">
      <div className="flex justify-between items-center">
        <figure className="xl:flex hidden">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-fit h-fit" />
          </Link>
        </figure>
        <div className="flex gap-x-6 border-l border-[#F0F0FA] items-center pl-5">
          <img
            src={avatarSrc}
            alt="Avatar"
            className="h-[56px] w-[56px] rounded-full object-cover"
          />
          <h4 className="text-[#161C24] font-sans font-medium text-[20px]">
            {fullName || "User"}
          </h4>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
