import { WizardAnswers, ContentType } from "@/context/WizardContext";

export interface ProfileSetting {
  icon: string;
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
      { icon: "🎬", label: "Cinema Mode" },
      { icon: "🌙", label: "Low Brightness" },
      { icon: "🎨", label: "Natural Colors" },
      { icon: "🎞️", label: "Cinematic Motion" },
      { icon: "🔥", label: "Warm Tone" },
    ],
  },
  "Cinema Vivid Mode": {
    name: "Cinema Vivid Mode",
    description: "Optimized for movies in a bright room",
    settings: [
      { icon: "🎬", label: "Cinema Mode" },
      { icon: "☀️", label: "High Brightness" },
      { icon: "✨", label: "Vivid Colors" },
      { icon: "🎞️", label: "Cinematic Motion" },
      { icon: "⚪", label: "Neutral Tone" },
    ],
  },
  "Sports Arena Mode": {
    name: "Sports Arena Mode",
    description: "Optimized for fast action and clarity",
    settings: [
      { icon: "⚽", label: "Sports Mode" },
      { icon: "☀️", label: "High Brightness" },
      { icon: "✨", label: "Vivid Colors" },
      { icon: "🌊", label: "Smooth Motion" },
      { icon: "❄️", label: "Cool Tone" },
    ],
  },
  "Sports Night Mode": {
    name: "Sports Night Mode",
    description: "Sports viewing comfortable for evening",
    settings: [
      { icon: "⚽", label: "Sports Mode" },
      { icon: "🌙", label: "Medium Brightness" },
      { icon: "✨", label: "Vivid Colors" },
      { icon: "🌊", label: "Smooth Motion" },
      { icon: "⚪", label: "Neutral Tone" },
    ],
  },
  "Game Zone Pro": {
    name: "Game Zone Pro",
    description: "Maximum responsiveness for competitive gaming",
    settings: [
      { icon: "🎮", label: "Game Mode" },
      { icon: "⚡", label: "Low Latency" },
      { icon: "✨", label: "Vivid Colors" },
      { icon: "☀️", label: "High Brightness" },
      { icon: "❄️", label: "Cool Tone" },
    ],
  },
  "Game Zone Night": {
    name: "Game Zone Night",
    description: "Gaming optimized for dark room comfort",
    settings: [
      { icon: "🎮", label: "Game Mode" },
      { icon: "⚡", label: "Low Latency" },
      { icon: "✨", label: "Vivid Colors" },
      { icon: "🌙", label: "Low Brightness" },
      { icon: "⚪", label: "Neutral Tone" },
    ],
  },
  "Everyday Comfort": {
    name: "Everyday Comfort",
    description: "Balanced settings for all-day viewing",
    settings: [
      { icon: "📺", label: "Standard Mode" },
      { icon: "👁️", label: "Easy Brightness" },
      { icon: "🎨", label: "Natural Colors" },
      { icon: "🎞️", label: "Cinematic Motion" },
      { icon: "🔥", label: "Warm Tone" },
    ],
  },
  "Everyday Vivid": {
    name: "Everyday Vivid",
    description: "Dynamic settings for mixed content",
    settings: [
      { icon: "📺", label: "Dynamic Mode" },
      { icon: "☀️", label: "High Brightness" },
      { icon: "✨", label: "Vivid Colors" },
      { icon: "🌊", label: "Smooth Motion" },
      { icon: "⚪", label: "Neutral Tone" },
    ],
  },
  // Hybrid profiles for multi-select scenarios
  "Sports & Movies Mode": {
    name: "Sports & Movies Mode",
    description: "Best of both worlds for action and cinema",
    settings: [
      { icon: "🎬", label: "Adaptive Mode" },
      { icon: "🌊", label: "Smooth Motion" },
      { icon: "✨", label: "Vivid Colors" },
      { icon: "👁️", label: "Balanced Brightness" },
      { icon: "⚪", label: "Neutral Tone" },
    ],
  },
  "Gaming & Sports Mode": {
    name: "Gaming & Sports Mode",
    description: "Optimized for fast-paced action",
    settings: [
      { icon: "⚡", label: "Low Latency" },
      { icon: "🌊", label: "Smooth Motion" },
      { icon: "✨", label: "Vivid Colors" },
      { icon: "☀️", label: "High Brightness" },
      { icon: "❄️", label: "Cool Tone" },
    ],
  },
  "Entertainment Hub": {
    name: "Entertainment Hub",
    description: "Versatile settings for varied content",
    settings: [
      { icon: "📺", label: "Smart Mode" },
      { icon: "🎨", label: "Adaptive Colors" },
      { icon: "🌊", label: "Smooth Motion" },
      { icon: "👁️", label: "Auto Brightness" },
      { icon: "⚪", label: "Neutral Tone" },
    ],
  },
};

// Priority order for content types when multiple are selected
const contentPriority: ContentType[] = ["gaming", "sports", "movies", "general"];

function getPrimaryContentType(contentTypes: ContentType[]): ContentType {
  // Return the highest priority content type from the selection
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
