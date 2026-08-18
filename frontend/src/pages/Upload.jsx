import { useState } from "react";
import { ArrowLeft, ImagePlus, UploadCloud } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Upload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState("");

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "Other",
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a photo or video.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("media", file);

      formData.append("title", form.title);

      formData.append(
        "category",
        form.category
      );


      const response = await axios.post(
        "http://localhost:5001/api/memories",
        formData,
        {
          withCredentials: true,

          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;

            const percentage = Math.round(
              (progressEvent.loaded * 100) /
                progressEvent.total
            );

            console.log(
              `Upload progress: ${percentage}%`
            );
          },
        }
      );

      if (response.data.success) {
        alert("Memory saved successfully ❤️");

        navigate("/");
      }
    } catch (error) {
      console.error("Upload error:", error);

      alert(
        error.response?.data?.message ||
          "Upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffaf4] px-5 py-6 pb-10">

      <div className="mx-auto max-w-xl">

        <Link
          to="/"
          className="flex w-fit items-center gap-2 text-sm font-bold text-gray-500"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="mt-8">

          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff8066]">
            New memory
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Add a memory 📸
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Save a moment you'll want to remember.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* Upload */}
          <label className="block cursor-pointer">

            <div className="overflow-hidden rounded-3xl border-2 border-dashed border-[#ff8066]/30 bg-white">

              {!preview ? (
                <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffe2dc] text-[#ff8066]">
                    <ImagePlus size={30} />
                  </div>

                  <h2 className="mt-5 font-black">
                    Choose a photo or video
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    Tap here to select media from your phone.
                  </p>

                </div>
              ) : file?.type.startsWith("video/") ? (
                <video
                  src={preview}
                  controls
                  className="max-h-[400px] w-full object-cover"
                />
              ) : (
                <img
                  src={preview}
                  alt="Memory preview"
                  className="max-h-[400px] w-full object-cover"
                />
              )}

            </div>

            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />

          </label>

          {/* Title */}
          <div>

            <label className="mb-2 block text-sm font-bold">
              Memory title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Summer vacation 2014"
              required
              className="min-h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 outline-none focus:border-[#ff8066] focus:ring-4 focus:ring-[#ff8066]/10"
            />

          </div>


          {/* Category */}
          <div>

            <label className="mb-2 block text-sm font-bold">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="min-h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 outline-none focus:border-[#ff8066]"
            >
              <option>Childhood</option>
              <option>Family</option>
              <option>School</option>
              <option>Friends</option>
              <option>Birthday</option>
              <option>Festival</option>
              <option>Vacation</option>
              <option>Sports</option>
              <option>Other</option>
            </select>

          </div>

          
          {/* Submit */}
          <button
            type="submit"
            disabled={uploading}
            className="mb-10 flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#172033] font-bold text-white shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >

            {uploading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                Uploading...
              </>
            ) : (
              <>
                <UploadCloud size={20} />

                Save Memory
              </>
            )}

          </button>

        </form>

      </div>

    </main>
  );
}

export default Upload;