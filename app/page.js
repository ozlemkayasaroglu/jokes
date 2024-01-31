"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);

  const getNextJoke = () => {
    // Rastgele bir şaka indeksi seç
    const randomIndex = Math.floor(Math.random() * jokes.length);

    // Seçilen indeksi güncelle
    setCurrentJokeIndex(randomIndex);
  };

  useEffect(() => {
    async function fetchJokes() {
      try {
        const response = await fetch("/api/jokes");
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
      <div className="fixed inset-0 z-10 flex flex-col bg-white rounded-lg shadow-md p-6 items-center">
        <div className="text-center mt-40">
          <h2 className="text-3xl font-bold leading-tight text-sky-900 font-sans hover:text-sky-700">
            Elf &quot;s Şaka  App&quot;i
          </h2>
        </div>
        <div className="flex flex-col items-center border border-sky-100 border-dashed shadow-2xl p-4 mt-7">
          <div className="text-center space-y-4 mt-10">
            <p className="text-xl text-sky-700 font-sans hover:text-sky-400">
              
              &quot;{currentJoke.text}&quot;
            </p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <Image
              className="border rounded-md bg-white m-4 w-1/2 "
              src={currentJoke.image}
              width={1200}
              height={1200}
              alt="sakalar"
            ></Image>
          </div>
          <div className="flex justify-center mt-4 space-x-4 mb-10">
            <button
              onClick={getNextJoke}
              className="inline-block px-4 py-2 rounded-lg border border-gray-300 text-sky-800 font-semibold hover:text-sky-600 hover:bg-sky-100"
            >
              Yenisi
              <span className="ml-2 text-sky-400" aria-hidden="true">
                →
              </span>
            </button>

            <Link
              href={currentJoke.xLink}
              className="inline-block px-4 py-2 rounded-lg border border-gray-300 text-sky-800 font-semibold hover:hover:text-sky-600 hover:bg-sky-100"
            >
              Tweete Git
              <span className="ml-2 text-sky-400" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="text-center mt-10">
          <span className="text-md font-italic leading-tight text-gray-400 ">
            App &quot;in geliştirilmesinde çok büyük katkıları olan <br></br>
            <Link
              className="font-bold text-sky-800 opacity-50 hover:opacity-90"
              href="https://x.com/GweepCreative?s=20"
            >
              @gweepCreative
            </Link>
            &quot;e özel teşekkürler ◕‿◕
          </span>
          <br></br>

          <div className="inset-1 z-2 flex flex-col bg-gray rounded-lg shadow-sm p-3  mt-10">
         
            <span className="text-sm font-italic leading-tight text-gray-300 mt-10">
              <Link
                className="font-mono text-pink-400 opacity-50  hover:text-pink-600 opacity-25"
                href="https://x.com/mommy4_0"
              >
                a @Mommy4_0 Project || 2024 || 4 my sweety sista!
              </Link>
            </span>
   
          </div>
          
          
        </div>
      </div>
    </>
  );
}
