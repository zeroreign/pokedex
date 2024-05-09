import gqlRequest from 'supertest-graphql';
import { AppModule } from '../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import gql from 'graphql-tag';
import { Pokemon, PokemonTypes } from '../graphql.schema.types';

describe('Pokemon', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Query', () => {
    it('should get pokemon by name', async () => {
      const { data } = await gqlRequest<{
        pokemon: Pick<Pokemon, 'id' | 'name'>;
      }>(app.getHttpServer())
        .query(gql`
          query {
            pokemon(name: "bulbasaur") {
              id
              name
            }
          }
        `)
        .expectNoErrors();

      expect(data.pokemon).toBeTruthy();
      expect(data.pokemon).toEqual({
        id: '1',
        name: 'bulbasaur',
      });
    });

    it('should get pokemon by id', async () => {
      const { data } = await gqlRequest<{
        pokemon: Pick<Pokemon, 'id' | 'name'>;
      }>(app.getHttpServer())
        .query(gql`
          query {
            pokemon(id: 1) {
              id
              name
            }
          }
        `)
        .expectNoErrors();

      expect(data.pokemon).toBeTruthy();
      expect(data.pokemon).toEqual({
        id: '1',
        name: 'bulbasaur',
      });
    });

    it('should get a list of all known pokemon types', async () => {
      const { data } = await gqlRequest<{ types: keyof typeof PokemonTypes }>(
        app.getHttpServer(),
      ).query(gql`
        query {
          types
        }
      `)
      .expectNoErrors();

      expect(data.types).toBeTruthy();
      expect(data.types).toEqual(Object.values(PokemonTypes));
    });
  });
});
