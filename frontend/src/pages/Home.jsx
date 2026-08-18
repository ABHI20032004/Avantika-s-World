import { useEffect, useMemo, useState } from "react";
import {
  Cake,
  Camera,
  CalendarDays,
  ChevronRight,
  Heart,
  MapPin,
  Play,
  Sparkles,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Home() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState(null);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/memories"
      );

      if (response.data.success) {
        setMemories(response.data.memories || []);
      }
    } catch (error) {
      console.error("Home memories error:", error);
    } finally {
      setLoading(false);
    }
  };

  const photos = memories.filter(
    (memory) => memory.mediaType === "image"
  ).length;

  const videos = memories.filter(
    (memory) => memory.mediaType === "video"
  ).length;

  const categories = [
    {
      name: "Childhood",
      emoji: "🧸",
      color: "#FFE5A8",
    },
    {
      name: "Family",
      emoji: "🏡",
      color: "#FFD6E4",
    },
    {
      name: "School",
      emoji: "🎒",
      color: "#CDEBFF",
    },
    {
      name: "Birthday",
      emoji: "🎂",
      color: "#E6D6FF",
    },
    {
      name: "Vacation",
      emoji: "🏖️",
      color: "#CFF4D2",
    },
    {
      name: "Friends",
      emoji: "🫶",
      color: "#FFD8C7",
    },
  ];

  const frameStyles = [
    "polaroid",
    "rainbow",
    "tape",
    "paint",
    "star",
    "film",
  ];

  const featuredMemories = useMemo(() => {
    return memories.slice(0, 6);
  }, [memories]);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFF9F0] pb-24 text-[#172033]">

      {/* =====================================================
          FLOATING BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <FloatingCloud
          className="left-[-40px] top-[90px]"
          delay={0}
        />

        <FloatingCloud
          className="right-[-50px] top-[360px] scale-75"
          delay={2}
        />

        <FloatingCloud
          className="left-[-70px] top-[850px] scale-50"
          delay={1}
        />

        <FloatingStar
          className="left-[10%] top-[80px]"
          delay={0}
        />

        <FloatingStar
          className="right-[13%] top-[180px]"
          delay={1.5}
        />

        <FloatingStar
          className="left-[18%] top-[520px]"
          delay={2}
        />

        <FloatingStar
          className="right-[9%] top-[700px]"
          delay={0.8}
        />

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative z-10 px-5 pb-8 pt-8">

        <div className="mx-auto max-w-md">

          {/* Tiny greeting */}

          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex justify-center"
          >

            <div className="flex items-center gap-2 rounded-full border-2 border-white bg-white/80 px-4 py-2 shadow-sm backdrop-blur">

              <span className="animate-pulse text-base">
                ✨
              </span>

              <span className="text-[12px] font-bold tracking-[0.15em] text-[#dd62a8]">
                Exploring <span className="font-bold text-xl text-[#1e6e99]">अवंतिका श्री</span> Universe
              </span>

            </div>

          </motion.div>


          {/* Heading */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.6,
            }}
            className="mt-7 text-center"
          >

            <h1 className="text-[3.35rem] font-black leading-[0.9] tracking-[-0.065em]">

              My little

              <span className="relative mx-2 inline-block text-[#FF8066]">

                world

                <motion.span
                  animate={{
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute -right-5 -top-4 text-xl"
                >
                  ⭐
                </motion.span>

              </span>

              <br />

              of memories
              <span className="ml-1">
                💛
              </span>

            </h1>

            <p className="mx-auto mt-5 max-w-[310px] text-[14px] font-medium leading-6 text-gray-500">
              A tiny place for big memories,
              silly smiles and moments you never
              want to forget.
            </p>

          </motion.div>


          {/* =================================================
              MAGIC MEMORY FRAME
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
              rotate: -5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              type: "spring",
            }}
            className="relative mx-auto mt-10 h-[350px] w-[310px]"
          >

            {/* Floating balloon */}

            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [-4, 4, -4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -right-1 -top-3 z-20"
            >

              <div className="text-5xl">
                🎈
              </div>

              <div className="mx-auto h-12 w-px bg-gray-300" />

            </motion.div>


            {/* Yellow paper */}

            <div className="absolute left-4 top-8 h-[270px] w-[190px] rotate-[-8deg] rounded-[25px] bg-[#FFD86B] shadow-xl" />

            {/* Blue paper */}

            <div className="absolute right-2 top-6 h-[260px] w-[185px] rotate-[8deg] rounded-[25px] bg-[#B9E1FF] shadow-xl" />


            {/* Main Polaroid */}

            <motion.div
              animate={{
                y: [0, -4, 0],
                rotate: [-1, 1, -1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-2 z-10 h-[305px] w-[235px] -translate-x-1/2 rounded-[24px] bg-white p-3 shadow-2xl"
            >

              {<div className="relative h-[235px] overflow-hidden rounded-[16px] bg-[#FFE8DC]">

                {memories[0]?.mediaType === "image" ? (
                  <img
                    src={memories[0].mediaUrl}
                    alt={memories[0].title || "Memory"}
                    className="h-full w-full object-cover"
                  />
                ) : memories[0]?.mediaType === "video" ? (
                  <video
                    src={memories[0].mediaUrl}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center">

                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="text-6xl"
                    >
                      🧸
                    </motion.div>

                    <p className="mt-3 text-sm font-black text-[#FF8066]">
                      Your story begins here
                    </p>

                  </div>
                )}


                {/* Sticker */}

                <motion.div
                  animate={{
                    rotate: [8, 15, 8],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-lg"
                >
                  💛
                </motion.div>

              </div>}


              <div className="px-2 pt-3">

                <p className="truncate font-black">
                  {memories[0]?.title ||
                    "A beautiful memory"}
                </p>

                <p className="mt-1 text-[10px] font-bold text-gray-400">
                  Kept safely in your little world ✨
                </p>

              </div>

            </motion.div>


            {/* Camera sticker */}

            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
              }}
              className="absolute -bottom-1 -right-1 z-30 flex h-[66px] w-[66px] items-center justify-center rounded-full border-4 border-white bg-[#FF8066] text-3xl shadow-xl"
            >
              📸
            </motion.div>


            {/* Memory count */}



          </motion.div>

        </div>

      </section>



      {/* =====================================================
          MEMORY WALL
      ===================================================== */}

      <section className="relative z-10 px-5 pb-10">

        <div className="mx-auto max-w-md">

          <SectionTitle
            eyebrow="YOUR MEMORY WALL"
            title="Little moments ✨"
            description="Every picture has its own little frame."
          />


          {loading ? (
            <MemorySkeleton />
          ) : memories.length === 0 ? (
            <EmptyMemoryWall />
          ) : (
            <div className="mt-8 space-y-8">

              {featuredMemories.map(
                (memory, index) => (
                  <MemoryFrame
                    key={memory._id}
                    memory={memory}
                    index={index}
                    frame={
                      frameStyles[
                        index % frameStyles.length
                      ]
                    }
                    onClick={() =>
                      setSelectedMemory(memory)
                    }
                  />
                )
              )}

            </div>
          )}

        </div>

      </section>


      {/* =====================================================
          GROWING UP TIMELINE
      ===================================================== */}

      <section className="relative z-10 bg-[#FFF0D5] px-5 py-3">

        <div className="mx-auto max-w-md">

          <SectionTitle
            eyebrow="YOUR STORY"
            title="Growing up 🌱"
            description="Every year adds another page."
          />

          <div className="relative mt-10">

            {/* Timeline line */}

            <div className="absolute bottom-5 left-[19px] top-5 w-[3px] rounded-full bg-[#FFB45C]" />

            <TimelineItem
              emoji="👶"
              title="Tiny beginnings"
              text="The little days that started it all."
              color="#FFE0E7"
            />

            <TimelineItem
              emoji="🧸"
              title="Playtime"
              text="Toys, games, laughter and endless adventures."
              color="#FFE5AE"
            />

            <TimelineItem
              emoji="🎒"
              title="School days"
              text="Friends, teachers, homework and memories."
              color="#CFEAFF"
            />

            <TimelineItem
              emoji="🌈"
              title="Growing up"
              text="New places, new people and new stories."
              color="#DCCFFF"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      <section className="relative z-10 px-5 py-8">

        <div className="mx-auto max-w-md">

          <SectionTitle
            eyebrow="MEMORY WORLDS"
            title="Pick a world 🎨"
            description="Every part of childhood has a story."
          />

          <div className="mt-8 grid grid-cols-2 gap-4">

            {categories.map(
              (category, index) => (
                <motion.div
                  key={category.name}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.06,
                  }}
                >

                  <Link
                    to={`/gallery?category=${category.name}`}
                    className="relative flex min-h-[145px] flex-col justify-between overflow-hidden rounded-[28px] p-5 shadow-sm transition active:scale-95"
                    style={{
                      backgroundColor:
                        category.color,
                    }}
                  >

                    {/* Decorative circle */}

                    <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full bg-white/30" />

                    <motion.span
                      animate={{
                        rotate: [-3, 3, -3],
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                      className="relative text-4xl"
                    >
                      {category.emoji}
                    </motion.span>

                    <div className="relative">

                      <p className="text-lg font-black">
                        {category.name}
                      </p>

                      <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-black/40">
                        See memories

                        <ChevronRight size={12} />

                      </div>

                    </div>

                  </Link>

                </motion.div>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          BIRTHDAY CORNER
      ===================================================== */}

      <section className="relative z-10 px-5 pt-4">

        <motion.div
          whileTap={{
            scale: 0.98,
          }}
          className="relative mx-auto max-w-md overflow-hidden rounded-[32px] bg-[#DCCEFF] p-6"
        >

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute right-5 top-4 text-5xl"
          >
            🎈
          </motion.div>

          <div className="absolute -bottom-8 -right-8 text-8xl opacity-20">
            🎂
          </div>

          <div className="relative">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              🎉
            </div>

            <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-black/40">
              Special days
            </p>

            <h2 className="mt-2 max-w-[240px] text-2xl font-black leading-tight">
              Birthdays make memories sweeter.
            </h2>

            <p className="mt-3 max-w-[255px] text-sm leading-6 text-black/50">
              Keep all your favorite birthday
              moments together.
            </p>

            <Link
              to="/birthdays"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#172033] px-4 py-3 text-xs font-black text-white"
            >
              Birthday Corner

              <Cake size={14} />

            </Link>

          </div>

        </motion.div>

      </section>


      {/* =====================================================
          FUTURE SELF
      ===================================================== */}

      <section className="relative z-10 px-5 py-10">

        <div className="mx-auto max-w-md">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="relative overflow-hidden rounded-[32px] border-2 border-dashed border-[#FFB5A4] bg-[#FFF5EF] px-6 py-10 text-center"
          >

            <div className="absolute left-4 top-4 rotate-[-15deg] text-xl">
              ⭐
            </div>

            <div className="absolute right-5 top-8 rotate-[12deg] text-xl">
              💫
            </div>

            <div className="text-5xl">
              💌
            </div>

            <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF8066]">
              A note for future me
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Remember these days.
            </h2>

            <p className="mx-auto mt-3 max-w-[280px] text-sm leading-6 text-gray-500">
              One day you'll look back and
              realize how beautiful these
              little moments were.
            </p>

            <div className="mx-auto mt-6 h-px max-w-[230px] bg-[#FFB5A4]" />

            <p className="mt-5 text-xs font-bold italic text-gray-400">
              "The best memories are the
              ones that make you smile twice."
            </p>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          FINAL MEMORY MESSAGE
      ===================================================== */}

      <section className="relative z-10 px-5 pb-8">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          className="relative mx-auto max-w-md overflow-hidden rounded-[35px] bg-[#FF8066] px-6 py-12 text-center text-white"
        >

          <div className="absolute -left-10 -top-10 text-8xl opacity-10">
            ⭐
          </div>

          <div className="absolute -bottom-8 -right-5 text-8xl opacity-10">
            🌈
          </div>

          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="text-5xl"
          >
            🧸
          </motion.div>

          <h2 className="relative mt-5 text-3xl font-black leading-tight">
            Keep making
            beautiful memories.
          </h2>

          <p className="relative mx-auto mt-3 max-w-[280px] text-sm leading-6 text-white/80">
            Your little world is made from
            thousands of tiny moments.
          </p>

          <div className="mt-7 flex justify-center gap-3 text-2xl">
            <span>🌈</span>
            <span>⭐</span>
            <span>🧸</span>
            <span>💛</span>
            <span>🎈</span>
          </div>

        </motion.div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="relative z-10 px-5 text-center">

        <div className="flex items-center justify-center gap-2">

          <Camera
            size={17}
            className="text-[#FF8066]"
          />

          <p className="text-sm font-black">
            Memory Vault
          </p>

        </div>

        <p className="mt-2 text-[11px] text-gray-400">
          Made with 💛 for little moments.
        </p>

      </footer>


      {/* =====================================================
          MEMORY VIEWER
      ===================================================== */}

      {selectedMemory && (
        <MemoryViewer
          memory={selectedMemory}
          onClose={() =>
            setSelectedMemory(null)
          }
          formatDate={formatDate}
        />
      )}

    </main>
  );
}


/* ===========================================================
   MEMORY FRAME
=========================================================== */

function MemoryFrame({
  memory,
  index,
  frame,
  onClick,
}) {
  const rotations = [
    "-rotate-2",
    "rotate-2",
    "-rotate-1",
    "rotate-1",
    "-rotate-3",
    "rotate-2",
  ];

  return (
    <motion.button
      initial={{
        opacity: 0,
        y: 30,
        rotate: -3,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      whileTap={{
        scale: 0.97,
      }}
      onClick={onClick}
      className="w-full text-left"
    >

      {frame === "polaroid" && (
        <div
          className={`relative mx-auto w-[88%] bg-white p-3 pb-5 shadow-xl ${rotations[index]}`}
        >

          <MemoryImage
            memory={memory}
            className="aspect-[1.05] w-full"
          />

          <div className="px-2 pt-3">

            <p className="truncate font-black">
              {memory.title ||
                "A beautiful memory"}
            </p>

            <p className="mt-1 text-[10px] font-bold text-gray-400">
              {formatMemoryDate(memory.date)}
            </p>

          </div>

          <div className="absolute -right-2 -top-3 rotate-12 text-2xl">
            ⭐
          </div>

        </div>
      )}


      {frame === "rainbow" && (
        <div
          className={`relative mx-auto w-[92%] rounded-[28px] bg-white p-3 shadow-xl ${rotations[index]}`}
        >

          <div className="rounded-[22px] bg-gradient-to-r from-[#FFB3BA] via-[#FFE39C] via-[#C7F0CA] to-[#BFDFFF] p-[5px]">

            <MemoryImage
              memory={memory}
              className="aspect-square w-full rounded-[18px]"
            />

          </div>

          <div className="flex items-center justify-between px-2 py-3">

            <p className="max-w-[210px] truncate font-black">
              {memory.title ||
                "Rainbow memory"}
            </p>

            <span className="text-xl">
              🌈
            </span>

          </div>

        </div>
      )}


      {frame === "tape" && (
        <div
          className={`relative mx-auto w-[90%] rounded-[20px] bg-[#FFF7D6] p-4 shadow-xl ${rotations[index]}`}
        >

          <div className="absolute -top-3 left-1/2 h-8 w-20 -translate-x-1/2 rotate-[-3deg] bg-[#F8E7A3]/80" />

          <MemoryImage
            memory={memory}
            className="aspect-[4/3] w-full"
          />

          <div className="pt-4">

            <p className="font-black">
              {memory.title ||
                "Pinned memory"}
            </p>

            <p className="mt-1 text-[10px] font-bold text-gray-400">
              📌 {formatMemoryDate(memory.date)}
            </p>

          </div>

        </div>
      )}


      {frame === "paint" && (
        <div
          className={`relative mx-auto w-[92%] rounded-[32px] bg-[#FFD9E6] p-4 shadow-xl ${rotations[index]}`}
        >

          <div className="absolute -right-2 -top-4 text-3xl">
            🎨
          </div>

          <div className="rounded-[24px] bg-[#AEE2FF] p-2">

            <div className="rounded-[19px] bg-white p-2">

              <MemoryImage
                memory={memory}
                className="aspect-[4/3] w-full rounded-[15px]"
              />

            </div>

          </div>

          <p className="px-2 pt-3 font-black">
            {memory.title ||
              "Painted memory"}
          </p>

        </div>
      )}


      {frame === "star" && (
        <div
          className={`relative mx-auto w-[90%] overflow-hidden rounded-[35px] bg-[#DCCEFF] p-5 shadow-xl ${rotations[index]}`}
        >

          <div className="absolute -right-2 top-2 text-4xl">
            ⭐
          </div>

          <div className="absolute bottom-2 left-2 text-2xl">
            ✨
          </div>

          <MemoryImage
            memory={memory}
            className="aspect-square w-full rounded-[26px] border-4 border-white"
          />

          <div className="relative px-1 pt-4">

            <p className="font-black">
              {memory.title ||
                "A starry memory"}
            </p>

            <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-black/40">
              <CalendarDays size={11} />

              {formatMemoryDate(memory.date)}
            </div>

          </div>

        </div>
      )}


      {frame === "film" && (
        <div
          className={`relative mx-auto w-[94%] overflow-hidden rounded-[18px] bg-[#172033] p-3 shadow-xl ${rotations[index]}`}
        >

          <div className="flex items-center gap-1 pb-2">

            {Array.from({
              length: 8,
            }).map((_, i) => (
              <div
                key={i}
                className="h-2 w-3 rounded-sm bg-white/20"
              />
            ))}

          </div>

          <MemoryImage
            memory={memory}
            className="aspect-[16/10] w-full"
          />

          <div className="flex items-center justify-between pt-2 text-white">

            <p className="max-w-[220px] truncate text-xs font-black">
              {memory.title ||
                "Movie memory"}
            </p>

            <span className="text-sm">
              🎬
            </span>

          </div>

        </div>
      )}

    </motion.button>
  );
}


/* ===========================================================
   MEMORY IMAGE
=========================================================== */

function MemoryImage({
  memory,
  className,
}) {
  if (memory.mediaType === "video") {
    return (
      <div
        className={`relative overflow-hidden bg-black ${className}`}
      >

        <video
          src={memory.mediaUrl}
          muted
          preload="metadata"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#172033] shadow-xl">

            <Play
              size={19}
              fill="currentColor"
            />

          </div>

        </div>

      </div>
    );
  }

  return (
    <img
      src={memory.mediaUrl}
      alt={memory.title || "Memory"}
      loading="lazy"
      className={`overflow-hidden object-cover ${className}`}
    />
  );
}


/* ===========================================================
   MEMORY VIEWER
=========================================================== */

function MemoryViewer({
  memory,
  onClose,
  formatDate,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#172033]/95 p-4"
      onClick={onClose}
    >

      <motion.div
        initial={{
          scale: 0.85,
          y: 20,
        }}
        animate={{
          scale: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
        }}
        onClick={(e) =>
          e.stopPropagation()
        }
        className="relative w-full max-w-md overflow-hidden rounded-[30px] bg-white shadow-2xl"
      >

        {/* Close */}

        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur"
        >
          ×
        </button>


        {/* Media */}

        {memory.mediaType === "video" ? (
          <video
            src={memory.mediaUrl}
            controls
            autoPlay
            playsInline
            className="max-h-[65vh] w-full bg-black object-contain"
          />
        ) : (
          <img
            src={memory.mediaUrl}
            alt={memory.title}
            className="max-h-[65vh] w-full bg-black object-contain"
          />
        )}


        {/* Information */}

        <div className="p-5">

          <div className="flex items-start justify-between gap-3">

            <div>

              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF8066]">
                Memory
              </p>

              <h2 className="mt-1 text-xl font-black">
                {memory.title ||
                  "Beautiful memory"}
              </h2>

            </div>

            <Heart
              size={20}
              className="mt-1 text-[#FF8066]"
            />

          </div>


          {memory.description && (
            <p className="mt-3 text-sm leading-6 text-gray-500">
              {memory.description}
            </p>
          )}


          <div className="mt-4 flex flex-wrap gap-2">

            {memory.date && (
              <span className="flex items-center gap-1 rounded-full bg-[#FFF0E9] px-3 py-2 text-[10px] font-bold text-[#E86B53]">
                <CalendarDays size={11} />

                {formatDate(memory.date)}
              </span>
            )}

            {memory.location && (
              <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-2 text-[10px] font-bold text-gray-500">
                <MapPin size={11} />

                {memory.location}
              </span>
            )}

          </div>

        </div>

      </motion.div>

    </motion.div>
  );
}


/* ===========================================================
   SECTION TITLE
=========================================================== */

function SectionTitle({
  eyebrow,
  title,
  description,
}) {
  return (
    <div>

      <div className="flex items-center gap-2">

        <span className="h-2 w-2 rounded-full bg-[#FF8066]" />

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF8066]">
          {eyebrow}
        </p>

      </div>

      <h2 className="mt-2 text-3xl font-black tracking-tight">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>

    </div>
  );
}


/* ===========================================================
   MINI STAT
=========================================================== */

function MiniStat({
  emoji,
  value,
  label,
  border,
}) {
  return (
    <div
      className={`flex min-h-[100px] flex-col items-center justify-center ${
        border
          ? "border-l border-white/10"
          : ""
      }`}
    >

      <span className="text-lg">
        {emoji}
      </span>

      <p className="mt-1 text-xl font-black text-white">
        {value}
      </p>

      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/40">
        {label}
      </p>

    </div>
  );
}


/* ===========================================================
   TIMELINE ITEM
=========================================================== */

function TimelineItem({
  emoji,
  title,
  text,
  color,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -15,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      className="relative mb-7 flex gap-4"
    >

      <div
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-[#FFF0D5] text-lg shadow-sm"
        style={{
          backgroundColor: color,
        }}
      >
        {emoji}
      </div>

      <div className="rounded-2xl bg-white/70 px-4 py-3">

        <p className="text-sm font-black">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {text}
        </p>

      </div>

    </motion.div>
  );
}


/* ===========================================================
   FLOATING CLOUD
=========================================================== */

function FloatingCloud({
  className,
  delay,
}) {
  return (
    <motion.div
      animate={{
        x: [0, 18, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className={`absolute ${className}`}
    >

      <div className="relative h-10 w-20 rounded-full bg-white/70 blur-[1px]">

        <div className="absolute -left-2 bottom-0 h-9 w-9 rounded-full bg-white/70" />

        <div className="absolute left-5 -top-4 h-12 w-12 rounded-full bg-white/70" />

        <div className="absolute right-1 -top-2 h-9 w-9 rounded-full bg-white/70" />

      </div>

    </motion.div>
  );
}


/* ===========================================================
   FLOATING STAR
=========================================================== */

function FloatingStar({
  className,
  delay,
}) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
        rotate: [0, 12, -5, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className={`absolute ${className}`}
    >

      <Star
        size={17}
        fill="#FFD166"
        className="text-[#FFD166]"
      />

    </motion.div>
  );
}


/* ===========================================================
   EMPTY WALL
=========================================================== */

function EmptyMemoryWall() {
  return (
    <div className="mt-8 rounded-[30px] bg-[#FFF0D5] px-6 py-12 text-center">

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="text-6xl"
      >
        🧸
      </motion.div>

      <h3 className="mt-5 text-xl font-black">
        Your wall is waiting!
      </h3>

      <p className="mx-auto mt-2 max-w-[260px] text-sm leading-6 text-gray-500">
        Your little world will become
        more beautiful as memories are
        added.
      </p>

    </div>
  );
}


/* ===========================================================
   DATE FORMAT
=========================================================== */

function formatMemoryDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function MemorySkeleton() {
  return (
    <div className="mt-8 space-y-8">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-[28px] bg-white p-3 shadow-sm"
        >
          <div className="aspect-[4/3] w-full rounded-[22px] bg-gray-200" />

          <div className="px-2 pb-2 pt-4">
            <div className="h-4 w-2/3 rounded-full bg-gray-200" />

            <div className="mt-2 h-3 w-1/3 rounded-full bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;