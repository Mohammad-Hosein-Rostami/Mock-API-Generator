import { Builder } from '../tools/builder';
import { GST } from '../tools/graphTypes';

export const queries = [
  new Builder()
    .setName('getUser')
    .setArgsType({ name: GST.STRING, email: GST.STRING }) // TypeScript type 'number' will be inferred and converted to 'Int!'
    .setResponseType({ id: GST.ID, name: GST.STRING, email: GST.STRING }) // TypeScript type 'string' will be inferred and converted to 'String!'
    .build<{ id: number; name: string; email: string }>(
      {
        id: 2,
        name: 'mock name',
        email: 'mock@email.com',
      },
      false
    ),
];
