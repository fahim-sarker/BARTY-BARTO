import Logo from "/logo.png";
import Avatar from "/avatar.png";

const Topbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#F9FAFB] xl:py-6 py-3 lg:px-[60px] px-8 z-50 shadow">
      <div className="flex justify-between items-center">
        <figure className=" xl:flex hidden">
          <img src={Logo} alt="Logo" className="w-fit h-fit" />
        </figure>
        <div className="flex gap-x-6 border-l border-[#F0F0FA] items-center pl-5">
          <img
            src={Avatar}
            alt="Avatar"
            className="h-[56px] w-[56px] rounded-full object-cover"
          />
          <h4 className="text-[#161C24] font-sans font-medium text-[20px]">
            Sifat
          </h4>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
