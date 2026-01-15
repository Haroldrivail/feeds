import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
// import BottomNav from "../components/BottomNav";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Header />
      <main className="grow pb-16 lg:pb-0">{children}</main>
      <Footer className="hidden lg:block" />
      <BackToTop />
      {/* <BottomNav /> */}
    </div>
  );
}
