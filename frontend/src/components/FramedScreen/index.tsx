"use client";
import React, { useState } from "react";
import { FramedScreenProps, ImageErrorState } from "./types";
import Image from "next/image";

const FramedScreen = ({
  pokemon,
  width,
  height,
}: Readonly<FramedScreenProps>) => {
  const [error, setError] = useState<ImageErrorState>({
    hasError: false,
    errorLabel: "",
  });

  function handleError() {
    setError({
      hasError: true,
      errorLabel: `Failed to load image ${pokemon?.name}`,
    });
  }

  let dimentions = `max-w-${width ?? 5} max-h-${height ?? 5}`;

  // TODO This is better off as an SVG for more accurate shapes.
  return (
    <div
      id="framed-screen"
      className={`bg-white relative py-8 px-6 border-double border-black rounded-bl-[2rem] rounded-t-[0.25rem] rounded-br[0.25rem] aspect-[4/3] ${dimentions}`}
    >
      <div className="bg-black flex grow items-center justify-center relative text-white text-wrap aspect-auto rounded-[0.25rem]">
        {pokemon?.image && (
          <Image
            src={error.hasError ? "/unown-error.gif" : pokemon.image}
            alt={error.hasError ? error.errorLabel : pokemon.name}
            width={96}
            height={96}
            onError={handleError}
          />
        )}
      </div>
    </div>
  );
};

export default FramedScreen;
