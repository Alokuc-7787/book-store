import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import FeaturesSection from "../components/FeaturesSection";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <FeaturesSection />
      <Freebook />
      <Footer />
    </>
  );
}

export default Home;
