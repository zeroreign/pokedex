import React from "react";
import type { PokemonDetailsProps } from "./types";
import { capitalize } from "lodash";

const PokemonDetails = ({ details }: PokemonDetailsProps) => {
  return (
    <div className={`relative w-10/12 m-8`}>
      <div
        className={
          "bg-brown text-white font-mono tracking-wider h-[84px] w-full p-1.5 rounded-[0.25rem] shadow-border"
        }
      >
          {details && (
            <>
              <div id="identifiers" className="flex justify-between">
                <h2># {details.id}</h2>
                <h2>{capitalize(details.name)}</h2>
              </div>
              <ul id="types" className="flex justify-evenly">
                {details.types?.map((type) => {
                  return (
                    <li key={type}>
                      <p>{capitalize(type)}</p>
                    </li>
                  );
                })}
              </ul>
              <div id="dimentions" className="flex justify-evenly space-x-8">
                <p>Height: {details.height}</p>
                <p>Weight: {details.weight}</p>
              </div>
            </>
          )}
        </div>
      </div>
  );
};

export default PokemonDetails;
