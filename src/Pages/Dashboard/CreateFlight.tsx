import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  type DateClickArg,
} from "@fullcalendar/interaction";
import type { EventClickArg, EventInput } from "@fullcalendar/core";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      setFile(null);
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

  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(error);
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setText("");
      setError("");
    }
  };


  const handleScan = async () => {
    if (!image || !selectedDate) {
      toast.error("Please upload an image and select a date first.");
      return;
    }

    setLoading(true);
    setError("");
    setText("");

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(",")[1];

        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-4o",
              messages: [
                {
                  role: "user",
                  content: [
                    {
                      type: "text",
                      text: "Extract non-sensitive, structured information (full name, passport number, nationality, date of birth) from this **sample passport image**. Return JSON only.",
                    },
                    {
                      type: "image_url",
                      image_url: {
                        url: `data:image/jpeg;base64,${base64}`,
                      },
                    },
                  ],
                },
              ],
              max_tokens: 1000,
            }),
          }
        );

        const result = await response.json();
        const rawContent = result.choices?.[0]?.message?.content || "";

        setText(rawContent);

        const match = rawContent.match(/```json\n([\s\S]*?)\n```/);
        if (match && match[1]) {
          const extractedJson = JSON.parse(match[1]);

          const payload = {
            data: extractedJson,
            selectedDate,
          };

          localStorage.setItem("passengerData", JSON.stringify(payload));

          toast.success("Extracted passport data !");
        } else {
          toast.error("AI did not return valid passport data.");
        }

        setLoading(false);
      };

      reader.readAsDataURL(image);
    } catch (err) {
      console.error(err);
      toast.error("Failed to extract or save passport data.");
      setLoading(false);
    }
  };
  
  

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
                    <span className="text-black">{arg.event.title}</span>
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

            {/* <div className="flex flex-col items-center justify-center gap-2 w-full">
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
            </div> */}
            <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
              <h2 className="text-2xl font-bold mb-4">
                Passport info extract with AI
              </h2>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
              />

              <button
                onClick={handleScan}
                disabled={loading || !image}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 disabled:opacity-50"
              >
                {loading ? "Scanning..." : "Scan Passport"}
              </button>

              {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}

              {text && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Extracted Info:
                  </h3>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto whitespace-pre-wrap">
                    {text}
                  </pre>
                </div>
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
          <div className="md:flex gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[10px] text-sm md:w-1/2 w-full"
              onClick={handleUpload}
            >
              Edit Declaration
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[10px] text-sm md:w-1/2 w-full md:mt-0 mt-3"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[10px] text-sm w-full md:mt-0 mt-3"
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
