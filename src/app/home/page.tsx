"use client";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import { BrowserRouter } from "react-router-dom";

export default function page() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}
