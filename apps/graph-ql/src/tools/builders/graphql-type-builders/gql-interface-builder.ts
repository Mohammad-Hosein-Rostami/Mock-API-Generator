import {
  AbstractGraphQlTypeBuilder,
  TFields,
} from './abstract-graphql-type-builder';

export interface IGqlInterfaceBuilder {
  typeName: string;
  fields: TFields;
  gqlTypeSchema: string;
}

export class GqlInterfaceBuilder extends AbstractGraphQlTypeBuilder {
  public build(): IGqlInterfaceBuilder {
    this.generateGqlTypeSchema('interface');
    return {
      typeName: this.typeName,
      fields: this.fields,
      gqlTypeSchema: this.gqlTypeSchema,
    };
  }
}
