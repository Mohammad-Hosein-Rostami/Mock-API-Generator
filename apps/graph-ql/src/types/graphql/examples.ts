import * as GqlTypeBuilders from '../../tools/builders';

export const input = new GqlTypeBuilders.GqlInputBuilder()
  .setName('InputType')
  .setNewField('field1')
  .isId()
  .setNewField('field2')
  .isBoolean()
  .build();

export const object = new GqlTypeBuilders.GqlObjectBuilder()
  .setName('ObjectType')
  .setNewField('field1')
  .isString()
  .setNewField('field2')
  .isString(true)
  .build();
