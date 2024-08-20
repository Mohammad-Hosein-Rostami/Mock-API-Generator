import { QueryBuilder } from '../../tools';
import { input, object } from '../../types/graphql/examples';

export const query = new QueryBuilder<{ field1: string; field2: string }>()
  .setResolverName('GetFields')
  .setArgsType(input)
  .setResponseType(object)
  .setMockData({ field1: 'field1 data', field2: 'field2 data' })
  .build();
