import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Star,
  X,
  Gift,
  Camera,
  ChevronRight,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| GIRL PROFILE
|--------------------------------------------------------------------------
| Change these values to your actual information.
|--------------------------------------------------------------------------
*/

const GIRL = {
  name: "Avantika Shree",
  nickname: "Our Little Star",

  image: "",

  birthday: "24 September 2025",

  about:
    "A cheerful little soul who fills every room with laughter, curiosity and a little bit of magic. 💕",

  favoriteThings: [
    {
      emoji: "🎨",
      title: "Drawing",
    },
    {
      emoji: "💃",
      title: "Dancing",
    },
    {
      emoji: "🍫",
      title: "Chocolate",
    },
    {
      emoji: "📖",
      title: "Stories",
    },
  ],
};


/*
|--------------------------------------------------------------------------
| FAMILY
|--------------------------------------------------------------------------
*/

const FAMILY = [
  {
    id : 1,
    relation: "Dad",
    emoji: "👨🏻",
    image: "",
    color: "bg-[#CDEBFF]",
    message:
      "Her biggest supporter and the person always ready to cheer her on. ❤️",
  },

  {
    id : 2,
    relation: "Mom",
    emoji: "👩🏻",
    image: "",
    color: "bg-[#FFD6E4]",
    message:
      "Her safest place, her biggest hug and the person who knows every little secret. 💕",
  },

  {
    id : 3,
    relation: "Mama",
    emoji: "👦🏻",
    image: "",
    color: "bg-[#E7DBFF]",
    message:
      "Her partner in laughter, adventures and occasional mischief. 😄",
  },

  {
    id : 4,
    relation: "Nani",
    emoji: "👧🏻",
    image: "",
    color: "bg-[#FFE5A8]",
    message:
      "Her forever teammate and the person who makes ordinary days more fun. 🧸",
  },
  {
    id : 5,
    relation: "Nana",
    emoji: "👦🏻",
    image: "",
    color: "bg-[#CDEBFF]",
    message:
      "Her forever teammate and the person who makes ordinary days more fun. 🧸",
  },
  {
    id : 6,
    relation: "Masi",
    emoji: "👩🏻",
    image: "",
    color: "bg-[#FFD6E4]",
    message:
      "Her forever teammate and the person who makes ordinary days more fun. 🧸",
  },
];


/*
|--------------------------------------------------------------------------
| STORY
|--------------------------------------------------------------------------
*/

const STORY = [
  {
    year: "Chapter 01",
    emoji: "👶🏻",
    title: "A tiny beginning",
    text:
      "Once upon a time, a tiny little smile arrived and changed everything.",
    color: "#FFD6E4",
  },

  {
    year: "Chapter 02",
    emoji: "🧸",
    title: "Little adventures",
    text:
      "There were toys everywhere, endless questions and lots of laughter.",
    color: "#FFE5A8",
  },

  {
    year: "Chapter 03",
    emoji: "🎒",
    title: "Growing up",
    text:
      "New friends, new dreams, new discoveries and countless little stories.",
    color: "#CDEBFF",
  },

  {
    year: "Chapter 04",
    emoji: "🌈",
    title: "Our little star",
    text:
      "And the beautiful story is still being written...",
    color: "#E7DBFF",
  },
];


/*
|--------------------------------------------------------------------------
| MAIN COMPONENT
|--------------------------------------------------------------------------
*/

function About() {
  const [selectedFamily, setSelectedFamily] =
    useState(null);

  const [showSurprise, setShowSurprise] =
    useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF8EE] pb-24 text-[#172033]">

      {/* =====================================================
          FLOATING BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <FloatingDecoration
          className="left-[-8px] top-24"
          emoji="🌸"
          delay={0}
        />

        <FloatingDecoration
          className="right-[-5px] top-44"
          emoji="🎈"
          delay={1}
        />

        <FloatingDecoration
          className="left-[8%] top-[70%]"
          emoji="⭐"
          delay={2}
        />

        <FloatingDecoration
          className="right-[8%] top-[62%]"
          emoji="💛"
          delay={1.5}
        />

        <FloatingStar
          className="left-[20%] top-20"
          delay={0}
        />

        <FloatingStar
          className="right-[18%] top-28"
          delay={1}
        />

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative z-10 px-5 pb-8 pt-9">

        <div className="mx-auto max-w-md text-center">

          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/80 px-4 py-2 shadow-sm backdrop-blur"
          >

            <Sparkles
              size={14}
              className="text-[#FF8066]"
            />

            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF8066]">
              Her Little Story
            </span>

          </motion.div>


          <motion.h1
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.15,
              duration: 0.7,
              type: "spring",
            }}
            className="mt-6 text-[3.5rem] font-black leading-[0.88] tracking-[-0.07em]"
          >

            Meet

            <span className="relative block pt-3 text-[#FF8066]">

              {GIRL.name}

              <motion.span
                animate={{
                  rotate: [
                    -10,
                    10,
                    -10,
                  ],
                  y: [
                    0,
                    -4,
                    0,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -right-2 -top-5 text-2xl"
              >
                ✨
              </motion.span>

            </span>

          </motion.h1>


          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.35,
            }}
            className="mx-auto mt-5 max-w-[300px] text-sm leading-6 text-gray-500"
          >
            Every person has a story.
            Hers is one worth keeping forever. 💕
          </motion.p>

        </div>

      </section>


      {/* =====================================================
          GIRL PROFILE CARD
      ===================================================== */}

      <section className="relative z-10 px-5">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            rotate: -3,
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: 0,
          }}
          transition={{
            duration: 0.8,
            type: "spring",
          }}
          className="relative mx-auto max-w-md"
        >

          {/* Decorative cards */}

          <div className="absolute inset-3 rotate-3 rounded-[36px] bg-[#FFD6E4]" />

          <div className="absolute inset-1 -rotate-2 rounded-[36px] bg-[#FFE5A8]" />


          {/* Main card */}

          <div className="relative overflow-hidden rounded-[36px] border-4 border-white bg-white p-4 shadow-2xl">

            <div className="flex items-center justify-between px-2">

              <span className="text-xl">
                🎀
              </span>

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF8066]">
                Our Little Star
              </p>

              <span className="text-xl">
                🎀
              </span>

            </div>


            {/* Photo */}

            <div className="relative mt-4 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#FFDDE8] via-[#FFF0C4] to-[#DDD0FF]">

              <div className="absolute left-4 top-4 z-10 text-xl">
                ⭐
              </div>

              <div className="absolute right-4 top-5 z-10 text-xl">
                💕
              </div>

              <div className="absolute bottom-5 left-4 z-10 text-xl">
                🌸
              </div>

              <div className="absolute bottom-5 right-4 z-10 text-xl">
                ✨
              </div>


              {GIRL.image ? (
                <img
                  src={GIRL.image}
                  alt={GIRL.name}
                  className="relative z-[2] h-[330px] w-full object-cover"
                />
              ) : (
                <div className="relative z-[2] flex h-[330px] items-center justify-center">

                  <motion.div
                    animate={{
                      y: [
                        0,
                        -8,
                        0,
                      ],
                      rotate: [
                        -2,
                        2,
                        -2,
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="text-[125px]"
                  >
                    👧🏻
                  </motion.div>

                </div>
              )}

            </div>


            {/* Name */}

            <div className="px-3 pb-3 pt-5 text-center">

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                {GIRL.nickname}
              </p>

              <h2 className="mt-1 text-3xl font-black">
                {GIRL.name}
              </h2>

              <div className="mt-3 flex items-center justify-center gap-2">

                <span className="rounded-full bg-[#FFE5A8] text-[#206094] px-3 py-1 text-[12px] font-black">
                  🎂 {GIRL.birthday}
                </span>

              </div>

            </div>

          </div>

        </motion.div>

      </section>


      {/* =====================================================
          ABOUT HER
      ===================================================== */}

      <section className="relative z-10 px-5 py-16">

        <div className="mx-auto max-w-md">

          <SectionHeading
            eyebrow="A little about her"
            title="The magic behind the smile ✨"
          />


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
            className="relative mt-7 overflow-hidden rounded-[32px] bg-[#d4b3db] px-6 py-8 text-white shadow-xl"
          >

            <div className="absolute -right-8 -top-8 text-[100px] opacity-10">
              💕
            </div>

            <Heart
              size={24}
              fill="#FF8066"
              className="text-[#FF8066]"
            />

            <p className="relative mt-5 text-lg font-bold leading-8">
              {GIRL.about}
            </p>

            <div className="relative mt-6 flex gap-2 text-xl">
              ⭐ 💛 ✨
            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          FAVORITE THINGS
      ===================================================== */}

      <section className="relative z-10 bg-[#FFF0D5] px-5 py-16">

        <div className="mx-auto max-w-md">

          <SectionHeading
            eyebrow="Things she loves"
            title="Her little favorites 🎨"
          />


          <div className="mt-8 grid grid-cols-2 gap-4">

            {GIRL.favoriteThings.map(
              (item, index) => (
                <motion.div
                  key={item.title}
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
                  transition={{
                    delay:
                      index * 0.08,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="rounded-[28px] bg-white p-5 shadow-sm"
                >

                  <motion.div
                    animate={{
                      y: [
                        0,
                        -5,
                        0,
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay:
                        index * 0.3,
                    }}
                    className="text-4xl"
                  >
                    {item.emoji}
                  </motion.div>

                  <p className="mt-4 text-sm font-black">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[10px] text-gray-400">
                    One of her favorites
                  </p>

                </motion.div>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          FAMILY
      ===================================================== */}

      <section className="relative z-10 px-5 py-16">

        <div className="mx-auto max-w-md">

          <SectionHeading
            eyebrow="The people behind her story"
            title="Her family 🏡"
          />


          <p className="mt-3 max-w-[300px] text-sm leading-6 text-gray-400">
            Every family member adds another
            beautiful chapter to her story.
          </p>


          {/* FAMILY TREE */}

          <div className="relative mt-10">

            {/* Connection */}

            <div className="pointer-events-none absolute left-1/2 top-[75px] h-[190px] w-[2px] -translate-x-1/2 bg-[#FFD0B7]" />

            <div className="pointer-events-none absolute left-[25%] right-[25%] top-[75px] h-[2px] bg-[#FFD0B7]" />


            {/* Parents */}

            <div className="grid grid-cols-2 gap-4">

              {FAMILY.slice(
                0,
                2
              ).map(
                (person, index) => (
                  <FamilyCard
                    key={person.id}
                    person={person}
                    index={index}
                    onClick={() =>
                      setSelectedFamily(
                        person
                      )
                    }
                  />
                )
              )}

            </div>


            {/* Girl */}

            <div className="relative z-10 mx-auto mt-7 flex w-fit flex-col items-center">

              <motion.div
                animate={{
                  scale: [
                    1,
                    1.04,
                    1,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#FFD6E4] text-5xl shadow-xl"
              >

                {GIRL.image ? (
                  <img
                    src={GIRL.image}
                    alt={GIRL.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "👧🏻"
                )}

              </motion.div>

              <div className="mt-3 rounded-full bg-[#FF8066] px-4 py-2 text-[10px] font-black text-white shadow-sm">
                ✨ {GIRL.name} ✨
              </div>

            </div>


            {/* Children */}

            <div className="mt-7 grid grid-cols-2 gap-4">

              {FAMILY.slice(
                2
              ).map(
                (person, index) => (
                  <FamilyCard
                    key={person.id}
                    person={person}
                    index={
                      index + 2
                    }
                    onClick={() =>
                      setSelectedFamily(
                        person
                      )
                    }
                  />
                )
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FAMILY LOVE MESSAGE
      ===================================================== */}

      <section className="relative z-10 px-5 pb-16">

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
          className="mx-auto max-w-md rounded-[35px] bg-[#FFD6E4] px-6 py-10 text-center"
        >

          <motion.div
            animate={{
              scale: [
                1,
                1.1,
                1,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-5xl"
          >
            👨‍👩‍👧‍👦
          </motion.div>

          <h2 className="mt-5 text-2xl font-black">
            Home is people. 💕
          </h2>

          <p className="mx-auto mt-3 max-w-[270px] text-sm leading-6 text-gray-500">
            The ones who laugh with us,
            grow with us and make ordinary
            days feel extraordinary.
          </p>

        </motion.div>

      </section>


      {/* =====================================================
          HER STORY
      ===================================================== */}

      <section className="relative z-10 bg-[#FFF0D5] px-5 py-16">

        <div className="mx-auto max-w-md">

          <SectionHeading
            eyebrow="Her journey"
            title="Once upon a time... 📖"
          />


          <div className="relative mt-10">

            <div className="absolute bottom-7 left-5 top-7 w-[3px] rounded-full bg-[#FFB45C]" />

            {STORY.map(
              (chapter, index) => (
                <StoryCard
                  key={chapter.title}
                  chapter={chapter}
                  index={index}
                />
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          PHOTOBOOK
      ===================================================== */}

      <section className="relative z-10 px-5 py-16">

        <div className="mx-auto max-w-md">

          <SectionHeading
            eyebrow="Keep the moments"
            title="Little pieces of forever 📸"
          />


          <p className="mt-3 text-sm leading-6 text-gray-400">
            Every photograph holds a tiny
            piece of a much bigger story.
          </p>


          <div className="mt-8 grid grid-cols-2 gap-4">

            <PhotoCard
              emoji="🌸"
              title="Little smiles"
              rotate="-rotate-2"
            />

            <PhotoCard
              emoji="🧸"
              title="Childhood days"
              rotate="rotate-2"
            />

            <PhotoCard
              emoji="🎒"
              title="Growing up"
              rotate="rotate-1"
            />

            <PhotoCard
              emoji="🌈"
              title="Beautiful memories"
              rotate="-rotate-1"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          SECRET SURPRISE
      ===================================================== */}

      <section className="relative z-10 px-5 pb-16">

        <motion.button
          whileTap={{
            scale: 0.97,
          }}
          onClick={() =>
            setShowSurprise(true)
          }
          className="mx-auto block w-full max-w-md overflow-hidden rounded-[35px] bg-[#E7DBFF] px-6 py-10 text-center"
        >

          <motion.div
            animate={{
              y: [
                0,
                -8,
                0,
              ],
              rotate: [
                -4,
                4,
                -4,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="text-6xl"
          >
            🎁
          </motion.div>

          <p className="mt-5 text-[9px] font-black uppercase tracking-[0.22em] text-black/40">
            Something is hiding...
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Tap for a little surprise 👀
          </h2>

          <p className="mt-2 text-sm text-black/40">
            Curiosity might be rewarded.
          </p>

        </motion.button>

      </section>


      {/* =====================================================
          FINAL
      ===================================================== */}

      <section className="relative z-10 px-5 pb-10">

        <div className="mx-auto max-w-md text-center">

          <div className="flex justify-center gap-2 text-2xl">
            ⭐ 💕 ⭐
          </div>

          <h2 className="mt-5 text-3xl font-black">
            Some stories are too
            beautiful to forget.
          </h2>

          <p className="mx-auto mt-4 max-w-[280px] text-sm leading-6 text-gray-400">
            That's why we keep them here.
            One photograph, one memory and
            one little story at a time. 💛
          </p>

          <div className="mt-7 text-xl">
            🎀 📖 🧸 🌸 ✨
          </div>

        </div>

      </section>


      {/* =====================================================
          FAMILY MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedFamily && (
          <FamilyModal
            person={selectedFamily}
            onClose={() =>
              setSelectedFamily(null)
            }
          />
        )}
      </AnimatePresence>


      {/* =====================================================
          SURPRISE MODAL
      ===================================================== */}

      <AnimatePresence>
        {showSurprise && (
          <SurpriseModal
            onClose={() =>
              setShowSurprise(false)
            }
          />
        )}
      </AnimatePresence>

    </main>
  );
}


/*
|--------------------------------------------------------------------------
| SECTION HEADING
|--------------------------------------------------------------------------
*/

function SectionHeading({
  eyebrow,
  title,
}) {
  return (
    <div>

      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#FF8066]">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-3xl font-black leading-tight">
        {title}
      </h2>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| FAMILY CARD
|--------------------------------------------------------------------------
*/

function FamilyCard({
  person,
  index,
  onClick,
}) {
  return (
    <motion.button
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
      transition={{
        delay: index * 0.08,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-[28px] ${person.color} p-4 text-left shadow-sm`}
    >

      <div className="flex items-start justify-between">

        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[20px] bg-white/60 text-3xl">

          {person.image ? (
            <img
              src={person.image}
              alt={person.name}
              className="h-full w-full object-cover"
            />
          ) : (
            person.emoji
          )}

        </div>


        <ChevronRight
          size={16}
          className="text-black/30"
        />

      </div>


      <p className="mt-4 text-sm font-black">
        {person.name}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-black/40">
        {person.relation}
      </p>

    </motion.button>
  );
}


/*
|--------------------------------------------------------------------------
| FAMILY MODAL
|--------------------------------------------------------------------------
*/

function FamilyModal({
  person,
  onClose,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-end justify-center bg-[#172033]/70 p-3 backdrop-blur-md"
    >

      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: 100,
          opacity: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 130,
        }}
        onClick={(e) =>
          e.stopPropagation()
        }
        className="relative w-full max-w-md rounded-[35px] bg-[#FFF8EE] px-6 py-9 text-center shadow-2xl"
      >

        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/5"
        >
          <X size={18} />
        </button>


        <motion.div
          animate={{
            y: [
              0,
              -8,
              0,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className={`mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full ${person.color} text-6xl shadow-lg`}
        >

          {person.image ? (
            <img
              src={person.image}
              alt={person.name}
              className="h-full w-full object-cover"
            />
          ) : (
            person.emoji
          )}

        </motion.div>


        <p className="mt-6 text-[9px] font-black uppercase tracking-[0.2em] text-[#FF8066]">
          Her {person.relation}
        </p>


        <h2 className="mt-2 text-3xl font-black">
          {person.name}
        </h2>


        <div className="mx-auto mt-4 h-px w-16 bg-[#FFD0B7]" />


        <p className="mx-auto mt-5 max-w-[280px] text-sm leading-7 text-gray-500">
          {person.message}
        </p>


        <div className="mt-7 text-xl">
          💕 ⭐ ✨
        </div>

      </motion.div>

    </motion.div>
  );
}


/*
|--------------------------------------------------------------------------
| STORY CARD
|--------------------------------------------------------------------------
*/

function StoryCard({
  chapter,
  index,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * 0.08,
      }}
      className="relative mb-7 flex gap-4"
    >

      <motion.div
        animate={{
          scale: [
            1,
            1.08,
            1,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.4,
        }}
        className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-[#FFF0D5] text-xl shadow-sm"
        style={{
          backgroundColor:
            chapter.color,
        }}
      >
        {chapter.emoji}
      </motion.div>


      <div className="rounded-[24px] bg-white/80 px-5 py-5">

        <p className="text-[9px] font-black uppercase tracking-widest text-[#FF8066]">
          {chapter.year}
        </p>

        <h3 className="mt-1 text-base font-black">
          {chapter.title}
        </h3>

        <p className="mt-2 text-xs leading-6 text-gray-500">
          {chapter.text}
        </p>

      </div>

    </motion.div>
  );
}


/*
|--------------------------------------------------------------------------
| PHOTO CARD
|--------------------------------------------------------------------------
*/

function PhotoCard({
  emoji,
  title,
  rotate,
}) {
  return (
    <motion.div
      whileTap={{
        scale: 0.96,
      }}
      className={`rounded-[22px] bg-white p-2 pb-4 shadow-lg ${rotate}`}
    >

      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[17px] bg-gradient-to-br from-[#FFDDE8] to-[#FFF0C4] text-6xl">

        <motion.span
          animate={{
            y: [
              0,
              -7,
              0,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          {emoji}
        </motion.span>

      </div>

      <p className="mt-3 px-1 text-xs font-black">
        {title}
      </p>

    </motion.div>
  );
}


/*
|--------------------------------------------------------------------------
| SURPRISE MODAL
|--------------------------------------------------------------------------
*/

function SurpriseModal({
  onClose,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onClick={onClose}
      className="fixed inset-0 z-[220] flex items-center justify-center bg-[#172033]/80 p-5 backdrop-blur-md"
    >

      <motion.div
        initial={{
          scale: 0.5,
          rotate: -7,
        }}
        animate={{
          scale: 1,
          rotate: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
        }}
        onClick={(e) =>
          e.stopPropagation()
        }
        className="relative w-full max-w-sm overflow-hidden rounded-[35px] bg-[#FFF8EE] px-6 py-10 text-center shadow-2xl"
      >

        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/5"
        >
          <X size={18} />
        </button>


        <div className="flex justify-center gap-2 text-2xl">
          ⭐ ✨ ⭐
        </div>


        <motion.div
          animate={{
            y: [
              0,
              -10,
              0,
            ],
            rotate: [
              -4,
              4,
              -4,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="mt-5 text-7xl"
        >
          🎁
        </motion.div>


        <p className="mt-6 text-[9px] font-black uppercase tracking-[0.2em] text-[#FF8066]">
          Secret unlocked
        </p>


        <h2 className="mt-2 text-2xl font-black">
          A story worth remembering 💕
        </h2>


        <p className="mx-auto mt-4 max-w-[280px] text-sm leading-7 text-gray-500">
          Some of life's most beautiful
          moments are the tiny ones we
          almost forget.
        </p>


        <div className="mt-6 rounded-[25px] bg-[#FFE5A8] px-5 py-5">

          <p className="text-sm font-black">
            "Keep the laughter.
            Keep the memories.
            Keep the love." 💛
          </p>

        </div>


        <div className="mt-7 text-xl">
          🎀 📖 🧸 🌸 ✨
        </div>

      </motion.div>

    </motion.div>
  );
}


/*
|--------------------------------------------------------------------------
| FLOATING DECORATION
|--------------------------------------------------------------------------
*/

function FloatingDecoration({
  className,
  emoji,
  delay,
}) {
  return (
    <motion.div
      animate={{
        y: [
          0,
          -12,
          0,
        ],
        rotate: [
          -5,
          5,
          -5,
        ],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        delay,
      }}
      className={`absolute ${className} text-3xl`}
    >
      {emoji}
    </motion.div>
  );
}


/*
|--------------------------------------------------------------------------
| FLOATING STAR
|--------------------------------------------------------------------------
*/

function FloatingStar({
  className,
  delay,
}) {
  return (
    <motion.div
      animate={{
        y: [
          0,
          -7,
          0,
        ],
        rotate: [
          0,
          15,
          -5,
          0,
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
      }}
      className={`absolute ${className}`}
    >
      <Star
        size={15}
        fill="#FFD166"
        className="text-[#FFD166]"
      />
    </motion.div>
  );
}


export default About;