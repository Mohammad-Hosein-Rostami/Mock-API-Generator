import * as fs from 'fs';
import * as path from 'path';
import { queries } from '../queries/queries';
import { mutations } from '../mutations/mutations';

export class SchemaFactory {
  private static schemaPath = path.join(__dirname, '../assets/schema.graphql');

  static generateSchema(): void {
    let schema = '';

    // Add Queries
    if (queries.length > 0) {
      const queryDefinitions = queries.map((query) => query.query).join('\n  ');
      const argsTypeDefinitions = queries
        .map((query) => query.argsType)
        .join('\n\n');
      const responseTypeDefinitions = queries
        .map((query) => query.responseType)
        .join('\n\n');

      schema += `${argsTypeDefinitions}\n\n${responseTypeDefinitions}\n\n`;
      schema += `type Query {\n  ${queryDefinitions}\n}\n\n`;
    }

    // Add Mutations
    if (mutations.length > 0) {
      const mutationDefinitions = mutations
        .map((mutation) => mutation.query)
        .join('\n  ');
      const argsTypeDefinitions = mutations
        .map((mutation) => mutation.argsType)
        .join('\n\n');
      const responseTypeDefinitions = mutations
        .map((mutation) => mutation.responseType)
        .join('\n\n');

      schema += `${argsTypeDefinitions}\n\n${responseTypeDefinitions}\n\n`;
      schema += `type Mutation {\n  ${mutationDefinitions}\n}\n\n`;
    }

    // Write schema to file
    fs.writeFileSync(SchemaFactory.schemaPath, schema);
    console.log(`GraphQL schema generated at ${SchemaFactory.schemaPath}`);
  }
}
