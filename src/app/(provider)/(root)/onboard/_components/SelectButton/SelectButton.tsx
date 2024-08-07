"use client";

import { useTravelType } from "@/stores/travelType.store";
import { MouseEvent, useState } from "react";

type SelectButtonProps = {
  text: string;
  category: "theme" | "season" | "travelMate";
};

function SelectButton({ text, category }: SelectButtonProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const {
    setTheme,
    setSeason,
    setTravelMate,
    clearTheme,
    clearSeason,
    clearTravelMate,
  } = useTravelType();

  const actions = {
    theme: { set: setTheme, clear: clearTheme },
    season: { set: setSeason, clear: clearSeason },
    travelMate: { set: setTravelMate, clear: clearTravelMate },
  };
  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const action = actions[category];
    setIsClicked(!isClicked);
    if (!isClicked) return action.set(text);
    action.clear(text);
  };

  return (
    <button
      onClick={(e) => handleClick(e)}
      className={`${isClicked ? "bg-[#4394ED]" : "bg-white"} px-4 py-2.5 rounded-lg`}
    >
      <p className={`${isClicked ? "text-white font-bold" : "text-black"}`}>
        {text}
      </p>
    </button>
  );
}

export default SelectButton;
