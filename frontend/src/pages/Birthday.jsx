import { useEffect, useMemo, useState } from "react";
import {
  Gift,
  Heart,
  Sparkles,
  Star,
  X,
  Camera,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

/*
|--------------------------------------------------------------------------
| MANUALLY SET THE UPCOMING BIRTHDAY
|--------------------------------------------------------------------------
|
| Change only these values whenever you want.
|
| IMPORTANT:
| The date must include the exact time.
|
| Example:
| 2026-09-24T19:30:00
|
| This means:
| 24 September 2026 at 7:30 PM
|
*/

const UPCOMING_BIRTHDAY = {
  name: "Birthday Girl",

  nickname: "Our Little Star",

  date: "2026-09-24T19:30:00",

  image: "",

  message:
    "The world became a little brighter on the day you arrived. 💕",

  wish:
    "May your next chapter be filled with laughter, adventures and beautiful memories. 🌈",
};


/*
|--------------------------------------------------------------------------
| MAIN COMPONENT
|--------------------------------------------------------------------------
*/

function Birthdays() {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft()
  );

  const [isBirthday, setIsBirthday] = useState(false);

  const [selectedGift, setSelectedGift] =
    useState(null);

  const [showSurprise, setShowSurprise] =
    useState(false);

  const [memories, setMemories] = useState([]);

  const [showCelebration, setShowCelebration] =
    useState(false);


  /*
  |--------------------------------------------------------------------------
  | REAL-TIME COUNTDOWN
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const updateCountdown = () => {
      const result = calculateTimeLeft();

      setTimeLeft(result);

      const birthdayNow =
        result.total <= 0;

      setIsBirthday(birthdayNow);
    };

    updateCountdown();

    const timer = setInterval(
      updateCountdown,
      1000
    );

    return () => clearInterval(timer);
  }, []);


  /*
  |--------------------------------------------------------------------------
  | BIRTHDAY CELEBRATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (isBirthday) {
      setShowCelebration(true);
    }
  }, [isBirthday]);


  /*
  |--------------------------------------------------------------------------
  | FETCH BIRTHDAY MEMORIES
  |--------------------------------------------------------------------------
  |
  | This is optional.
  | If your memory API is public, birthday memories
  | can be displayed here.
  |
  */

  useEffect(() => {
    fetchBirthdayMemories();
  }, []);


  const fetchBirthdayMemories =
    async () => {
      try {
        const response =
          await axios.get(
            "http://localhost:5001/api/memories"
          );

        if (response.data.success) {
          const birthdayMemories =
            (
              response.data.memories || []
            ).filter(
              (memory) =>
                memory.category ===
                "Birthday"
            );

          setMemories(
            birthdayMemories.slice(0, 6)
          );
        }
      } catch (error) {
        console.log(
          "Birthday memories unavailable"
        );
      }
    };


  /*
  |--------------------------------------------------------------------------
  | DATE
  |--------------------------------------------------------------------------
  */

  const birthdayDate = useMemo(
    () =>
      new Date(
        UPCOMING_BIRTHDAY.date
      ),
    []
  );


  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF8EE] pb-24 text-[#172033]">


      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <FloatingBalloon
          className="left-[-10px] top-24"
          emoji="🎈"
          delay={0}
        />

        <FloatingBalloon
          className="right-[-5px] top-52"
          emoji="🎈"
          delay={1.2}
        />

        <FloatingBalloon
          className="left-[5%] top-[70%]"
          emoji="🎈"
          delay={2}
        />

        <FloatingStar
          className="left-[12%] top-20"
          delay={0}
        />

        <FloatingStar
          className="right-[15%] top-32"
          delay={1}
        />

        <FloatingStar
          className="left-[18%] top-[48%]"
          delay={2}
        />

        <FloatingStar
          className="right-[10%] top-[68%]"
          delay={1.5}
        />

      </div>


      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative z-10 px-5 pb-4 pt-9">

        <div className="mx-auto max-w-md text-center">

          <motion.div
            initial={{
              opacity: 0,
              y: -20,
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
              Birthday Magic
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
            className="mt-7 text-[3.4rem] font-black leading-[0.88] tracking-[-0.07em]"
          >

            Someone's

            <span className="relative block text-[#FF8066]">

              special day

              <motion.span
                animate={{
                  rotate: [
                    0,
                    10,
                    -10,
                    0,
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
                className="absolute -right-1 -top-5 text-2xl"
              >
                🎈
              </motion.span>

            </span>

            is coming!

          </motion.h1>


          <motion.p
            initial={{
              opacity: 0,
              y: 15,
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
            Shhh... don't tell anyone.
            Something magical is getting
            closer. 👀✨
          </motion.p>

        </div>

      </section>


      {/* =========================================================
          BIRTHDAY GIRL CARD
      ========================================================= */}

      <section className="relative z-10 px-5 pt-8">

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

          {/* Decorative background */}

          <div className="absolute inset-3 rotate-3 rounded-[35px] bg-[#FFD7E4]" />

          <div className="absolute inset-1 -rotate-2 rounded-[35px] bg-[#FFE5A8]" />


          {/* Main card */}

          <div className="relative overflow-hidden rounded-[35px] border-4 border-white bg-white p-4 shadow-2xl">

            {/* Top decoration */}

            <div className="flex items-center justify-between px-2">

              <span className="rotate-[-5deg] text-2xl">
                🎀
              </span>

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF8066]">
                Birthday Girl
              </p>

              <span className="rotate-[5deg] text-2xl">
                🎀
              </span>

            </div>


            {/* Image */}

            <div className="relative mt-3 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FFDDE8] via-[#FFF1C5] to-[#DCCFFF]">

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


              {UPCOMING_BIRTHDAY.image ? (
                <img
                  src={
                    UPCOMING_BIRTHDAY.image
                  }
                  alt={
                    UPCOMING_BIRTHDAY.name
                  }
                  className="relative z-[2] mx-auto h-[280px] w-full object-cover"
                />
              ) : (
                <div className="relative z-[2] flex h-[280px] items-center justify-center">

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
                    className="text-[110px]"
                  >
                    👧🏻
                  </motion.div>

                </div>
              )}

            </div>


            {/* Name */}

            <div className="px-3 pb-3 pt-5 text-center">

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                Our little star
              </p>

              <h2 className="mt-1 text-3xl font-black">
                {UPCOMING_BIRTHDAY.name}
              </h2>

              <p className="mt-1 text-sm font-bold text-[#FF8066]">
                {UPCOMING_BIRTHDAY.nickname}
              </p>

            </div>

          </div>

        </motion.div>

      </section>


      {/* =========================================================
          COUNTDOWN
      ========================================================= */}

      <section className="relative z-10 px-5 pt-12">

        <div className="mx-auto max-w-md">

          <div className="text-center">

            <p className="text-[12px] font-black uppercase tracking-[0.25em] text-[#ba35d4]">
              Tick... tock... 🎵
            </p>

            <h2 className="mt-2 text-cyan-500 font-bold  text-4xl">
              The wait is on!
            </h2>

            <p className="mt-2 text-xs font-bold text-indigo-600">
              Until {formatDate(birthdayDate)}
            </p>

          </div>


          {/* Countdown */}

          <div className="relative mt-7 rounded-[35px] bg-[#a8dcd8] p-5 shadow-2xl">

            {/* Glow */}

            <motion.div
              animate={{
                opacity: [
                  0.1,
                  0.25,
                  0.1,
                ],
                scale: [
                  1,
                  1.05,
                  1,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="pointer-events-none absolute inset-0 rounded-[35px] bg-[#d1e1ea] blur-3xl"
            />


            <div className="relative grid grid-cols-2 gap-3">

              <CountdownBox
                value={timeLeft.months}
                label="MONTHS"
              />

              <CountdownBox
                value={timeLeft.days}
                label="DAYS"
              />

              <CountdownBox
                value={timeLeft.hours}
                label="HOURS"
              />

              <CountdownBox
                value={timeLeft.minutes}
                label="MINUTES"
              />

            </div>


            {/* Seconds */}

            <div className="relative mt-4">

              <CountdownBox
                value={timeLeft.seconds}
                label="SECONDS"
                highlight
                large
              />

            </div>


            {/* Tick */}

            <motion.div
              key={
                timeLeft.seconds
              }
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="relative mt-4 text-center"
            >

              <span className="text-[15px] font-black uppercase tracking-[0.2em]  text-[#bd48d2]">
                ⏰ tick • tock • tick • tock
              </span>

            </motion.div>

          </div>


          {/* Target time */}

          <div className="mt-4 flex items-center justify-center gap-2">

            <span className="text-sm">
              🎂
            </span>

            <p className="text-[15px] font-bold text-[#2e78c8]">
              {formatDateTime(
                birthdayDate
              )}
            </p>

            <span className="text-sm">
              🎂
            </span>

          </div>

        </div>

      </section>


      {/* =========================================================
          GIFTS
      ========================================================= */}

      <section className="relative z-10 px-5 py-16">

        <div className="mx-auto max-w-md">

          <div className="text-center">

            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#FF8066]">
              Something is hiding...
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Pick a gift 🎁
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              You never know what's inside 👀
            </p>

          </div>


          <div className="mt-9 grid grid-cols-3 gap-3">

            <GiftBox
              emoji="🎁"
              color="bg-[#FFD6E4]"
              delay={0}
              onClick={() =>
                setSelectedGift(1)
              }
            />

            <GiftBox
              emoji="🎀"
              color="bg-[#FFE5A8]"
              delay={0.5}
              onClick={() =>
                setSelectedGift(2)
              }
            />

            <GiftBox
              emoji="💌"
              color="bg-[#DCCFFF]"
              delay={1}
              onClick={() =>
                setSelectedGift(3)
              }
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          SECRET MESSAGE
      ========================================================= */}

      <section className="relative z-10 px-5 pb-16">

        <div className="mx-auto max-w-md">

          <motion.button
            whileTap={{
              scale: 0.97,
            }}
            onClick={() =>
              setShowSurprise(true)
            }
            className="relative w-full overflow-hidden rounded-[35px] bg-[#FF8066] px-6 py-10 text-center text-white shadow-xl"
          >

            <motion.div
              animate={{
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
              className="text-5xl"
            >
              💌
            </motion.div>

            <p className="mt-5 text-[9px] font-black uppercase tracking-[0.25em] text-white/60">
              Secret message
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Tap me if you're curious 👀
            </h2>

            <p className="mt-2 text-sm text-white/70">
              There's something waiting...
            </p>

          </motion.button>

        </div>

      </section>


      {/* =========================================================
          LITTLE STORY
      ========================================================= */}

      <section className="relative z-10 bg-[#FFF0D5] px-5 py-16">

        <div className="mx-auto max-w-md">

          <div className="text-center">

            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#FF8066]">
              Her little journey
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Once upon a time... 🌈
            </h2>

          </div>


          <div className="relative mt-10">

            <div className="absolute bottom-5 left-5 top-5 w-[3px] rounded-full bg-[#FFB45C]" />


            <StoryStep
              emoji="👶🏻"
              title="A tiny beginning"
              text="The story started with one tiny smile."
              color="#FFD6E4"
            />

            <StoryStep
              emoji="🧸"
              title="Little adventures"
              text="Toys, games, laughter and endless curiosity."
              color="#FFE5A8"
            />

            <StoryStep
              emoji="🎒"
              title="Growing up"
              text="New friends, new dreams and new stories."
              color="#CDEBFF"
            />

            <StoryStep
              emoji="🌈"
              title="Our little star"
              text="And the story is still being written..."
              color="#DCCFFF"
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          BIRTHDAY MEMORIES
      ========================================================= */}

      {memories.length > 0 && (
        <section className="relative z-10 px-5 py-16">

          <div className="mx-auto max-w-md">

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#FF8066]">
                From the memory vault
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Birthday moments 📸
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Little moments worth keeping forever.
              </p>

            </div>


            <div className="mt-8 grid grid-cols-2 gap-4">

              {memories.map(
                (memory, index) => (
                  <MemoryCard
                    key={memory._id}
                    memory={memory}
                    index={index}
                  />
                )
              )}

            </div>

          </div>

        </section>
      )}


      {/* =========================================================
          FINAL MESSAGE
      ========================================================= */}

      <section className="relative z-10 px-5 pb-12 pt-4">

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
          className="mx-auto max-w-md overflow-hidden rounded-[35px] bg-[#E7DBFF] px-6 py-12 text-center"
        >

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
            className="text-5xl"
          >
            🧸
          </motion.div>

          <h2 className="mt-5 text-3xl font-black leading-tight">
            Some days deserve
            extra sparkle. ✨
          </h2>

          <p className="mx-auto mt-4 max-w-[270px] text-sm leading-6 text-gray-500">
            And this one is definitely
            one of them. 💛
          </p>

          <div className="mt-7 flex justify-center gap-3 text-xl">
            🎈 ⭐ 🎂 🎁 💕
          </div>

        </motion.div>

      </section>


      {/* =========================================================
          GIFT MODAL
      ========================================================= */}

      <AnimatePresence>
        {selectedGift && (
          <GiftModal
            gift={selectedGift}
            onClose={() =>
              setSelectedGift(null)
            }
          />
        )}
      </AnimatePresence>


      {/* =========================================================
          SURPRISE MODAL
      ========================================================= */}

      <AnimatePresence>
        {showSurprise && (
          <SurpriseModal
            onClose={() =>
              setShowSurprise(false)
            }
          />
        )}
      </AnimatePresence>


      {/* =========================================================
          BIRTHDAY CELEBRATION
      ========================================================= */}

      <AnimatePresence>
        {showCelebration && (
          <Celebration
            onClose={() =>
              setShowCelebration(false)
            }
          />
        )}
      </AnimatePresence>

    </main>
  );
}


/*
|--------------------------------------------------------------------------
| COUNTDOWN CALCULATOR
|--------------------------------------------------------------------------
*/

function calculateTimeLeft() {
  const now = new Date();
  const target = new Date(UPCOMING_BIRTHDAY.date);

  let difference = target.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
    };
  }

  /*
   * Calculate months based on the actual calendar difference.
   */

  let months =
    (target.getFullYear() - now.getFullYear()) * 12 +
    (target.getMonth() - now.getMonth());

  /*
   * If the target day/time hasn't reached the corresponding
   * day in the final month, don't count that month yet.
   */

  const comparisonDate = new Date(now);

  comparisonDate.setMonth(
    comparisonDate.getMonth() + months
  );

  if (comparisonDate > target) {
    months--;
  }

  /*
   * Calculate the remaining duration after complete months.
   */

  const monthAnchor = new Date(now);

  monthAnchor.setMonth(
    monthAnchor.getMonth() + months
  );

  difference =
    target.getTime() - monthAnchor.getTime();

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  difference -=
    days * 1000 * 60 * 60 * 24;

  const hours = Math.floor(
    difference / (1000 * 60 * 60)
  );

  difference -=
    hours * 1000 * 60 * 60;

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  difference -=
    minutes * 1000 * 60;

  const seconds = Math.floor(
    difference / 1000
  );

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
    total: target.getTime() - now.getTime(),
  };
}


/*
|--------------------------------------------------------------------------
| COUNTDOWN BOX
|--------------------------------------------------------------------------
*/

function CountdownBox({
  value,
  label,
  highlight = false,
  large = false,
}) {
  return (
    <motion.div
      key={`${label}-${value}`}
      initial={{
        scale: 1.08,
        opacity: 0.5,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`relative overflow-hidden rounded-[22px] p-4 text-center ${
        highlight
          ? "bg-[#e4a96b]"
          : "bg-white/30"
      }`}
    >

      {/* Moving shine */}

      <motion.div
        animate={{
          x: [
            "-120%",
            "120%",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 4,
        }}
        className="absolute inset-y-0 w-10 rotate-12 bg-white/10 blur-md"
      />


      <motion.p
        key={value}
        initial={{
          y: -12,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={`relative font-black tracking-tight ${
          large
            ? "text-5xl"
            : "text-3xl"
        } ${
          highlight
            ? "text-pink-700"
            : "text-white"
        }`}
      >
        {String(value).padStart(
          2,
          "0"
        )}
      </motion.p>


      <p
        className={`relative mt-1 text-[12px] font-black tracking-[0.18em] ${
          highlight
            ? "text-pink-900"
            : "text-white"
        }`}
      >
        {label}
      </p>

    </motion.div>
  );
}


/*
|--------------------------------------------------------------------------
| GIFT BOX
|--------------------------------------------------------------------------
*/

function GiftBox({
  emoji,
  color,
  delay,
  onClick,
}) {
  return (
    <motion.button
      whileTap={{
        scale: 0.9,
      }}
      onClick={onClick}
      className={`relative flex h-[130px] flex-col items-center justify-center overflow-hidden rounded-[28px] ${color}`}
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
          delay,
        }}
        className="text-5xl"
      >
        {emoji}
      </motion.div>


      <p className="mt-3 text-[9px] font-black uppercase tracking-widest text-black/40">
        Open me
      </p>


      <motion.div
        animate={{
          opacity: [
            0.2,
            0.7,
            0.2,
          ],
          scale: [
            1,
            1.2,
            1,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay,
        }}
        className="absolute right-3 top-3 text-xs"
      >
        ✨
      </motion.div>

    </motion.button>
  );
}


/*
|--------------------------------------------------------------------------
| GIFT MODAL
|--------------------------------------------------------------------------
*/

function GiftModal({
  gift,
  onClose,
}) {
  const gifts = {
    1: {
      emoji: "🎁",
      title: "A tiny secret...",
      message:
        "Someone very special has been making people smile since the very beginning. 💛",
    },

    2: {
      emoji: "🎀",
      title: "Wrapped with love",
      message:
        "The best gifts aren't things. They're laughter, hugs and memories that stay forever. 🥰",
    },

    3: {
      emoji: "💌",
      title: "A little wish",
      message:
        "May every new year of your life bring another beautiful reason to smile. 🌈",
    },
  };


  const data = gifts[gift];


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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#172033]/75 p-5 backdrop-blur-md"
    >

      <motion.div
        initial={{
          scale: 0.6,
          rotate: -8,
        }}
        animate={{
          scale: 1,
          rotate: 0,
        }}
        exit={{
          scale: 0.7,
          opacity: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
        }}
        onClick={(e) =>
          e.stopPropagation()
        }
        className="relative w-full max-w-sm rounded-[35px] bg-[#FFF8EE] px-6 py-10 text-center shadow-2xl"
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
              -10,
              0,
            ],
            rotate: [
              -5,
              5,
              -5,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="text-7xl"
        >
          {data.emoji}
        </motion.div>


        <p className="mt-6 text-[9px] font-black uppercase tracking-[0.2em] text-[#FF8066]">
          Surprise unlocked
        </p>

        <h2 className="mt-2 text-2xl font-black">
          {data.title}
        </h2>

        <p className="mx-auto mt-4 max-w-[270px] text-sm leading-7 text-gray-500">
          {data.message}
        </p>


        <div className="mt-7 flex justify-center gap-3 text-xl">
          ⭐ 💛 ✨ 🎈
        </div>

      </motion.div>

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
      className="fixed inset-0 z-[210] flex items-center justify-center bg-[#172033]/80 p-5 backdrop-blur-md"
    >

      <motion.div
        initial={{
          scale: 0.5,
          rotate: -6,
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
            scale: [
              1,
              1.08,
              1,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-5 text-6xl"
        >
          💕
        </motion.div>


        <p className="mt-6 text-[9px] font-black uppercase tracking-[0.2em] text-[#FF8066]">
          A message for her
        </p>


        <h2 className="mt-2 text-2xl font-black">
          {UPCOMING_BIRTHDAY.name}
        </h2>


        <p className="mx-auto mt-5 max-w-[280px] text-sm leading-7 text-gray-500">
          {UPCOMING_BIRTHDAY.message}
        </p>


        <div className="my-6 h-px bg-[#FFD8C7]" />


        <p className="text-sm font-bold leading-6 text-[#FF8066]">
          {UPCOMING_BIRTHDAY.wish}
        </p>


        <div className="mt-7 text-2xl">
          🎂 🎈 🎁 ✨ 💛
        </div>

      </motion.div>

    </motion.div>
  );
}


/*
|--------------------------------------------------------------------------
| CELEBRATION
|--------------------------------------------------------------------------
*/

function Celebration({
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
      className="fixed inset-0 z-[300] overflow-hidden bg-[#172033]"
    >

      {/* Confetti */}

      <CelebrationConfetti />


      <div className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center text-white">

        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
          }}
          className="text-8xl"
        >
          🎂
        </motion.div>


        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="mt-7 text-[10px] font-black uppercase tracking-[0.3em] text-[#FFD166]"
        >
          Today is the day
        </motion.p>


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
            delay: 0.5,
          }}
          className="mt-3 text-5xl font-black leading-none"
        >
          HAPPY
          <br />
          BIRTHDAY!
        </motion.h1>


        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          className="mt-5 text-lg font-bold text-white/70"
        >
          {UPCOMING_BIRTHDAY.name} 💕
        </motion.p>


        <motion.div
          animate={{
            y: [
              0,
              -8,
              0,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-8 text-3xl"
        >
          🎉 🎈 🎁 ✨ 💛
        </motion.div>


        <button
          onClick={onClose}
          className="mt-10 rounded-2xl bg-white px-6 py-3 text-xs font-black text-[#172033]"
        >
          Keep the magic ✨
        </button>

      </div>

    </motion.div>
  );
}


/*
|--------------------------------------------------------------------------
| CONFETTI
|--------------------------------------------------------------------------
*/

function CelebrationConfetti() {
  const pieces = [
    "🎉",
    "✨",
    "🎈",
    "⭐",
    "💛",
    "🎀",
    "🌸",
    "🎁",
    "💫",
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {Array.from({
        length: 35,
      }).map((_, index) => {

        const emoji =
          pieces[
            index % pieces.length
          ];

        const left =
          (index * 29) % 100;

        const duration =
          3 +
          (index % 4);

        const delay =
          (index % 7) * 0.15;

        return (
          <motion.div
            key={index}
            initial={{
              y: -80,
              x: 0,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: "110vh",
              x:
                index % 2 === 0
                  ? 40
                  : -40,
              rotate: 360,
              opacity: [
                0,
                1,
                1,
                0,
              ],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute text-xl"
            style={{
              left: `${left}%`,
            }}
          >
            {emoji}
          </motion.div>
        );
      })}

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| STORY STEP
|--------------------------------------------------------------------------
*/

function StoryStep({
  emoji,
  title,
  text,
  color,
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
      className="relative mb-7 flex gap-4"
    >

      <motion.div
        whileHover={{
          scale: 1.1,
        }}
        className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-[#FFF0D5] text-xl shadow-sm"
        style={{
          backgroundColor: color,
        }}
      >
        {emoji}
      </motion.div>


      <div className="rounded-[22px] bg-white/80 px-4 py-4">

        <h3 className="text-sm font-black">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {text}
        </p>

      </div>

    </motion.div>
  );
}


/*
|--------------------------------------------------------------------------
| MEMORY CARD
|--------------------------------------------------------------------------
*/

function MemoryCard({
  memory,
  index,
}) {
  const rotations = [
    "-rotate-2",
    "rotate-2",
    "rotate-1",
    "-rotate-1",
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
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
      className={`overflow-hidden rounded-[22px] bg-white p-2 pb-3 shadow-lg ${rotations[index % rotations.length]}`}
    >

      <div className="relative aspect-square overflow-hidden rounded-[17px] bg-gray-100">

        {memory.mediaType ===
        "video" ? (
          <video
            src={memory.mediaUrl}
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={memory.mediaUrl}
            alt={
              memory.title ||
              "Birthday memory"
            }
            className="h-full w-full object-cover"
          />
        )}

      </div>


      <p className="mt-2 truncate px-1 text-xs font-black">
        {memory.title ||
          "Sweet memory 💛"}
      </p>

    </motion.div>
  );
}


/*
|--------------------------------------------------------------------------
| FLOATING BALLOON
|--------------------------------------------------------------------------
*/

function FloatingBalloon({
  className,
  emoji,
  delay,
}) {
  return (
    <motion.div
      animate={{
        y: [
          0,
          -15,
          0,
        ],
        rotate: [
          -4,
          4,
          -4,
        ],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className={`absolute ${className} text-4xl`}
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
          -8,
          0,
        ],
        rotate: [
          0,
          15,
          -5,
          0,
        ],
        scale: [
          1,
          1.1,
          1,
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
        size={16}
        fill="#FFD166"
        className="text-[#FFD166]"
      />
    </motion.div>
  );
}


/*
|--------------------------------------------------------------------------
| DATE FORMAT
|--------------------------------------------------------------------------
*/

function formatDate(date) {
  return new Date(
    date
  ).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}


/*
|--------------------------------------------------------------------------
| DATE + TIME FORMAT
|--------------------------------------------------------------------------
*/

function formatDateTime(date) {
  return new Date(
    date
  ).toLocaleString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );
}


export default Birthdays;