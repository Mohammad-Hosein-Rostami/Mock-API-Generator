import { GraphQlTypesEnum, GraphQlTypesRequiredEnum } from '../../../enums';
import { IGqlObjectBuilder } from './gql-object-builder';

export type TObject = IGqlObjectBuilder;
export type TList = IGqlObjectBuilder | GraphQlTypesEnum;

export type TField =
  | { object: TObject; isOptional?: boolean }
  | GraphQlTypesEnum
  | GraphQlTypesRequiredEnum
  | { list: TList; isOptional?: boolean };

export type TFields = {
  [key: string]: TField;
};

export interface IAbstractGraphQlTypeBuilder {
  typeName: string;
  fields: TFields;
  gqlTypeSchema: string;
}

export class AbstractGraphQlTypeBuilder {
  protected typeName: string;
  protected fields: TFields = {}; // Stores fields and their types
  protected currentField: string;
  protected gqlTypeSchema: string;

  // set structure
  public setName(typeName: string) {
    this.typeName = this.capitalizedFirstLetter(typeName);
    return this;
  }

  public setNewField(fieldName: string) {
    this.fields[fieldName] = {} as any;
    this.currentField = fieldName;
    return this;
  }

  // GraphQL types
  public isString(isOptional = false) {
    return this.setFieldType(
      isOptional
        ? GraphQlTypesEnum.STRING
        : GraphQlTypesRequiredEnum.STRING_REQUIRED
    );
  }

  public isNumber(isOptional = false) {
    return this.setFieldType(
      isOptional ? GraphQlTypesEnum.INT : GraphQlTypesRequiredEnum.INT_REQUIRED
    );
  }

  public isId(isOptional = false) {
    return this.setFieldType(
      isOptional ? GraphQlTypesEnum.ID : GraphQlTypesRequiredEnum.ID_REQUIRED
    );
  }

  public isFloat(isOptional = false) {
    return this.setFieldType(
      isOptional
        ? GraphQlTypesEnum.FLOAT
        : GraphQlTypesRequiredEnum.FLOAT_REQUIRED
    );
  }

  public isBoolean(isOptional = false) {
    return this.setFieldType(
      isOptional
        ? GraphQlTypesEnum.BOOLEAN
        : GraphQlTypesRequiredEnum.BOOLEAN_REQUIRED
    );
  }

  public isDate(isOptional = false) {
    return this.setFieldType(
      isOptional
        ? GraphQlTypesEnum.DATE
        : GraphQlTypesRequiredEnum.DATE_REQUIRED
    );
  }

  public isList(type: TList, isOptional = false) {
    return this.setFieldType({ list: type, isOptional });
  }

  public isObject(type: TObject, isOptional = false) {
    return this.setFieldType({ object: type, isOptional });
  }

  // helper method to set the field type
  private setFieldType(type: TField) {
    if (this.currentField) {
      this.fields[this.currentField] = type;
    }
    return this;
  }

  private capitalizedFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Type guard to check if a field is an object
  private isObjectField(
    field: TField | TList
  ): field is { object: TObject; isOptional?: boolean } {
    return typeof field === 'object' && 'object' in field;
  }

  // Type guard to check if a field is a list
  private isListField(
    field: TField
  ): field is { list: TList; isOptional?: boolean } {
    return typeof field === 'object' && 'list' in field;
  }

  // Method to generate the gqlTypeSchema
  protected generateGqlTypeSchema(type: 'input' | 'object' | 'interface') {
    const fieldsSchema = Object.entries(this.fields)
      .map(([fieldName, fieldType]) => {
        let gqlFieldType: string;

        if (this.isObjectField(fieldType)) {
          gqlFieldType = fieldType.object.typeName;
          gqlFieldType += fieldType.isOptional ? '' : '!';
        } else if (this.isListField(fieldType)) {
          const listType =
            typeof fieldType.list === 'object'
              ? (fieldType.list as TObject).typeName // Extract typeName from TObject
              : (fieldType.list as GraphQlTypesEnum);

          gqlFieldType = `[${listType}]${fieldType.isOptional ? '' : '!'}`;
        } else {
          gqlFieldType = `${fieldType}`;
        }

        return `  ${fieldName}: ${gqlFieldType}`;
      })
      .join('\n');

    this.gqlTypeSchema = `${
      type === 'object' ? 'type' : type
    } ${this.capitalizedFirstLetter(this.typeName)} {\n${fieldsSchema}\n}`;

    return this;
  }

  // build type obj
  public build(): IAbstractGraphQlTypeBuilder {
    this.generateGqlTypeSchema('object');
    return {
      typeName: this.typeName,
      fields: this.fields,
      gqlTypeSchema: this.gqlTypeSchema,
    };
  }
}
