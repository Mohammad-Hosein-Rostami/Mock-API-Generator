import { MutationBuilder } from '../../tools';
import { input, object } from '../../types/graphql/examples';

export const mutation = new MutationBuilder<{
  field1: string;
  field2: string;
}>()
  .setResolverName('UpdateField')
  .setArgsType(input)
  .setResponseType(object)
  .setMockData({ field1: 'field1 data', field2: 'field2 data' })
  .setResponseType(object)
  .build();
