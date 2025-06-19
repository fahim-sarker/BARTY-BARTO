import { forwardRef, useRef, useImperativeHandle } from "react";

const data = [
  {
    nationality: "USA",
    detail: "Crew: Nicolas M Van Hauck, 28 JAN 1990, 565789374",
  },
  {
    nationality: "USA",
    detail: "Crew: Justin R Bartosh, 06 Dec 1988, 565789374",
  },
  {
    nationality: "USA",
    detail: "Pax: Gristopher Arenz, 19 Dec 1967, A4S777129",
  },
  {
    nationality: "USA",
    detail: "Pax: Amy Arenz, 11 Feb 1971, 647527873",
  },
  {
    nationality: "USA",
    detail: "Pax: Mackenzte Carroll, 12 Apr 2001, ACYJ637466",
  },
];

const Tabsdata = forwardRef((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getEditableData: () => {
      if (!containerRef.current) return null;

      const editableElements =
        containerRef.current.querySelectorAll<HTMLElement>(
          '[contenteditable="true"]'
        );

      const data: Record<string, string> = {};

      editableElements.forEach((el, index) => {
        const key = el.getAttribute("data-key") || `field${index}`;
        data[key] = el.textContent?.trim() || "";
      });

      return data;
    },
  }));

  return (
    <div ref={containerRef}>
      {/* Top Info Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div className="flex flex-col gap-2">
          <h5 className="font-sans font-semibold text-2xl sm:text-3xl text-[#222] flex gap-x-1 items-center">
            Owner or Operator:
            <span
              data-key="owner"
              className="text-[#222] font-normal"
              contentEditable={true}
            >
              Caribbean Buzz, LLC
            </span>
          </h5>
          <h5 className="font-sans font-semibold text-2xl sm:text-3xl text-[#222] flex gap-x-1 items-center">
            Registration:
            <span
              data-key="registration_number"
              className="text-[#222] font-normal"
              contentEditable={true}
            >
              N282ZZ
            </span>
          </h5>
          <h5 className="font-sans font-semibold text-2xl sm:text-3xl text-[#222] flex gap-x-1 items-center">
            Flight:
            <span
              data-key="flight_no"
              className="text-[#222] font-normal"
              contentEditable={true}
            >
              103
            </span>
          </h5>
        </div>

        <div className="flex flex-col gap-2 text-end">
          <h5 className="font-sans font-semibold text-2xl sm:text-3xl text-[#222] flex gap-x-1 justify-end">
            Flight Date:
            <span
              data-key="flight_date"
              className="text-[#222] font-normal"
              contentEditable={true}
            >
              26 May 2025
            </span>
          </h5>
          <h5 className="font-sans font-semibold text-2xl sm:text-3xl text-[#222] flex gap-x-1 justify-end">
            Arrival:
            <span
              data-key="arrival"
              className="text-[#222] font-normal"
              contentEditable={true}
            >
              (VIJ)
            </span>
          </h5>
          <h5 className="font-sans font-semibold text-2xl sm:text-3xl text-[#222] flex gap-x-1 justify-end">
            Departure:
            <span
              data-key="departure"
              className="text-[#222] font-normal"
              contentEditable={true}
            >
              (STT)
            </span>
          </h5>
        </div>
      </div>

      {/* Title Box */}
      <div className="mt-10 border-2 border-[#222] rounded-lg py-5 px-2 text-center">
        <h3 className="font-sans font-semibold text-[#222] text-3xl sm:text-4xl">
          GENERAL DECLARATION
        </h3>
        <h4 className="font-sans font-medium text-[#222] text-xl sm:text-2xl mt-1">
          (“Place” Column always to list origin, every en-route stop and
          destination)
        </h4>
      </div>

      {/* Declaration Grid */}
      <div className="mt-5 border-2 border-[#222] rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Nationality Column */}
        <div className="w-full lg:w-[15%] border-r border-[#222]">
          <h3 className="border-b border-[#222] py-5 text-center font-sans text-xl font-semibold text-[#222]">
            Nationality
          </h3>
          <ul>
            {data.map((item, index) => (
              <li
                key={index}
                contentEditable={true}
                data-key={`nationality_${index}`}
                className="py-4 px-2 text-center font-sans text-lg text-[#222] border-b border-[#222] last:border-b-0"
              >
                {item.nationality}
              </li>
            ))}
          </ul>
        </div>

        {/* Crew / Passenger Details Column */}
        <div className="w-full lg:w-[45%] border-r border-[#222]">
          <h3 className="border-b border-[#222] py-5 text-center font-sans text-xl font-semibold text-[#222]">
            Crew / Passenger Details
          </h3>
          <ul>
            {data.map((item, index) => (
              <li
                key={index}
                contentEditable={true}
                data-key={`detail_${index}`}
                className="py-4 px-4 font-sans text-lg text-[#222] border-b border-[#222] last:border-b-0"
              >
                {item.detail}
              </li>
            ))}
          </ul>
        </div>

        {/* Passenger Summary Column */}
        <div className="w-full lg:w-[40%]">
          <h3 className="border-b border-[#222] py-5 text-center font-sans text-xl font-semibold text-[#222]">
            Number Of Passengers On This Stage
          </h3>
          <div className="px-5 py-5 space-y-5">
            {[
              ["Departure Place:", "STT"],
              ["Embarking", "4"],
              ["Through on same flight", "0"],
              ["Arrival Place", "VIJ"],
              ["Disembarking", "0"],
            ].map(([label, value], index) => (
              <div key={index} className="flex justify-between">
                <h4 className="text-base font-sans text-[#222] font-medium">
                  {label}
                </h4>
                <h5
                  data-key={`summary_${index}`}
                  className="text-base font-sans text-[#222] font-medium"
                  contentEditable={["STT", "VIJ"].includes(value)}
                >
                  {value}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border border-black my-5"></div>

      {/* Health Declaration & Official Use */}
      <div className="flex flex-col lg:flex-row border-b-2 border-[#222]">
        <div className="lg:w-3/5 border-r-2 border-[#222] px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#222] font-sans mt-5">
            DECLARATION OF HEALTH
          </h2>
          {[
            "Persons on board with illnesses...",
            "Any other condition on board...",
            "Details of each disinsecting or sanitary treatment...",
          ].map((text, i) => (
            <div key={i} className="mt-5">
              <p className="font-sans text-base sm:text-lg text-[#222]">
                {text}
              </p>
              <h5
                data-key={`health_none_${i}`}
                className="text-xl font-sans text-[#222] font-semibold py-2"
              >
                None
              </h5>
              <div className="border-b border-[#222]"></div>
              <div className="border-b border-[#222] mt-4"></div>
            </div>
          ))}
          <p className="my-8 font-sans text-base text-[#222]">
            Signed, if required...
          </p>
        </div>

        <div className="lg:w-2/5 py-5">
          <h2 className="text-2xl pl-4 sm:text-3xl font-semibold text-[#222] font-sans text-center border-b-2 border-[#222] pb-4">
            FOR OFFICIAL USE ONLY
          </h2>
          <h5
            data-key="official_block"
            className="text-xl pl-4 font-medium text-[#222] font-sans mt-5"
          >
            BLOCK:
          </h5>
          <h5
            data-key="official_etd"
            className="text-xl pl-4 font-medium text-[#222] font-sans mt-8"
          >
            ETD:
          </h5>
        </div>
      </div>

      {/* Final Declaration */}
      <div className="mt-5">
        <p
          data-key="final_declaration"
          className="font-sans text-base sm:text-lg text-[#222]"
        >
          I declare that all statements and particulars contained in this
          General Declaration...
        </p>
      </div>

      <div className="mt-20">
        <h5 className="text-lg sm:text-xl font-medium font-sans text-end">
          Signature.............................
        </h5>
        <h4 className="font-sans text-xl sm:text-2xl mt-5 font-semibold text-[#222] text-end">
          Authorized Agent or Pilot-in Command
        </h4>
      </div>
    </div>
  );
});

export default Tabsdata;
