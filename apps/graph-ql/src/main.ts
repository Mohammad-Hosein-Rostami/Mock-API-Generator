import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { MutationFactory, QueryFactory, SchemaFactory } from './tools';

// generate schema.graphql
SchemaFactory.generateSchema();

const typeDefs = gql(
  readFileSync(join(__dirname, './assets/schema.graphql'), 'utf8')
);

// Basic resolver for the Query and Mutation type
const resolvers = {
  Query: QueryFactory.generateQueries(),
  Mutation: MutationFactory.generateMutations(),
};

const server = new ApolloServer({
  typeDefs, // pass the schema.graphql to Apollo Server
  resolvers, // Pass the resolvers to Apollo Server
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`
    ** Server Started **
    🚀 Server ready at ${url}
  `);
});
