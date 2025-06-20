import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useState } from "react";
import { usePDF } from "react-to-pdf";

const PassportOCR = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  console.log(toPDF);
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setText("");
      setError("");
    }
  };
  
  const apiUrl = import.meta.env.VITE_OPENAI_API_URL;
  const model = import.meta.env.VITE_OPENAI_MODEL;
  const handleScan = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setText("");

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(",")[1];
        console.log(base64);

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: "Bearer ",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: "Extract full name, passport number, nationality, and date of birth from this passport image. Return result as JSON.",
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: "https://www.canada.ca/content/dam/ircc/images/services/canadian-passports/passport-data-page-large.jpg",
                    },
                  },
                ],
              },
            ],
            max_tokens: 1000,
          }),
        });

        const result = await response.json();
        const extracted = result.choices?.[0]?.message?.content;
        setText(extracted || "No result returned.");
        setLoading(false);
      };

      reader.readAsDataURL(image);
    } catch (err) {
      console.error(err);
      setError("Failed to extract passport data.");
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    const target = targetRef.current;
    if (!target) return;

    // Apply safe colors
    target.classList.add("force-legacy-colors");

    // Give time to apply new styles
    await new Promise(resolve => setTimeout(resolve, 100));

    // Create the PDF
    const canvas = await html2canvas(target);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("example.pdf");

    // Clean up style
    target.classList.remove("force-legacy-colors");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Passport OCR with GPT-4 Vision
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

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {text && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Extracted Info:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto whitespace-pre-wrap">
            {text}
          </pre>
        </div>
      )}
      <div>
        <button onClick={handleDownload} className="cursor-pointer">
          Download PDF
        </button>
        <div ref={targetRef} className="pdf-compatible">
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            possimus ducimus minus accusamus nihil inventore quo eligendi amet
            non explicabo eaque fugiat nam hic, in, quis quasi? Corporis, earum
            consequuntur!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PassportOCR;
