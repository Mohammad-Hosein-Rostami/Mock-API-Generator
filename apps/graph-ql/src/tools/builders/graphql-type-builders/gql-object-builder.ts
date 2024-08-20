import {
  AbstractGraphQlTypeBuilder,
  TFields,
} from './abstract-graphql-type-builder';

export interface IGqlObjectBuilder {
  typeName: string;
  fields: TFields;
  gqlTypeSchema: string;
}

export class GqlObjectBuilder extends AbstractGraphQlTypeBuilder {
  public build(): IGqlObjectBuilder {
    this.generateGqlTypeSchema('object');
    return {
      typeName: this.typeName,
      fields: this.fields,
      gqlTypeSchema: this.gqlTypeSchema,
    };
  }
}
