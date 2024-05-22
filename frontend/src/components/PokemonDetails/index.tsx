import React from "react";
import type { PokemonDetailsProps } from "./types";
import { capitalize } from "lodash";

const PokemonDetails = ({ details, className }: PokemonDetailsProps) => {
  return (
    <div className={"bg-brown text-white font-mono tracking-wider relative"}>
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
  );
};

export default PokemonDetails;
