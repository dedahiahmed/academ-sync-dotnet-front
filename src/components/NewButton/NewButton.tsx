"use client";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const getFormPath = (): string => {
    // Check which form should be opened based on the current path
    if (location.pathname.includes("/gestion-cours")) {
      return "new-course";
    }
    return "/";
  };
  const handleNewClick = (): void => {
    const formPath = getFormPath();
    window.location.href = formPath;
  };
  return (
    <>
      <button
        onClick={handleNewClick}
        className="px-2 py-1 bg-sky-500 text-gray-100 font-bold rounded hover:bg-sky-600 "
      >
        Nouveau
      </button>
    </>
  );
}
