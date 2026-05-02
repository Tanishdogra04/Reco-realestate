import React, { Suspense, lazy } from "react";
import HeroSection from "../components/HeroSection";
import Hero from "../components/Hero";
import Advantage from "../components/Advantagesection";
import AsideBar from "../components/AsideBar";


const PropertySection = lazy(() => import("../components/PropertySection"));
const Information = lazy(() => import("../components/Information"));
const TopLocalities = lazy(() => import("../components/TopLocalities"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const GetInTouch = lazy(() => import("../components/GetInTouch"));

const Home = () => {
  return (
    <>
      {/* ANIMATION CONCEPT (load immediately) */}
      <HeroSection />
      <Hero />
      <Advantage />
      <AsideBar />

      {/* Below the concept (lazy load) */}
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <PropertySection />
        <Information />
        <TopLocalities />
        <Testimonials />
        <GetInTouch />
      </Suspense>
    </>
  );
};

export default Home;
