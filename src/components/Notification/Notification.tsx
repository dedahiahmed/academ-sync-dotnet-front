import React from "react";
import { MdNotificationsActive } from "react-icons/md";

export default function Notification() {
  return (
    <button className="flex items-center justify-center border-none bg-transparent cursor-pointer text-blue-400 text-[2rem]">
      <MdNotificationsActive />
    </button>
  );
}
