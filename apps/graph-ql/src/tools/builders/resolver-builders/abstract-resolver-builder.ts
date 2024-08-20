import {
  IGqlInputBuilder,
  IGqlInterfaceBuilder,
  IGqlObjectBuilder,
} from '../graphql-type-builders';

export class AbstractResolverBuilder<T> {
  protected resolverName: string;
  protected responseType: IGqlObjectBuilder | IGqlInterfaceBuilder;
  protected argsType?: IGqlInputBuilder;
  protected mockData: T;
  protected gqlSchemaType: string;

  public setResolverName(name: string) {
    this.resolverName = this.capitalizedFirstLetter(name);
    return this;
  }
  public setResponseType(type: IGqlObjectBuilder | IGqlInterfaceBuilder) {
    this.responseType = type;
    return this;
  }
  public setArgsType(type?: IGqlInputBuilder) {
    this.argsType = type;
    return this;
  }
  public setMockData(data: T) {
    this.mockData = data;
    return this;
  }

  public build() {
    return {
      resolverName: this.resolverName,
      responseType: this.responseType,
      argsType: this.argsType,
      mockData: this.mockData,
    };
  }

  private capitalizedFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
