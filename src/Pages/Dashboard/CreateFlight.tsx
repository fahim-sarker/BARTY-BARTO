import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  type DateClickArg,
} from "@fullcalendar/interaction";
import type { EventClickArg, EventInput } from "@fullcalendar/core";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

type FlightData = {
  note: string;
  fileBase64?: string;
  fileName?: string;
  fileType?: string;
};

const CreateFlight = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [flightDataMap, setFlightDataMap] = useState<
    Record<string, FlightData>
  >({});
  const calendarRef = useRef<FullCalendar | null>(null);
  const today = format(new Date(), "yyyy-MM-dd");
  const navigate = useNavigate();

  // Load saved data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("flightDataMap");
    if (stored) {
      const parsed: Record<string, FlightData> = JSON.parse(stored);
      setFlightDataMap(parsed);
      const loadedEvents = Object.keys(parsed).map(date => ({
        title: "Flight",
        date,
      }));
      setEvents(loadedEvents);
    }
  }, []);

  const handleDateClick = (arg: DateClickArg) => {
    const clickedDate = arg.dateStr;
    setSelectedDate(clickedDate);
    const existing = flightDataMap[clickedDate];
    if (existing) {
      setNote(existing.note);
      setPreview(existing.fileBase64 || null);
      setFile(null); // clear current file so we don't overwrite preview
    } else {
      setNote("");
      setFile(null);
      setPreview(null);
    }
  };

  const handleEventClick = (arg: EventClickArg) => {
    const clickedDate = arg.event.startStr;
    setSelectedDate(clickedDate);
    const existing = flightDataMap[clickedDate];
    if (existing) {
      setNote(existing.note);
      setPreview(existing.fileBase64 || null);
      setFile(null);
    } else {
      setNote("");
      setFile(null);
      setPreview(null);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    let fileBase64: string | undefined = preview || undefined;
    let fileName: string | undefined;
    let fileType: string | undefined;

    if (file) {
      fileBase64 = await convertFileToBase64(file);
      fileName = file.name;
      fileType = file.type;
    }

    const newFlightDataMap = {
      ...flightDataMap,
      [selectedDate]: {
        note,
        fileBase64,
        fileName,
        fileType,
      },
    };
    setFlightDataMap(newFlightDataMap);
    localStorage.setItem("flightDataMap", JSON.stringify(newFlightDataMap));

    const exists = events.some(e => e.date === selectedDate);
    if (!exists) {
      setEvents(prev => [...prev, { title: "Flight", date: selectedDate }]);
    }

    alert("Flight saved.");
    setNote("");
    setFile(null);
    setPreview(null);
    setSelectedDate(null);
    navigate("/dashboard-form");
  };

  const handleDownload = () => {
    if (!selectedDate) return;
    const flightData = flightDataMap[selectedDate];
    if (!flightData?.fileBase64 || !flightData.fileName) return;

    const link = document.createElement("a");
    link.href = flightData.fileBase64;
    link.download = flightData.fileName;
    link.click();
  };

  const isEditMode = selectedDate && flightDataMap[selectedDate];

  return (
    <div className="2xl:flex gap-x-10 justify-between bg-[#f9fafb] min-h-screen font-sans">
      {/* Calendar */}
      <div className="2xl:w-2/3 w-full bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold py-5 border-b border-[#E4E6E8]">
          Create A Flight
        </h2>
        <div className="pt-5">
          <div className="overflow-x-auto xl:overflow-visible">
            <div className="min-w-[800px] xl:min-w-0">
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
        </div>
      </div>

      {/* Right Panel */}
      <div className="2xl:w-1/3 w-full 2xl:mt-0 mt-10 bg-white rounded-lg shadow p-10 flex flex-col gap-6 self-start">
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

        <div>
          <label className="block text-sm font-medium mb-2">
            {isEditMode ? "Declaration" : "Upload passenger passport"}
          </label>

          <label
            htmlFor="fileUpload"
            className="cursor-pointer border-2 border-dashed border-gray-300 h-full w-full flex items-center rounded-lg p-4 text-center bg-[#f9fafb]  justify-center"
          >
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={e => {
                const selected = e.target.files?.[0] || null;
                setFile(selected);
                setPreview(selected ? URL.createObjectURL(selected) : null);
              }}
            />

            <div className="flex flex-col items-center justify-center gap-2 w-full">
              {preview ? (
                preview.startsWith("data:application/pdf") ||
                preview.endsWith(".pdf") ? (
                  <embed
                    src={preview}
                    type="application/pdf"
                    className="w-full h-64 border rounded"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 w-full object-contain rounded border"
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
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[10px] text-sm w-fit"
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

        {selectedDate ? (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Selected Date: <strong>{selectedDate}</strong>
          </p>
        ) : (
          <p className="text-xs text-gray-400 mt-2 italic text-center">
            No date selected
          </p>
        )}

        {isEditMode ? (
          <div className="flex gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[10px] text-sm w-1/2"
              onClick={handleUpload}
            >
              Edit Declaration
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[10px] text-sm w-1/2"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[10px] text-sm w-full"
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
