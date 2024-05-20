import { render, renderHook, screen, waitFor } from "@testing-library/react";
import PokemonAPIProvider from ".";
import { gql, useQuery } from "@apollo/client";

describe("Pokemon API Provider", () => {
  it("should query pokemon api", async () => {
    const { result, rerender } = renderHook(
      () => {
        return useQuery(
          gql`
            query GetPokemon {
              pokemon(name: "gengar") {
                id
                name
                image
              }
            }
          `,
          {
            fetchPolicy: "network-only",
            errorPolicy: "none",
          }
        );
      },
      {
        wrapper: PokemonAPIProvider
      }
    );
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data.pokemon).toBeDefined();
    expect(result.current.error).toBeUndefined();
  });
  it("should have children", async () => {
    function Pokemon() {
      const { data } = useQuery(gql`
        query GetPokemon {
          pokemon(name: "gengar") {
            id
            name
            image
          }
        }
      `);

      return (
        <>
          {data && (
            <div>
              <h1>
                {data.pokemon.id}: {data.pokemon.name}
              </h1>
              <img aria-label={data.pokemon.name} src={data.pokemon.image} />
            </div>
          )}
        </>
      );
    }

    render(
      <PokemonAPIProvider>
        <Pokemon />
      </PokemonAPIProvider>,
      {}
    );

    await waitFor(
      () => {
        expect(
          screen.getByRole("img", {name: 'gengar'})
        ).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      }
    );
  });
});
