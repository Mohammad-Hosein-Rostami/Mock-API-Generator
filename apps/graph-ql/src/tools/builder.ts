export class Builder {
  private name: string | undefined;

  private argsType: { [key: string]: string | { [key: string]: string } } = {};

  private responseType: { [key: string]: string | { [key: string]: string } } =
    {};

  private mockData: any;

  setName(name: string): Builder {
    this.name = name;
    return this;
  }

  setArgsType(argsType: typeof this.argsType): Builder {
    this.argsType = argsType;
    return this;
  }

  setResponseType(responseType: typeof this.argsType): Builder {
    this.responseType = responseType;
    return this;
  }

  build<T>(
    mockData: T,
    isMutation = false
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): {
    query: string;
    responseType: string;
    argsType: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    resolver: Function;
  } {
    this.mockData = mockData;

    const operationType = isMutation ? 'Mutation' : 'Query';
    const argsTypeName = `${this.capitalizeFirstLetter(
      this.name
    )}Args${operationType}`;
    const responseTypeName = `${this.capitalizeFirstLetter(
      this.name
    )}Response${operationType}`;

    const argsTypeStr = `${'input'} ${argsTypeName} {\n  ${this.convertToGraphQLTypeString(
      this.argsType
    )}\n}`;
    const responseTypeStr = `type ${responseTypeName} {\n  ${this.convertToGraphQLTypeString(
      this.responseType
    )}\n}`;

    const queryStr = `${this.name}(args: ${argsTypeName}): ${responseTypeName}`;

    // Resolver function
    const resolver = () => this.mockData;

    return {
      query: queryStr,
      responseType: responseTypeStr,
      argsType: argsTypeStr,
      resolver,
    };
  }

  private convertToGraphQLTypeString(
    typeObj: { [key: string]: string | { [key: string]: string } } = {}
  ): string {
    return Object.entries(typeObj)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}: ${this.getGraphQLType(value)}`;
        }
        if (typeof value === 'object') {
          const nestedType = this.convertToGraphQLTypeString(value);
          return `${key}: { ${nestedType} }`;
        }
        return `${key}: String`; // Default fallback
      })
      .join('\n  ');
  }

  private getGraphQLType(type: string): string {
    const typeMapping: { [key: string]: string } = {
      'GST.ID': 'ID!',
      'GST.STRING': 'String!',
      'GST.INT': 'Int',
      'GST.FLOAT': 'Float',
      'GST.BOOLEAN': 'Boolean!',
      'GST.OBJECT': 'Object',
    };

    return typeMapping[type] || 'String';
  }

  private capitalizeFirstLetter(
    string: string | undefined
  ): string | undefined {
    if (!string) return;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
