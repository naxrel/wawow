"use client";

import { useState } from "react";
import LandingPage from "./wow";
import PopupIntro from "./PopupIntro";
import SpaceConfess from "./SpaceConfess";

interface RootClientProps {
  photos: string[];
}

type Stage = "landing" | "popup" | "confess";

export default function RootClient({ photos }: RootClientProps) {
  const [stage, setStage] = useState<Stage>("landing");

  if (stage === "landing") {
    return <LandingPage onApply={() => setStage("popup")} />;
  }

  if (stage === "popup") {
    return <PopupIntro onContinue={() => setStage("confess")} />;
  }

  return <SpaceConfess photos={photos} />;
}
