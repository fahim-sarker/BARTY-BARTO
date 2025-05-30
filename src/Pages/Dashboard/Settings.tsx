import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProfileForm from "../../Components/ProfileForm";
import Securityform from "../../Components/SecurityForm";

const Settings = () => {
  return (
    <section className="bg-[#F9FAFB] h-screen">
      <h4 className="text-[24px] text-[#222] font-sans font-medium">
        Settings
      </h4>
      <div className="flex justify-center pt-3">
        <Tabs className="w-full tabs-section-two">
          <TabList className="flex gap-x-5 border-b border-[#E0E0E0] w-fit">
            <Tab className="outline-0 cursor-pointer text-[#222] font-medium font-sans text-[16px]">
              Personal Info
            </Tab>
            <Tab className="outline-0 cursor-pointer text-[#222] font-medium font-sans text-[16px]">
              Security
            </Tab>
          </TabList>
          <TabPanel>
            <div className="bg-[#FFF] my-5 p-10">
              <ProfileForm />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="bg-[#FFF] my-5 p-10">
              <Securityform />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default Settings;
