import * as queries from '../../mocks/queries';

export class QueryFactory {
  static generateQueries() {
    const resolvers = {};

    Object.values(queries).forEach((query) => {
      resolvers[query.resolverName] = async () => {
        // Use mockData directly as the response
        const data = query.mockData;

        // Return the formatted data based on the responseType's schema
        return data;
      };
    });

    return resolvers;
  }
}
