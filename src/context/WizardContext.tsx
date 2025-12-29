"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ContentType = "movies" | "sports" | "gaming" | "general";
export type ViewingTime = "daytime" | "nighttime" | "both";
export type ColorPreference = "vivid" | "natural";
export type MotionPreference = "smooth" | "cinematic";
export type BrightnessPreference = "bright" | "comfortable";

export interface WizardAnswers {
  contentTypes: ContentType[]; // Multi-select support
  viewingTime: ViewingTime | null;
  colorPreference: ColorPreference | null;
  motionPreference: MotionPreference | null;
  brightnessPreference: BrightnessPreference | null;
}

export type WizardStep =
  | "welcome"
  | "content-type"
  | "viewing-time"
  | "color-preference"
  | "motion-preference"
  | "brightness"
  | "results";

const STEP_ORDER: WizardStep[] = [
  "welcome",
  "content-type",
  "viewing-time",
  "color-preference",
  "motion-preference",
  "brightness",
  "results",
];

interface WizardContextType {
  currentStep: WizardStep;
  answers: WizardAnswers;
  stepNumber: number; // 1-5 for questions, 0 for welcome, 6 for results
  totalQuestions: number;
  goToNext: () => void;
  goBack: () => void;
  setAnswer: <K extends keyof WizardAnswers>(key: K, value: WizardAnswers[K]) => void;
  toggleContentType: (type: ContentType) => void;
  resetWizard: () => void;
  canProceed: boolean;
}

const defaultAnswers: WizardAnswers = {
  contentTypes: [],
  viewingTime: null,
  colorPreference: null,
  motionPreference: null,
  brightnessPreference: null,
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<WizardStep>("welcome");
  const [answers, setAnswers] = useState<WizardAnswers>(defaultAnswers);

  const currentIndex = STEP_ORDER.indexOf(currentStep);
  const stepNumber = currentIndex; // 0 = welcome, 1-5 = questions, 6 = results
  const totalQuestions = 5;

  const goToNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < STEP_ORDER.length) {
      setCurrentStep(STEP_ORDER[nextIndex]);
    }
  };

  const goBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEP_ORDER[prevIndex]);
    }
  };

  const setAnswer = <K extends keyof WizardAnswers>(
    key: K,
    value: WizardAnswers[K]
  ) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const toggleContentType = (type: ContentType) => {
    setAnswers((prev) => {
      const current = prev.contentTypes;
      if (current.includes(type)) {
        return { ...prev, contentTypes: current.filter((t) => t !== type) };
      } else {
        return { ...prev, contentTypes: [...current, type] };
      }
    });
  };

  const resetWizard = () => {
    setCurrentStep("welcome");
    setAnswers(defaultAnswers);
  };

  // Determine if user can proceed based on current step
  const canProceed = (() => {
    switch (currentStep) {
      case "welcome":
        return true;
      case "content-type":
        return answers.contentTypes.length > 0;
      case "viewing-time":
        return answers.viewingTime !== null;
      case "color-preference":
        return answers.colorPreference !== null;
      case "motion-preference":
        return answers.motionPreference !== null;
      case "brightness":
        return answers.brightnessPreference !== null;
      case "results":
        return true;
      default:
        return false;
    }
  })();

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        answers,
        stepNumber,
        totalQuestions,
        goToNext,
        goBack,
        setAnswer,
        toggleContentType,
        resetWizard,
        canProceed,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
