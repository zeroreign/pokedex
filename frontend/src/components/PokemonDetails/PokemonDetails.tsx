
import React from 'react';
import type { PokemonDetailsProps } from './PokemonDetails.types';

const PokemonDetails = ({details}: PokemonDetailsProps) => {
  return (
    <div>
      <h1>Pokemon Details {details.name}</h1>
    </div>
  );
}

export default PokemonDetails;