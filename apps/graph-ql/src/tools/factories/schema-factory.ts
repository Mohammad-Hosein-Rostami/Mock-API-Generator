import * as fs from 'fs';
import * as path from 'path';
import * as resolvers from '../../mocks';
import * as types from '../../types/graphql';

export class SchemaFactory {
  private static schemaPath = path.join(
    __dirname,
    '../../assets/schema.graphql'
  );

  static generateTypesSchema() {
    return `${Object.values(types)
      .map((type) => `${type.gqlTypeSchema} \n \n`)
      .join('\n')}`;
  }
  static generateResolversSchema() {
    return `${Object.values(resolvers)
      .map((resolver) => `${resolver.gqlSchemaType} \n \n`)
      .join('\n')}`;
  }

  static generateSchema(): void {
    const schema = `${this.generateTypesSchema()} \n ${this.generateResolversSchema()} \n`;

    // Write schema to file
    fs.writeFileSync(SchemaFactory.schemaPath, schema);
    console.log(
      `\n    ** GraphQL schema generated ** \n    ** path: ( ${SchemaFactory.schemaPath} ) **`
    );
  }
}
