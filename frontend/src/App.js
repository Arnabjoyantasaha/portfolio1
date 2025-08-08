import React from "react";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import GameSection from "./components/GameSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App min-h-screen bg-black text-white">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <GameSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;