import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  type DateClickArg,
} from "@fullcalendar/interaction";
import type { EventClickArg, EventInput } from "@fullcalendar/core";
import { format } from "date-fns";

type FlightData = {
  note: string;
  file?: File;
};

const CreateFlight = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [flightDataMap, setFlightDataMap] = useState<
    Record<string, FlightData>
  >({});
  const calendarRef = useRef<FullCalendar | null>(null);
  const today = format(new Date(), "yyyy-MM-dd");

  const handleDateClick = (arg: DateClickArg) => {
    const clickedDate = arg.dateStr;
    setSelectedDate(clickedDate);
    const existing = flightDataMap[clickedDate];
    if (existing) {
      setNote(existing.note);
      setFile(existing.file || null);
    } else {
      setNote("");
      setFile(null);
    }
  };

  const handleEventClick = (arg: EventClickArg) => {
    const clickedDate = arg.event.startStr;
    setSelectedDate(clickedDate);
    const existing = flightDataMap[clickedDate];
    if (existing) {
      setNote(existing.note);
      setFile(existing.file || null);
    } else {
      setNote("");
      setFile(null);
    }
  };

  const handleUpload = () => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    setFlightDataMap(prev => ({
      ...prev,
      [selectedDate]: { note, file: file || undefined },
    }));

    const exists = events.some(e => e.date === selectedDate);
    if (!exists) {
      setEvents(prev => [...prev, { title: "Flight", date: selectedDate }]);
    }

    alert("Flight saved.");
    setNote("");
    setFile(null);
    setSelectedDate(null);
  };

  const handleDownload = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isEditMode = selectedDate && flightDataMap[selectedDate];

  return (
    <div className="flex gap-x-10 justify-between bg-[#f9fafb] min-h-screen font-sans">
      {/* Calendar */}
      <div className="w-2/3 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold py-5 border-b border-[#E4E6E8]">
          Create A Flight
        </h2>
        <div className="pt-5">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            initialDate={today}
            viewHeight={500}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            headerToolbar={{
              left: "prevBtn,nextBtn",
              center: "title",
              right: "",
            }}
            customButtons={{
              prevBtn: {
                text: "←",
                click: () => calendarRef.current?.getApi().prev(),
              },
              nextBtn: {
                text: "→",
                click: () => calendarRef.current?.getApi().next(),
              },
            }}
            eventContent={arg => (
              <div className="flex items-center gap-1 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                <span className="text-green-500">●</span>
                <span>{arg.event.title}</span>
              </div>
            )}
            height="auto"
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/3 bg-white rounded-lg shadow p-10 flex flex-col gap-6 self-start">
        {/* Note Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Add a note</label>
          <textarea
            className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Enter flight notes here..."
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {isEditMode ? "Declaration" : "Upload passenger passport"}
          </label>

          <label
            htmlFor="fileUpload"
            className="cursor-pointer border-2 border-dashed border-gray-300 h-[200px] flex items-center rounded-lg p-4 text-center bg-[#f9fafb]  justify-center"
          >
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={e => setFile(e.target.files?.[0] || null)}
            />

            <div className="flex flex-col items-center justify-center gap-2">
              {file ? (
                file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="max-h-64 w-full object-contain rounded border"
                  />
                ) : (
                  <embed
                    src={URL.createObjectURL(file)}
                    type="application/pdf"
                    className="w-full h-64 border rounded"
                  />
                )
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L4 7m3-3l3 3m7 12V8m0 0l-3 3m3-3l3 3"
                    />
                  </svg>
                  <p className="text-sm text-gray-600">Click to upload file</p>
                  <p className="text-xs text-gray-400">
                    Supported: PDF, PNG, JPG
                  </p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[10px] text-sm w-fit cursor-pointer"
                    onClick={() =>
                      document.getElementById("fileUpload")?.click()
                    }
                  >
                    Upload Files
                  </button>
                </>
              )}
            </div>
          </label>
        </div>

        {/* Date Info */}
        {selectedDate ? (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Selected Date: <strong>{selectedDate}</strong>
          </p>
        ) : (
          <p className="text-xs text-gray-400 mt-2 italic text-center">
            No date selected
          </p>
        )}

        {/* Buttons */}
        {isEditMode ? (
          <div className="flex gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[10px] text-sm w-1/2 cursor-pointer"
              onClick={handleUpload}
            >
              Edit Declaration
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[10px] text-sm w-1/2  cursor-pointer"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[10px] text-sm w-full cursor-pointer"
            onClick={handleUpload}
          >
            Generate Declaration
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateFlight;
