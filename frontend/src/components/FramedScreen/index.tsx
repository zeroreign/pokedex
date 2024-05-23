"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FramedScreenProps, ImageErrorState } from "./types";

const FramedScreen = ({
  pokemon,
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

  // TODO This is better off as an SVG for more accurate shapes.
  // TODO clean up the inline styles
  return (
    <div
      id="framed-screen"
      className={`bg-white relative py-8 px-6 border-double border-black rounded-bl-[2rem] rounded-t-[0.25rem] rounded-br[0.25rem] aspect-[4/3] size-1/6`}
    >
      <div className="bg-black flex grow items-center justify-center relative text-white text-wrap rounded-[0.25rem] h-full w-full">
        {pokemon?.image && (
          <Image
            src={error.hasError ? "/unown-error.gif" : pokemon.image}
            alt={error.hasError ? error.errorLabel : pokemon.name}
            width={200}
            height={200}
            unoptimized={true}
            onError={handleError}
            className="object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default FramedScreen;
