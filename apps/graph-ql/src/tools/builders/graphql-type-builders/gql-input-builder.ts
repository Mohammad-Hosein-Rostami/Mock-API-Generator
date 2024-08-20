import {
  AbstractGraphQlTypeBuilder,
  TFields,
} from './abstract-graphql-type-builder';

export interface IGqlInputBuilder {
  typeName: string;
  fields: TFields;
  gqlTypeSchema: string;
}

export class GqlInputBuilder extends AbstractGraphQlTypeBuilder {
  public build(): IGqlInputBuilder {
    this.generateGqlTypeSchema('input');
    return {
      typeName: this.typeName,
      fields: this.fields,
      gqlTypeSchema: this.gqlTypeSchema,
    };
  }
}
