import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import FeaturesSection from "../components/FeaturesSection";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";
import BookOpeningLoader from "../components/BookOpeningLoader";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <BookOpeningLoader />}
      <Navbar />
      <Banner />
      <FeaturesSection />
      <Freebook />
      <Footer />
    </>
  );
}

export default Home;
