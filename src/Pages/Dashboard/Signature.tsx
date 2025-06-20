import { useState } from "react";
import PassportOCR from "../../Components/PassportOCR";
import useAxios from "../../Hooks/UseAxios";
import { toast } from "react-toastify";

const Signature = () => {
  const AxiosInstance = useAxios();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("signature", file);

      const response = await AxiosInstance.post("/signature", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Signature uploaded successfully!");
        setFile(null);
      } else {
        toast.error("Failed to upload signature");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading signature");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6">
      <h3 className="font-sans text-[22px] sm:text-[26px] md:text-[30px] font-medium text-[#222]">
        Authorized Agent or Pilot-in Command Signature
      </h3>

      <p className="text-[16px] sm:text-[18px] md:text-[20px] text-[#9CA3AF] pt-4 pb-8 font-sans font-normal">
        I declare that all statements and particulars contained in this General
        Declaration and in any supplementary forms required to be presented with
        this General Declaration are complete and true to the best of my
        knowledge and that all through passengers will continue/have continued
        on the flight.
      </p>

      <h4 className="text-[20px] sm:text-[22px] md:text-[24px] text-[#222] font-sans font-medium">
        Upload Signature
      </h4>

      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[20px] my-6 sm:my-8">
        <input
          id="fileUpload"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleFileChange}
        />

        <div
          className="h-[280px] sm:h-[320px] md:h-[390px] border-2 border-dashed border-gray-300 w-full rounded-[10px] flex items-center justify-center cursor-pointer"
          onClick={() => document.getElementById("fileUpload")?.click()}
        >
          <div className="flex flex-col items-center justify-center gap-3 px-4 text-center">
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
                  width="56"
                  height="56"
                  viewBox="0 0 72 72"
                  fill="none"
                >
                  <path
                    d="M56.2583 62.1945H40.8108V46.5852H45.9158C47.2105 46.5852 47.9755 45.114 47.2105 44.0548L37.2799 30.3139C36.6473 29.4311 35.338 29.4311 34.7053 30.3139L24.7748 44.0548C24.0098 45.114 24.7601 46.5852 26.0695 46.5852H31.1745V62.1945H13.8733C6.14957 61.7679 0 54.5443 0 46.7176C0 41.3183 2.92767 36.6105 7.26767 34.0654C6.87045 32.9914 6.66449 31.8439 6.66449 30.6375C6.66449 25.1206 11.1222 20.6629 16.6391 20.6629C17.8308 20.6629 18.9783 20.8688 20.0523 21.266C23.2448 14.4986 30.13 9.80548 38.1332 9.80548C48.4904 9.82019 57.0233 17.7499 57.9943 27.857C65.9534 29.2252 72 36.5958 72 44.9375C72 53.8529 65.056 61.5766 56.2583 62.1945Z"
                    fill="#13A6EF"
                  />
                </svg>

                <p className="text-sm text-gray-700 font-medium">
                  Click to upload file
                </p>
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, PNG, JPG
                </p>

                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    document.getElementById("fileUpload")?.click();
                  }}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-[10px] text-sm transition-all"
                >
                  Upload Files
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-6 sm:mb-8">
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-blue-500 hover:bg-blue-600 font-sans text-white px-6 sm:px-8 py-3 rounded-[10px] text-sm  cursor-pointer disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Save Signature"}
        </button>
      </div>

      <PassportOCR />
    </section>
  );
};

export default Signature;
