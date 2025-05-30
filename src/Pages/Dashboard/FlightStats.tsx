import React from "react";
import { Table, Button, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  CalendarOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  FilePdfOutlined,
} from "@ant-design/icons"; // Import PDF icon

// Menu for Dropdown (File Actions)
const menu = (
  <Menu>
    <Menu.Item key="1">Download</Menu.Item>
    <Menu.Item key="2">Delete</Menu.Item>
  </Menu>
);

// Upcoming Flight Table Columns
const columns = [
  {
    title: "Flight No.",
    dataIndex: "flightNo",
  },
  {
    title: "Departure",
    dataIndex: "departure",
  },
  {
    title: "Arrival",
    dataIndex: "arrival",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

// Recent Gen Dec Table Columns
const recentColumns = [
  {
    title: "File Name",
    dataIndex: "fileName",
    render: (text: string) => (
      <span className="flex items-center gap-2">
        <FilePdfOutlined style={{ color: "#FF0000" }} /> {/* PDF Icon */}
        {text}
      </span>
    ),
  },
  {
    title: "Flight Number",
    dataIndex: "flightNumber",
  },
  {
    title: "Generate Date",
    dataIndex: "generateDate",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button icon={<EllipsisOutlined />} size="small" />
      </Dropdown>
    ),
  },
];

// Sample Data for Tables
const upcomingData = [
  {
    key: "1",
    flightNo: "103",
    departure: "STT",
    arrival: "VIJ",
    date: "26-5-2025",
  },
  {
    key: "2",
    flightNo: "104",
    departure: "STT",
    arrival: "VIJ",
    date: "26-5-2025",
  },
  {
    key: "3",
    flightNo: "105",
    departure: "STT",
    arrival: "VIJ",
    date: "26-5-2025",
  },
];

const recentData = [
  {
    key: "1",
    fileName: "GD-sdf-345453516646546456",
    flightNumber: "JD-101",
    generateDate: "12/02/2025",
  },
  {
    key: "2",
    fileName: "GD-sdf-345453516646546456",
    flightNumber: "JD-101",
    generateDate: "12/02/2025",
  },
  {
    key: "3",
    fileName: "GD-sdf-345453516646546456",
    flightNumber: "JD-101",
    generateDate: "12/02/2025",
  },
];

// FlightStats Component
const FlightStats: React.FC = () => {
  return (
    <div className="mb-10">
      {/* Top Statistics Cards */}
      <div className="bg-[#EAF9FF] px-6 sm:px-8 py-8 sm:py-10 mb-8 rounded-[10px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Flight Card */}
          <div className="bg-white p-6 border rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-lg">Upcoming Flight</span>
              <CalendarOutlined
                style={{ fontSize: "24px", color: "#13A6EF" }}
              />
            </div>
            <div className="text-3xl font-bold text-[#13A6EF]">05</div>
            <p className="text-gray-500">Scheduled Flights</p>
          </div>

          {/* Today Total Flight Card */}
          <div className="bg-white p-6 border rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-lg">Today Total Flight</span>
              <RocketOutlined style={{ fontSize: "24px", color: "#13A6EF" }} />
            </div>
            <div className="text-3xl font-bold text-[#13A6EF]">05</div>
            <p className="text-gray-500">Today's Operation</p>
          </div>

          {/* Flight Completed Today Card */}
          <div className="bg-white p-6 border rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-lg">
                Flight Completed Today
              </span>
              <CheckCircleOutlined
                style={{ fontSize: "24px", color: "#13A6EF" }}
              />
            </div>
            <div className="text-3xl font-bold text-[#13A6EF]">10</div>
            <p className="text-gray-500">Total Completed</p>
          </div>
        </div>
      </div>

      {/* Upcoming Flights Table */}
      <div className="mb-8">
        <div>
          <h4 className="text-[#222] text-[24px] font-medium leading-normal my-5">
            Upcoming Flight{" "}
          </h4>
        </div>

        <Table
          columns={columns}
          dataSource={upcomingData}
          pagination={false}
          bordered
          size="middle"
        />
      </div>

      {/* Recent Generated Files Table */}
      <div>
        <div>
          <h4 className="text-[#222] text-[24px] font-medium leading-normal my-5">
            Recent Gen Dec{" "}
          </h4>
        </div>
        <Table
          columns={recentColumns}
          dataSource={recentData}
          pagination={false}
          bordered
          size="middle"
        />
      </div>
    </div>
  );
};

export default FlightStats;
