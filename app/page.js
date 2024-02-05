"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";


export default function Home() {
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);

  const { theme, setTheme } = useTheme();


  const getNextJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    setCurrentJokeIndex(randomIndex);
  
  };


  useEffect(() => {
    async function fetchJokes() {
      try {
        const response = await fetch("/api");
        if (!response.ok) {
          throw new Error("veri alınamadı");
        }
        const data = await response.json();
        setJokes(data.data);
      } catch (error) {
        console.error("fetch hatası", error);
      }
    }
    fetchJokes();
  }, []);


  if (jokes.length === 0) {
    return <div>Şakalar yükleniyor...</div>;
  }
   const currentJoke = jokes[currentJokeIndex];


  return (
    <>
     <div className="inset-0 z-10 flex flex-col bg-white dark:bg-sky-900 rounded-lg shadow-md dark:shadow-md p-6 items-center">
        <div className="flex items-center justify-between mt-4">
            <h2 className="text-3xl font-bold leading-tight text-sky-900 font-sans hover:text-sky-700 dark:text-white ">
              Elf&lsquo;in App&rsquo;i
            </h2>
            <label className="switch" style={{ position: "absolute", right: "5px"}}>
              <input
                type="checkbox"
                className="hidden"
                onChange={() => {
                  setTheme(theme === "light" ? "dark" : "light");
                }}
              />
              <span className="slider round bg-gray-300 dark:bg-gray-700 ">
                <span
                  className={`mr-2 ml-2 mt-1 absolute ${
                    theme === "light" ? "left-0" : "right-0"
                  }`}
                >
                  {theme === "light" ? "🌙" : "☀️"}
                </span>
              </span>
            </label>
        </div> 

        {/* Joke Display */}
       <div className="flex flex-col items-center border border-sky-100 border-dashed shadow-2xl p-4 mt-7 dark:bg-sky-900 dark:border-yellow-600">
          <div className="text-center space-y-4 mt-10">
            <p className="text-3xl text-sky-700 font-sans hover:text-sky-400 dark:text-yellow-400 ">
              &quot;{currentJoke.text}&quot;
            </p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <Image
              className="border rounded-md bg-white m-4 w-1/2 dark:border-sky-800"
              src={currentJoke.image}
              width={1200}
              height={1200}
              alt="sakalar"
            />
          </div>
          <div className="flex justify-center mt-4 space-x-4 mb-10">
            <button
              onClick={getNextJoke}
              className="inline-block px-4 py-2 rounded-lg border border-gray-300 text-sky-800 font-semibold hover:text-sky-600 hover:bg-sky-100 dark:bg-white dark:hover:text-sky-400 dark:hover:bg-zinc-100"
            >
              Yenisi
              <span className="ml-2 text-sky-400" aria-hidden="true">
                →
              </span>
            </button>

            <Link
              href={currentJoke.xLink}
              className="inline-block px-4 py-2 rounded-lg border border-gray-300 text-sky-800 font-semibold hover:text-sky-600 hover:bg-sky-100 dark:bg-white dark:hover:text-sky-400 dark:hover:bg-zinc-100"
            >
              Tweete Git
              <span className="ml-2 text-sky-400" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Footer */}
     <div className="text-center mt-3">
          <span className="text-xs font-italic leading-tight text-gray-400 dark:text-zinc-400 dark:hover:text-zinc-300">
            App&lsquo;in geliştirilmesinde çok büyük katkıları olan <br></br>
            <Link
              className="font-bold text-sky-800 opacity-50 hover:opacity-90 dark:text-sky-200 dark:hover:text-sky-300"
              href="https://x.com/GweepCreative?s=20"
            >
              @gweepCreative
            </Link>
            &lsquo;e özel teşekkürler ◕‿◕
          </span>
          <br></br>

          <div className="inset-1 z-2 flex flex-col bg-gray rounded-lg shadow-sm p-3  mt-10">
            <span className="text-sm font-italic leading-tight text-gray-300 mt-10">
              <Link
                className="font-mono text-pink-400 opacity-75 hover:text-pink-600 opacity-25 dark:text-pink-400 dark:hover:text-pink-600"
                href="https://x.com/mommy4_0"
              >
                a @Mommy4_0 Project || 2024 || 4 my sweety sista!
              </Link>
            </span>
          </div>
        </div>
      </div> 
    </>
  );
}
