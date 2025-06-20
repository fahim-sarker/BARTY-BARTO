import { useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaArrowDownLong } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import Tabsdata from "../../Components/Reusable/Tabsdata";
import useAxios from "../../Hooks/UseAxios";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Dashboardform = () => {
  const tabsDataRef = useRef<any>(null);
  const Axiosinstance = useAxios();
  const targetRef = useRef<HTMLDivElement>(null);

  const [eapisValue, setEapisValue] = useState("1765456");
  const [icaoValue, setIcaoValue] = useState("ICAO Annex 9, Appendix 1");

  const handleDownload = async () => {
    if (!targetRef.current) return;
    targetRef.current.classList.add("force-legacy-colors");

    await new Promise(r => setTimeout(r, 100));

    const canvas = await html2canvas(targetRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("flight_declaration.pdf");

    targetRef.current.classList.remove("force-legacy-colors");
  };

  const handleSaveAndDownload = async () => {
    const tabsData = tabsDataRef.current?.getEditableData() || {};

    const stored = localStorage.getItem("passengerData");
    let storedPassengers: any[] = [];
    try {
      const parsed = JSON.parse(stored || "[]");
      storedPassengers = Array.isArray(parsed) ? parsed : [parsed];
    } catch (err) {
      storedPassengers = [];
    }

    const passenger = storedPassengers.map((p: any) => ({
      name: p.data.full_name,
      passport_number: p.data.passport_number,
      nationality: p.data.nationality,
      dob: p.data.date_of_birth,
      date: p.selectedDate,
    }));

    const payload = {
      flight_no: tabsData.flight_no || tabsData.flight || "",
      flight_date: tabsData.flight_date || tabsData.flightDate || "",
      departure: tabsData.departure || "",
      arrival: tabsData.arrival || "",
      registration_number:
        tabsData.registration_number || tabsData.registration || "",
      eapis: eapisValue,
      owner: tabsData.owner || "",
      icao: icaoValue,
      passenger: passenger,
      pdf_file: "",
      type: "general_declaration",
    };

    try {
      const response = await Axiosinstance.post("/flight", payload);
      if (response.status === 200 || response.status === 201) {
        toast.success("Data saved successfully!");
        localStorage.removeItem("passengerData");
        await handleDownload();
      } else {
        toast.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data");
    }
  };

  return (
    <>
      <section
        ref={targetRef}
        className="bg-[#FFF] 2xl:px-[60px] px-8 2xl:py-[100px] py-12 pdf-compatible"
      >
        <div className="2xl:flex justify-between">
          <h5 className="font-sans font-normal 2xl:text-[24px] lg:text-[22px] text-[18px] text-[#222] 2xl:text-start text-center">
            EAPIS:{" "}
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={e =>
                setEapisValue(e.currentTarget.textContent?.trim() || "")
              }
              className="text-[#E90B0B] outline-none inline-block"
            >
              {eapisValue}
            </div>
          </h5>

          <h2 className="font-sans font-bold 2xl:text-[48px] lg:text[35px] text-[22px] text-[#222] 2xl:text-end text-center">
            GENERAL DECLARATION
          </h2>

          <h5 className="font-sans font-normal 2xl:text-[24px] lg:text-[22px] text-[18px] text-[#222] 2xl:text-start text-center">
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={e =>
                setIcaoValue(e.currentTarget.textContent?.trim() || "")
              }
              className="outline-none inline-block"
            >
              {icaoValue}
            </div>
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
              <Tabsdata ref={tabsDataRef} />
            </TabPanel>
            <TabPanel>
              <Tabsdata ref={tabsDataRef} />
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
          onClick={handleSaveAndDownload}
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
