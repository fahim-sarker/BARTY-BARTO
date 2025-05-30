const Tabsdata = () => {
  return (
    <>
      {/* Top Info Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div className="flex flex-col gap-2">
          <h5 className="font-sans font-semibold text-2xl sm:text-3xl text-[#222] flex gap-x-1 items-center">
            Owner or Operator:
            <span className="text-[#222] font-normal" contentEditable={true}>
              Caribbean Buzz, LLC
            </span>
          </h5>
          <h5 className="font-sans font-semibold text-2xl sm:text-3xl text-[#222] flex gap-x-1 items-center">
            Registration:
            <span className="text-[#222] font-normal" contentEditable={true}>
              N282ZZ
            </span>
          </h5>
          <h5 className="font-sans font-semibold text-2xl sm:text-3xl text-[#222] flex gap-x-1 items-center">
            Flight:
            <span className="text-[#222] font-normal" contentEditable={true}>
              103
            </span>
          </h5>
        </div>

        <div className="flex flex-col gap-2 text-end">
          <h5 className="font-sans font-semibold text-2xl sm:text-3xl text-[#222] flex gap-x-1 justify-end">
            Flight Date:
            <span className="text-[#222] font-normal" contentEditable={true}>
              26 May 2025
            </span>
          </h5>
          <h5 className="font-sans font-semibold text-2xl sm:text-3xl text-[#222] flex gap-x-1 justify-end">
            Arrival:
            <span className="text-[#222] font-normal" contentEditable={true}>
              (VIJ)
            </span>
          </h5>
          <h5 className="font-sans font-semibold text-2xl sm:text-3xl text-[#222] flex gap-x-1 justify-end">
            Departure:
            <span className="text-[#222] font-normal" contentEditable={true}>
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
      <div className="mt-5 border-2 border-[#222] rounded-lg flex flex-col lg:flex-row overflow-hidden">
        {/* Nationality */}
        <div className="border-b lg:border-b-0 lg:border-r border-[#222] w-full lg:w-[15%]">
          <h3 className="border-b border-[#222] py-5 text-center font-sans text-xl font-semibold text-[#222]">
            Nationality
          </h3>
          <ul>
            {Array(5)
              .fill("USA")
              .map((text, index) => (
                <li
                  key={index}
                  contentEditable={true}
                  className={`py-5 text-center font-sans text-lg text-[#222] ${
                    index < 4 ? "border-b border-[#222]" : ""
                  }`}
                >
                  {text}
                </li>
              ))}
          </ul>
        </div>

        {/* Crew / Passenger */}
        <div className="border-b lg:border-b-0 lg:border-r border-[#222] w-full lg:w-[45%]">
          <h3 className="border-b border-[#222] py-5 text-center font-sans text-xl font-semibold text-[#222]">
            Crew / Passenger Details
          </h3>
          <ul className="px-4">
            <li className="border-b border-[#222] py-4 font-sans text-lg text-[#222]">
              Crew: Nicolas M Van Hauck, 28 JAN 1990, 565789374
            </li>
            <li className="border-b border-[#222] py-4 font-sans text-lg text-[#222]">
              Crew: Justin R Bartosh 06 Dec 1988 565789374
            </li>
            <li
              contentEditable={true}
              className="border-b border-[#222] py-4 font-sans text-lg text-[#222]"
            >
              Pax: Gristopher Arenz 19 Dec 1967 A4S777129
            </li>
            <li
              contentEditable={true}
              className="border-b border-[#222] py-4 font-sans text-lg text-[#222]"
            >
              Pax: Amy Arenz 11 Feb 1971 647527873
            </li>
            <li
              contentEditable={true}
              className="py-4 font-sans text-lg text-[#222]"
            >
              Pax: Mackenzte Carroll 12 Apr 2001 ACYJ637466
            </li>
          </ul>
        </div>

        {/* Passenger Summary */}
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
            ].map(([label, value], i) => (
              <div key={i} className="flex justify-between">
                <h4 className="text-base font-sans text-[#222] font-medium">
                  {label}
                </h4>
                <h5
                  className="text-base font-sans text-[#222] font-medium"
                  contentEditable={
                    ["STT", "VIJ"].includes(value) ? true : false
                  }
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
              <h5 className="text-xl font-sans text-[#222] font-semibold py-2">
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

        <div className="lg:w-2/5 px-4 py-5">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#222] font-sans text-center border-b-2 border-[#222] pb-4">
            FOR OFFICIAL USE ONLY
          </h2>
          <h5 className="text-xl font-medium text-[#222] font-sans mt-5">
            BLOCK:
          </h5>
          <h5 className="text-xl font-medium text-[#222] font-sans mt-8">
            ETD:
          </h5>
        </div>
      </div>

      {/* Final Declaration */}
      <div className="mt-5">
        <p className="font-sans text-base sm:text-lg text-[#222]">
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
    </>
  );
};

export default Tabsdata;
