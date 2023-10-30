"use client";
import { Builder } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { Navbar } from "./components/Navbar/Navbar";

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(Navbar, {
  name: "Navbar",
});

Builder.registerComponent(HeroSection, {
  name: "HeroSection",
});
