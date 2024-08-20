import { AbstractResolverBuilder } from './abstract-resolver-builder';

export class QueryBuilder<T> extends AbstractResolverBuilder<T> {
  private generateGqlTypeSchema() {
    this.gqlSchemaType = `type Query {\n  ${this.resolverName}${
      this.argsType ? `(args: ${this.argsType.typeName}!)` : ''
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
