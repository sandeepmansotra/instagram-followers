"use client";

import JSZip from "jszip";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FilePicker({
  setShowResult,
  setExtractedFiles,
}: {
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  setExtractedFiles: React.Dispatch<
    React.SetStateAction<
      { path: string; content: { profileUrl: string }; name: string }[]
    >
  >;
}) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    handleFileUpload(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/zip": [".zip"],
    },
    multiple: false,
  });

  function extractFileName(filePath: string): string {
    return filePath.split(/\\|\//).pop() || "";
  }

  const handleFileUpload = async (file: File) => {
    const zip = new JSZip();
    const extractedData: {
      path: string;
      name: string;
      content: { profileUrl: string };
    }[] = [];

    zip.loadAsync(file).then((zip) => {
      zip.forEach((relativePath, zipEntry) => {
        zipEntry.async("string").then((content) => {
          if (content) {
            extractedData.push({
              path: relativePath,
              content: JSON.parse(content),
              name: extractFileName(relativePath),
            });
          }
          setExtractedFiles(extractedData);
        });
      });
    });
  };

  return (
    <div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-xl font-semibold text-purple-600">Instagram</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-white-900 sm:text-6xl">
          Upload your zip file
        </p>
      </div>
      <div className="w-full mt-10">
        {files.length === 0 ? (
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-100 dark:border-purple-200 rounded-lg p-6"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="text-white font-medium">Drop the files here</div>
            ) : (
              <div className="text-white font-medium">
                Drag and drop a ZIP file here, or click to select a file
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-row bg-linear-to-bl from-blue-500 to-fuchsia-500 p-6 rounded-lg">
            <Image
              aria-hidden
              src="/file.svg"
              alt="Sandeep"
              width={16}
              height={16}
              className="dark:invert"
            />
            <div className="text-white font-medium text-xl ml-4 max-w-lg">
              {files[0]?.name}
            </div>
          </div>
        )}
      </div>
      <button
        disabled={files.length === 0}
        onClick={() => setShowResult(true)}
        className={`${
          files.length === 0 ? "opacity-50 cursor-not-allowed" : ""
        } relative w-full inline-flex items-center justify-center p-4 px-5 py-4 overflow-hidden font-medium text-indigo-300 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500 mt-10`}
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
        <span className="relative text-white font-bold text-xl">Continue</span>
      </button>
    </div>
  );
}
