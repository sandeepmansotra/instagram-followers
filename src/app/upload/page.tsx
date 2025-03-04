"use client";

import Image from "next/image";
import FilePicker from "../components/FilePicker";
import { useState } from "react";
import UnfollowerList from "../components/UnfollowerList";

export default function Upload() {
  const [showResult, setShowResult] = useState(false);
  const [extractedFiles, setExtractedFiles] = useState<
    { path: string; content: any; name: string }[]
  >([]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {!showResult ? (
          <FilePicker
            setShowResult={setShowResult}
            setExtractedFiles={setExtractedFiles}
          />
        ) : (
          <UnfollowerList extractedFiles={extractedFiles} />
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="Sandeep"
            width={16}
            height={16}
            className="dark:invert"
          />
          Designed by Sandeep
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.instagram.com/being_verto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/insta.svg"
            alt="Sandeep"
            width={16}
            height={16}
            className="dark:invert"
          />
          Sandeep (being_verto) →
        </a>
      </footer>
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
}
