import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-dvh bg-base-100">
      <Header />
      <main className="flex-1 pb-safe">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
