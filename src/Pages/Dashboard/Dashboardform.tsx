import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaArrowDownLong } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import Tabsdata from "../../Components/Reusable/Tabsdata";

const Dashboardform = () => {
  return (
    <>
      <section className="bg-[#FFF] 2xl:px-[60px] px-8 2xl:py-[100px] py-12">
        <div className="2xl:flex justify-between">
          <h5 className="font-sans font-normal 2xl:text-[24px] lg:text-[22px] text-[18px] text-[#222] 2xl:text-start text-center">
            EAPIS:{" "}
            <span contentEditable={true} className="text-[#E90B0B]">
              1765456
            </span>
          </h5>
          <h2 className="font-sans font-bold 2xl:text-[48px] lg:text[35px] text-[22px] text-[#222] 2xl:text-end text-center">
            GENERAL DECLARATION
          </h2>
          <h5
            contentEditable={true}
            className="font-sans font-normal 2xl:text-[24px] lg:text-[22px] text-[18px] text-[#222] 2xl:text-start text-center"
          >
            ICAO Annex 9, Appendix 1
          </h5>
        </div>
        <div className="flex justify-center">
          <Tabs className="w-full">
            <TabList className="flex gap-x-5 border-b border-[#E0E0E0] w-fit mx-auto">
              <Tab className="outline-0 cursor-pointer text-[#222] font-medium font-sans 2xl:text-[30px] lg:text-[25px] text-[23px]">
                Outward /
              </Tab>
              <Tab className="outline-0 cursor-pointer text-[#222] font-medium font-sans 2xl:text-[30px] lg:text-[25px] text-[23px]">
                Inward
              </Tab>
            </TabList>

            <TabPanel className="pt-18">
              <Tabsdata />
            </TabPanel>
            <TabPanel>
              <Tabsdata />
            </TabPanel>
          </Tabs>
        </div>
      </section>
      <div className="flex flex-col md:flex-col lg:flex-row gap-4 md:gap-4 lg:gap-x-6 justify-center lg:justify-end items-center pt-5 pb-20">
        <button
          className="w-full md:w-auto px-[38px] py-3 hover:bg-[#13A6EF] hover:text-white duration-300 ease-in-out 
    rounded-[3px] border border-[#13A6EF] font-sans text-[15px] font-bold cursor-pointer flex justify-center items-center gap-x-3"
        >
          Share
          <IoIosShareAlt />
        </button>
        <button
          className="w-full md:w-auto px-[38px] py-3 rounded-[3px] bg-[#13A6EF] border border-[#13A6EF] hover:bg-white
    hover:text-black duration-300 ease-in-out font-sans text-[15px] font-bold cursor-pointer text-white flex justify-center items-center gap-x-3"
        >
          Save & Download
          <FaArrowDownLong />
        </button>
      </div>
    </>
  );
};

export default Dashboardform;
