"use client";
import FramedScreen from "@/components/FramedScreen";
import { FramedScreenProps } from "@/components/FramedScreen/types";
import {
  IQuery,
  Pokemon,
} from "@/components/PokemonAPIProvider/pokemon-api.types";
import PokemonDetails from "@/components/PokemonDetails";
import { PokemonDetailsProps } from "@/components/PokemonDetails/types";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

export default function Home() {
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonDetailsProps | null>(null);
  const [pokemonImage, setPokemonImage] = useState<FramedScreenProps | null>(
    null
  );
  const [queryInput, setQueryInput] = useState<string | null>("gengar");
  const GET_POKEMONT = gql`
    query GetPokemon($name: String!) {
      pokemon(name: $name) {
        id
        name
        types
        image
        height
        weight
      }
    }
  `;

  type GetPokemonResponse = {
    pokemon: Awaited<ReturnType<IQuery["pokemon"]>>;
  };

  const { loading, error, data } = useQuery<GetPokemonResponse>(GET_POKEMONT, {
    variables: { name: queryInput },
    fetchPolicy: "network-only",
    errorPolicy: "none",
    onCompleted: (data) => {
      const pokemon = data.pokemon;
      if (!pokemon) {
        return;
      }
      setPokemonDetails({
        details: {
          id: pokemon.id,
          name: pokemon.name,
          types: [...(pokemon.types || [])],
          weight: pokemon.weight,
          height: pokemon.height,
        },
      });
      setPokemonImage({
        pokemon: {
          name: pokemon.name,
          image: pokemon.image,
        },
      });
    },
  });

  return (
    <div className="bg-white h-screen flex">
      <div className="flex flex-auto flex-col items-center justify-center bg-red">
          <FramedScreen pokemon={pokemonImage?.pokemon} />
          <PokemonDetails details={pokemonDetails?.details} />
      </div>
    </div>
  );
}
