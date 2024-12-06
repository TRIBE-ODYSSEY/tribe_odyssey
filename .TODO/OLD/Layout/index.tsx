import React from "react";
import { Header } from "../../../../OLD/NavBar/Header";
import { Footer } from "../Footer";
import AppRoutes from "../../../config/routes";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#14121b] to-black text-gray-200 overflow-hidden">
      <Header />
      <main className="flex-grow flex flex-col w-full relative z-10">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
