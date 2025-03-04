import React from "react";

const getRandomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Avatar = ({ name }) => {
  const bgColor = getRandomColor();
  return (
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg ${bgColor}`}
    >
      {name?.charAt(0).toUpperCase() || "?"}
    </div>
  );
};

export default Avatar;
