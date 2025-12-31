import { WizardAnswers, ContentType } from "@/context/WizardContext";

export interface ProfileSetting {
  label: string;
}

export interface Profile {
  name: string;
  description: string;
  settings: ProfileSetting[];
}

export const profiles: Record<string, Profile> = {
  "Cinema Night Mode": {
    name: "Cinema Night Mode",
    description: "Optimized for movies in a dark room",
    settings: [
      { label: "Cinema Mode" },
      { label: "Low Brightness" },
      { label: "Natural Colors" },
      { label: "Original Motion" },
      { label: "Warm Tone" },
    ],
  },
  "Cinema Vivid Mode": {
    name: "Cinema Vivid Mode",
    description: "Optimized for movies in a bright room",
    settings: [
      { label: "Cinema Mode" },
      { label: "High Brightness" },
      { label: "Vivid Colors" },
      { label: "Original Motion" },
      { label: "Neutral Tone" },
    ],
  },
  "Sports Arena Mode": {
    name: "Sports Arena Mode",
    description: "Optimized for fast action and clarity",
    settings: [
      { label: "Sports Mode" },
      { label: "High Brightness" },
      { label: "Vivid Colors" },
      { label: "Clear Motion" },
      { label: "Cool Tone" },
    ],
  },
  "Sports Night Mode": {
    name: "Sports Night Mode",
    description: "Sports viewing comfortable for evening",
    settings: [
      { label: "Sports Mode" },
      { label: "Medium Brightness" },
      { label: "Vivid Colors" },
      { label: "Clear Motion" },
      { label: "Neutral Tone" },
    ],
  },
  "Game Zone Pro": {
    name: "Game Zone Pro",
    description: "Maximum responsiveness for competitive gaming",
    settings: [
      { label: "Game Mode" },
      { label: "Low Latency" },
      { label: "Vivid Colors" },
      { label: "High Brightness" },
      { label: "Cool Tone" },
    ],
  },
  "Game Zone Night": {
    name: "Game Zone Night",
    description: "Gaming optimized for dark room comfort",
    settings: [
      { label: "Game Mode" },
      { label: "Low Latency" },
      { label: "Vivid Colors" },
      { label: "Low Brightness" },
      { label: "Neutral Tone" },
    ],
  },
  "Everyday Comfort": {
    name: "Everyday Comfort",
    description: "Balanced settings for all-day viewing",
    settings: [
      { label: "Standard Mode" },
      { label: "Easy Brightness" },
      { label: "Natural Colors" },
      { label: "Original Motion" },
      { label: "Warm Tone" },
    ],
  },
  "Everyday Vivid": {
    name: "Everyday Vivid",
    description: "Dynamic settings for mixed content",
    settings: [
      { label: "Dynamic Mode" },
      { label: "High Brightness" },
      { label: "Vivid Colors" },
      { label: "Clear Motion" },
      { label: "Neutral Tone" },
    ],
  },
  "Sports & Movies Mode": {
    name: "Sports & Movies Mode",
    description: "Best of both worlds for action and cinema",
    settings: [
      { label: "Adaptive Mode" },
      { label: "Clear Motion" },
      { label: "Vivid Colors" },
      { label: "Balanced Brightness" },
      { label: "Neutral Tone" },
    ],
  },
  "Gaming & Sports Mode": {
    name: "Gaming & Sports Mode",
    description: "Optimized for fast-paced action",
    settings: [
      { label: "Low Latency" },
      { label: "Clear Motion" },
      { label: "Vivid Colors" },
      { label: "High Brightness" },
      { label: "Cool Tone" },
    ],
  },
  "Entertainment Hub": {
    name: "Entertainment Hub",
    description: "Versatile settings for varied content",
    settings: [
      { label: "Smart Mode" },
      { label: "Adaptive Colors" },
      { label: "Clear Motion" },
      { label: "Auto Brightness" },
      { label: "Neutral Tone" },
    ],
  },
};

// Priority order for content types when multiple are selected
const contentPriority: ContentType[] = ["gaming", "sports", "movies", "general"];

function getPrimaryContentType(contentTypes: ContentType[]): ContentType {
  for (const priority of contentPriority) {
    if (contentTypes.includes(priority)) {
      return priority;
    }
  }
  return "general";
}

export function getProfile(answers: WizardAnswers): Profile {
  const {
    contentTypes,
    viewingTime,
    colorPreference,
    brightnessPreference,
  } = answers;

  // Handle multi-select: check for specific combinations
  if (contentTypes.length > 1) {
    const hasGaming = contentTypes.includes("gaming");
    const hasSports = contentTypes.includes("sports");
    const hasMovies = contentTypes.includes("movies");

    if (hasGaming && hasSports) {
      return profiles["Gaming & Sports Mode"];
    }
    if (hasSports && hasMovies) {
      return profiles["Sports & Movies Mode"];
    }
    if (contentTypes.length >= 3 || contentTypes.includes("general")) {
      return profiles["Entertainment Hub"];
    }
  }

  // Single content type logic
  const primaryContent = getPrimaryContentType(contentTypes);

  // Movies
  if (primaryContent === "movies") {
    if (viewingTime === "nighttime" || brightnessPreference === "comfortable") {
      return profiles["Cinema Night Mode"];
    } else {
      return profiles["Cinema Vivid Mode"];
    }
  }

  // Sports
  if (primaryContent === "sports") {
    if (viewingTime === "nighttime" || brightnessPreference === "comfortable") {
      return profiles["Sports Night Mode"];
    } else {
      return profiles["Sports Arena Mode"];
    }
  }

  // Gaming
  if (primaryContent === "gaming") {
    if (viewingTime === "nighttime" || brightnessPreference === "comfortable") {
      return profiles["Game Zone Night"];
    } else {
      return profiles["Game Zone Pro"];
    }
  }

  // General
  if (colorPreference === "natural" || brightnessPreference === "comfortable") {
    return profiles["Everyday Comfort"];
  } else {
    return profiles["Everyday Vivid"];
  }
}
