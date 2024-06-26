import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HealthModule } from './health/health.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.types.ts'),
        emitTypenameField: true,
      },
      playground: true, // There is no env for this. But in prod consider disabling it on your use case.
    }),
    HealthModule,
    PokemonModule,
  ],
})
export class AppModule {}
