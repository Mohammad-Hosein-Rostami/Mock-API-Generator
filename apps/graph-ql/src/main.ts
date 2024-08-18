/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';
// import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
// import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { queries } from './queries/queries';
import { mutations } from './mutations/mutations';
import { SchemaFactory } from './tools/factory';

// Generate the GraphQL schema on server startup
SchemaFactory.generateSchema();

const typeDefs = gql(
  readFileSync(join(__dirname, './assets/schema.graphql'), 'utf8')
);

// Collect all resolvers from your queries and mutations
const resolvers = {
  Query: queries.reduce((acc, query) => {
    //@ts-ignore
    acc[query.query.split('(')[0]] = query.resolver;
    return acc;
  }, {}),
  Mutation: mutations.reduce((acc, mutation) => {
    //@ts-ignore
    acc[mutation.query.split('(')[0]] = mutation.resolver;
    return acc;
  }, {}),
};

const server = new ApolloServer({
  typeDefs,
  resolvers, // Pass the resolvers to Apollo Server
  // plugins: [ApolloServerPluginLandingPageDisabled()],
  // plugins: [
  //   ApolloServerPluginLandingPageGraphQLPlayground(), // Re-enable GraphQL Playground
  // ],
});

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });

// console.log(`🚀  Server ready at: ${url}`);

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
