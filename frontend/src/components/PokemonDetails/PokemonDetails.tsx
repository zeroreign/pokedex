import React from "react";
import type { PokemonDetailsProps } from "./PokemonDetails.types";
import { capitalize } from "lodash";

const PokemonDetails = ({ details }: PokemonDetailsProps) => {
  return (
    <div>
      <div>
        <h2># {details.id}</h2>
        <h2>{capitalize(details.name)}</h2>
      </div>
      <ul>
        {details.types?.map((type) => {
          return (
            <li key={type}>
              <p>{capitalize(type)}</p>;
            </li>
          );
        })}
      </ul>
      <div>
        <p>Height: {details.height}</p>
        <p>Weight: {details.weight}</p>
      </div>
    </div>
  );
};

export default PokemonDetails;
