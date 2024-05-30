import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { BrowserRouter } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import TeacherAccountRequirementModal from "@/components/modals/TeacherAccountRequirementModal/TeacherAccountRequirementModal";

const inter = Inter({ subsets: ["latin"] });
const frontServerUrl = process.env.Front_SERVER_URL || "http://localhost:3000/";

export const metadata: Metadata = {
  icons: {
    icon: "/assets/academ.svg",
    apple: "/assets/academ.svg",
  },
  metadataBase: new URL(frontServerUrl),
  title: "synchronisation academical",
  description:
    "Connectez-vous et synchronisez vos cours avec synchronisation academical.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
      <TeacherAccountRequirementModal />
      <Footer />
    </html>
  );
}
