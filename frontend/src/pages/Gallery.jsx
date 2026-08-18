import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Filter,
  Heart,
  Image as ImageIcon,
  MapPin,
  Play,
  Search,
  X,
    Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Gallery() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [mediaType, setMediaType] = useState("All");

  const [selectedMemory, setSelectedMemory] = useState(null);

  const categories = [
    "All",
    "Childhood",
    "Family",
    "School",
    "Friends",
    "Birthday",
    "Festival",
    "Vacation",
    "Sports",
    "Other",
  ];

  useEffect(() => {
    fetchMemories();
  }, []);



  const fetchMemories = async () => {
    try {
      setLoading(true);

  const response = await axios.get(
  "http://localhost:5001/api/memories",
  {
    withCredentials: true,
  }
);

      if (response.data.success) {
        setMemories(response.data.memories);
      }
    } catch (error) {
      console.error("Gallery error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMemories = useMemo(() => {
    return memories.filter((memory) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        memory.title?.toLowerCase().includes(searchText) ||
        memory.description
          ?.toLowerCase()
          .includes(searchText) ||
        memory.person
          ?.toLowerCase()
          .includes(searchText) ||
        memory.location
          ?.toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "All" ||
        memory.category === category;

      const matchesMediaType =
        mediaType === "All" ||
        memory.mediaType === mediaType;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMediaType
      );
    });
  }, [memories, search, category, mediaType]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const handleDownload = async (url, type = "image") => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const extension =
      type === "video"
        ? "mp4"
        : "jpg";

    const link =
      document.createElement("a");

    link.href = blobUrl;

    link.download = `memory-${Date.now()}.${extension}`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error(
      "Download failed:",
      error
    );

    alert(
      "Unable to download this file."
    );
  }
};

  return (
    <main className="min-h-screen bg-[#fffaf4] px-4 pb-24 sm:px-6">

      <div className="mx-auto max-w-7xl">


        {/* Search */}

        <section className="pt-6">

          <div className="relative">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search your memories..."
              className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[#ff8066] focus:ring-4 focus:ring-[#ff8066]/10"
            />

          </div>

        </section>


        {/* Category filters */}

        <section className="mt-5">

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">

            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition ${
                  category === item
                    ? "bg-[#172033] text-white"
                    : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

        </section>


        {/* Media filters */}

        <section className="mt-3 flex items-center gap-2">

          <Filter
            size={16}
            className="text-gray-400"
          />

          {["All", "image", "video"].map(
            (type) => (
              <button
                key={type}
                onClick={() =>
                  setMediaType(type)
                }
                className={`rounded-full px-3 py-2 text-xs font-bold capitalize ${
                  mediaType === type
                    ? "bg-[#ff8066] text-white"
                    : "bg-white text-gray-500"
                }`}
              >
                {type === "All"
                  ? "Everything"
                  : type === "image"
                  ? "Photos"
                  : "Videos"}
              </button>
            )
          )}

        </section>


        {/* Results */}

        <div className="mt-8">

          {!loading && (
            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-black">
                  Your memories
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {filteredMemories.length}{" "}
                  {filteredMemories.length === 1
                    ? "memory"
                    : "memories"}
                </p>
              </div>

            </div>
          )}


          {/* Loading */}

          {loading && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

              {[1, 2, 3, 4, 5, 6].map(
                (item) => (
                  <div
                    key={item}
                    className="aspect-[4/5] animate-pulse rounded-2xl bg-gray-200"
                  />
                )
              )}

            </div>
          )}


          {/* Empty */}

          {!loading &&
            filteredMemories.length === 0 && (
              <div className="rounded-3xl bg-white px-6 py-16 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffe2dc] text-[#ff8066]">
                  <ImageIcon size={30} />
                </div>

                <h3 className="mt-5 text-xl font-black">
                  No memories found
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  Try another search or filter,
                  or upload your first memory.
                </p>

                <Link
                  to="/upload"
                  className="mt-6 inline-flex rounded-2xl bg-[#172033] px-6 py-3 text-sm font-bold text-white"
                >
                  Upload Memory
                </Link>

              </div>
            )}


          {/* Gallery */}

          {!loading &&
            filteredMemories.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">

                {filteredMemories.map(
                  (memory, index) => (
                    <motion.button
                      key={memory._id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          Math.min(
                            index * 0.05,
                            0.5
                          ),
                      }}
                      onClick={() =>
                        setSelectedMemory(
                          memory
                        )
                      }
                      className="group relative overflow-hidden rounded-2xl bg-white text-left shadow-sm"
                    >

                      {/* Image */}

                      {memory.mediaType ===
                      "image" ? (
                        <img
                          src={memory.mediaUrl}
                          alt={memory.title}
                          loading="lazy"
                          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="relative aspect-[4/5] bg-black">

                          <video
                            src={memory.mediaUrl}
                            muted
                            preload="metadata"
                            className="h-full w-full object-cover"
                          />

                          <div className="absolute inset-0 flex items-center justify-center">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#172033] shadow-xl">
                              <Play
                                size={20}
                                fill="currentColor"
                              />
                            </div>

                          </div>

                        </div>
                      )}


                      {/* Gradient */}

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 pt-12">

                        <p className="truncate text-sm font-black text-white">
                          {memory.title}
                        </p>

                        <div className="mt-1 flex items-center gap-1 text-[10px] text-white/70">


                        </div>

                      </div>


                      {/* Favorite */}

                      {memory.isFavorite && (
                        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#ff8066] shadow">
                          <Heart
                            size={15}
                            fill="currentColor"
                          />
                        </div>
                      )}

                    </motion.button>
                  )
                )}

              </div>
            )}

        </div>

      </div>


      {/* Fullscreen viewer */}

      <AnimatePresence>

        {selectedMemory && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black"
                onClick={() => setSelectedMemory(null)}
            >

                {/* Close */}
                <button
                type="button"
                onClick={() => setSelectedMemory(null)}
                className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md"
                >
                <X size={22} />
                </button>


                {/* Download */}
                <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();

                    handleDownload(
                    selectedMemory.mediaUrl,
                    selectedMemory.mediaType
                    );
                }}
                className="absolute right-4 top-20 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition active:scale-90"
                aria-label="Download media"
                >
                <Download size={21} />
                </button>


                {/* Fullscreen Media */}
                <motion.div
                initial={{
                    scale: 0.96,
                    opacity: 0,
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.25,
                }}
                className="flex h-full w-full items-center justify-center"
                onClick={(e) =>
                    e.stopPropagation()
                }
                >

                {selectedMemory.mediaType === "image" ? (
                    <img
                    src={selectedMemory.mediaUrl}
                    alt={selectedMemory.title}
                    className="h-full w-full object-contain"
                    />
                ) : (
                    <video
                    src={selectedMemory.mediaUrl}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                    />
                )}

                </motion.div>


                {/* Bottom Memory Details */}
                <motion.div
                initial={{
                    y: 40,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    delay: 0.15,
                }}
                onClick={(e) =>
                    e.stopPropagation()
                }
                className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent px-5 pb-6 pt-20 text-white"
                >

                <h2 className="text-xl font-black">
                    {selectedMemory.title}
                </h2>


                <div className="mt-2 flex flex-wrap gap-2">

                    <span className="rounded-full bg-[#ff8066] px-3 py-1.5 text-xs font-bold">
                    {selectedMemory.category}
                    </span>


                </div>

                </motion.div>

            </motion.div>
            )}

      </AnimatePresence>

    </main>
  );
}

export default Gallery;