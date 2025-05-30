import React, { useState } from "react";
import { Divider, Table, Button, Dropdown, Menu } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { DownOutlined, EllipsisOutlined } from "@ant-design/icons"; // Importing ellipsis icon
import { FaPlus } from "react-icons/fa";

interface DataType {
  key: React.Key;
  name: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: (
      <span className="text-[var(--PM-Text-Color)] text-lg lg:text-[20px] font-[400] leading-normal">Full Name</span>
    ), // Customize font size for Full Name
    dataIndex: "name",
    render: (text: string) => (
      <span className="text-[var(--PM-Text-Color)] text-lg lg:text-[20px] font-[500] leading-normal">
        {text}
      </span>
    ),
  },
  {
    title: (
      <span className="text-[var(--PM-Text-Color)] text-lg lg:text-[20px] font-[400] leading-normal">Passport Number</span>
    ), // Customize font size for Passport Number
    dataIndex: "passportNumber",
    render: (text: string) => (
      <span className="text-[var(--PM-Text-Color)] text-lg lg:text-[20px] font-[500] leading-normal">
        {text}
      </span>
    ),
  },
  {
    title: (
      <span className="text-[var(--PM-Text-Color)] text-lg lg:text-[20px] font-[400] leading-normal">Nationality</span>
    ), // Customize font size for Nationality
    dataIndex: "nationality",
    render: (text: string) => (
      <span className="text-[var(--PM-Text-Color)] text-lg lg:text-[20px] font-[500] leading-normal">
        {text}
      </span>
    ),
  },
  {
    title: (
      <span className="text-[var(--PM-Text-Color)] text-lg lg:text-[20px] font-[400] leading-normal">Date Of Birth</span>
    ), // Customize font size for Date Of Birth
    dataIndex: "dateOfBirth",
    render: (text: string) => (
      <span className="text-[var(--PM-Text-Color)] text-lg lg:text-[20px] font-[500] leading-normal">
        {text}
      </span>
    ),
  },
  {
    title: (
      <span className="text-[var(--PM-Text-Color)] text-lg lg:text-[20px] font-[400] leading-normal">Action</span>
    ), // Customize font size for Action
    dataIndex: "action",
    render: () => (
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button icon={<EllipsisOutlined />} size="small" />
      </Dropdown>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Cameron Williamson",
    passportNumber: "B2345678",
    nationality: "Canada",
    dateOfBirth: "1990-07-22",
  },
  {
    key: "2",
    name: "Bessie Cooper",
    passportNumber: "T0123456",
    nationality: "Israel",
    dateOfBirth: "1990-07-22",
  },
  {
    key: "3",
    name: "Annette Black",
    passportNumber: "H8901234",
    nationality: "South Africa",
    dateOfBirth: "1990-07-22",
  },
  {
    key: "4",
    name: "Guy Hawkins",
    passportNumber: "M3456789",
    nationality: "Monaco",
    dateOfBirth: "1990-07-22",
  },
  {
    key: "5",
    name: "Kathryn Murphy",
    passportNumber: "G7890123",
    nationality: "Central African Republic",
    dateOfBirth: "1990-07-22",
  },
  {
    key: "6",
    name: "Albert Flores",
    passportNumber: "O5678901",
    nationality: "Russian Federation",
    dateOfBirth: "1990-07-22",
  },
  {
    key: "7",
    name: "Kristin Watson",
    passportNumber: "E5678901",
    nationality: "Bahrain",
    dateOfBirth: "1990-07-22",
  },
  {
    key: "8",
    name: "Devon Lane",
    passportNumber: "C3456789",
    nationality: "Georgia",
    dateOfBirth: "1990-07-22",
  },
  {
    key: "9",
    name: "Sarah Elizabeth Johnson",
    passportNumber: "R8901234",
    nationality: "Iran",
    dateOfBirth: "1990-07-22",
  },
];

const menu1 = (
  <Menu>
    <Menu.Item key="1">Passengers</Menu.Item>
    <Menu.Item key="2">Crew</Menu.Item>
  </Menu>
);

const menu = (
  <Menu>
    <Menu.Item key="1">Delete</Menu.Item>
  </Menu>
);

const AllPassengerCrew: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const rowSelection: TableProps<DataType>["rowSelection"] = {
    type: "checkbox",
    selectedRowKeys: selectedKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedKeys(selectedRowKeys);
      console.log("selectedRowKeys: ", selectedRowKeys);
    },
  };

  const [showCrewDropdown, setShowCrewDropdown] = useState(false);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  const toggleCrewDropdown = () => setShowCrewDropdown(!showCrewDropdown);
  const togglePassengerDropdown = () =>
    setShowPassengerDropdown(!showPassengerDropdown);

  return (
    <div>
      <div className="table-container" style={{ marginBottom: "20px" }}>
        <div className="lg:flex justify-between">
          <div className="flex gap-2">
            <div className=" mb-4">
              <div className="">
                <h2 className="text-[#222] text-[30px] font-medium leading-[150%] not-italic sm:text-[22px] md:text-[24px] lg:text-[30px] mb-5">
                  Passengers & Crew List
                </h2>
              </div>
              <Dropdown overlay={menu1}>
                <button className="bg-[#13A6EF] cursor-pointer text-[14px] md:text-lg text-white px-3 py-2 md:px-6 md:py-3 rounded-lg flex items-center gap-2">
                  Sort By <DownOutlined />
                </button>
              </Dropdown>
            </div>
          </div>

          <div className="flex relative items-end lg:items-start gap-4">
            {/* Add Crew Button (Outlined) */}
            <button
              className="flex items-center justify-center cursor-pointer gap-2 text-[#0f92c1] font-medium text-[12px] md:text-lg leading-6 py-2 md:py-4 px-3 md:px-7 rounded-lg border border-[#0f92c1] bg-white hover:bg-[#0f92c1] hover:text-white transition-colors duration-300"
              onClick={toggleCrewDropdown}
            >
              <FaPlus /> Add Crew
            </button>

            {/* Add Passengers Button (Solid) */}
            <button
              className="flex items-center cursor-pointer justify-center gap-2 text-white  font-medium text-[12px] md:text-lg leading-6 py-2 md:py-4 px-3 md:px-7 rounded-lg bg-[#13A6EF] hover:bg-[#fff] hover:text-black border hover:border-[#13A6EF] transition-colors duration-300"
              onClick={togglePassengerDropdown}
            >
              <FaPlus /> Add Passengers
            </button>

            {/* Crew Dropdown */}
            {showCrewDropdown && (
              <div className="absolute -mt-5 w-full p-4 border rounded-lg shadow-md bg-white top-full left-0 z-50">
                <h3 className="text-lg font-semibold mb-4">
                  Upload Passenger Passport
                </h3>
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
                  <p className="text-gray-500 mb-4">
                    Drag & drop your files here
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    Supported formats: PDF, PNG, JPG
                  </p>
                  <input
                    id="upload-files"
                    type="file"
                    className="mb-4 p-2 border rounded-md"
                  />
                </div>
                <button className="bg-blue-500 w-full text-center text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-400 transition-colors">
                  Add Crew
                </button>
              </div>
            )}

            {/* Passenger Dropdown */}
            {showPassengerDropdown && (
              <div className="absolute -mt-5 w-full p-4 border rounded-lg shadow-md bg-white top-full left-0 z-50">
                <h3 className="text-lg font-semibold mb-4">
                  Upload Passenger Passport
                </h3>
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
                  <p className="text-gray-500 mb-4">
                    Drag & drop your files here
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    Supported formats: PDF, PNG, JPG
                  </p>
                  <input
                    id="upload-files"
                    type="file"
                    className="mb-4 p-2 border rounded-md"
                  />
                </div>
                <button className="bg-blue-500 w-full text-center text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-400 transition-colors">
                  Add Passenger
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Divider />
      <Table<DataType>
        rowSelection={rowSelection} // Apply row selection configuration
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: 1020}} // Horizontal scroll for larger tables on smaller screens
      />
    </div>
  );
};

export default AllPassengerCrew;
