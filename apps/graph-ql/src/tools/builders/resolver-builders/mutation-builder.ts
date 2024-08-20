import { AbstractResolverBuilder } from './abstract-resolver-builder';

export class MutationBuilder<T> extends AbstractResolverBuilder<T> {
  private generateGqlTypeSchema() {
    this.gqlSchemaType = `type Mutation {\n  ${this.resolverName}${
      this.argsType ? `(input: ${this.argsType.typeName}!)` : ''
    }: ${this.responseType.typeName}! \n}`;
    return this;
  }

  public build() {
    this.generateGqlTypeSchema();
    return {
      resolverName: this.resolverName,
      responseType: this.responseType,
      argsType: this.argsType,
      mockData: this.mockData,
      gqlSchemaType: this.gqlSchemaType,
    };
  }
}
