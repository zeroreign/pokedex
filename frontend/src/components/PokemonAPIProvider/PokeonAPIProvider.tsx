"use client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import React from "react";
import { ReactNode } from "react";

const PokemonAPIProvider = ({ children }: { children: ReactNode }) => {
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    cache: cache,
    uri: "http://localhost:3001/graphql", // TODO this will eventually be set by nodeenv
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default PokemonAPIProvider;
