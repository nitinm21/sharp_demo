"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useWizard } from "@/context/WizardContext";
import TVFrame from "./TVFrame";

// Dynamic imports for code splitting - screens load instantly without spinner
const WelcomeScreen = dynamic(() => import("./screens/WelcomeScreen"), { ssr: false });
const ContentTypeQ = dynamic(() => import("./screens/ContentTypeQ"), { ssr: false });
const ViewingTimeQ = dynamic(() => import("./screens/ViewingTimeQ"), { ssr: false });
const ColorPreferenceQ = dynamic(() => import("./screens/ColorPreferenceQ"), { ssr: false });
const MotionPreferenceQ = dynamic(() => import("./screens/MotionPreferenceQ"), { ssr: false });
const BrightnessQ = dynamic(() => import("./screens/BrightnessQ"), { ssr: false });
const ResultsScreen = dynamic(() => import("./screens/ResultsScreen"), { ssr: false });

const screenVariants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function WizardContainer() {
  const { currentStep } = useWizard();

  const renderScreen = () => {
    switch (currentStep) {
      case "welcome":
        return <WelcomeScreen />;
      case "content-type":
        return <ContentTypeQ />;
      case "viewing-time":
        return <ViewingTimeQ />;
      case "color-preference":
        return <ColorPreferenceQ />;
      case "motion-preference":
        return <MotionPreferenceQ />;
      case "brightness":
        return <BrightnessQ />;
      case "results":
        return <ResultsScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <TVFrame>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </TVFrame>
  );
}
