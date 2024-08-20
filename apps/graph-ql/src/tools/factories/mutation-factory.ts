import * as mutations from '../../mocks/mutations';

export class MutationFactory {
  static generateMutations() {
    const resolvers = {};

    Object.values(mutations).forEach((mutation) => {
      resolvers[mutation.resolverName] = async () => {
        // Process the mutation using mockData or custom logic
        const data = mutation.mockData;

        // Return the formatted data based on the responseType's schema
        return data;
      };
    });

    return resolvers;
  }
}
