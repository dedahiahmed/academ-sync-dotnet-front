"use client";

import Course from "@/components/Course/Course";

import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import Pricing from "@/components/Pricing/Pricing";
import SignIn from "@/components/SignIn/SignIn";
import { BrowserRouter } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <Course />
    </>
  );
}
