"use client";
import { Builder } from "@builder.io/react";
import { AdvantagesSection } from "./components/AdvantagesSection/AdvantagesSection";
import { AuthModal } from "./components/AuthModal";
import Counter from "./components/Counter/Counter";
import { FeaturesSection } from "./components/FeaturesSection/FeaturesSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { IntegrationsSection } from "./components/IntegrationsSection/IntegrationsSection";
import { Navbar } from "./components/Navbar/Navbar";
import { PricingSection } from "./components/Pricing/PricingSection";
import { SocialProofSection } from "./components/SocialProofSection/SocialProofSection";

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(FeaturesSection, {
  name: "FeaturesSection",
});

Builder.registerComponent(HeroSection, {
  name: "HeroSection",
  inputs: [
    {
      name: "description",
      type: "string",
      required: true,
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
  ],
});

Builder.registerComponent(PricingSection, {
  name: "PricingSection",
});

Builder.registerComponent(IntegrationsSection, {
  name: "IntegrationsSection",
});

Builder.registerComponent(SocialProofSection, {
  name: "SocialProofSection",
});

Builder.registerComponent(AdvantagesSection, {
  name: "AdvantagesSection",
});

Builder.registerComponent(AuthModal, {
  name: "AuthModal",
});

Builder.registerComponent(Footer, {
  name: "Footer",
});

Builder.registerComponent(Navbar, {
  name: "Navbar",
});
