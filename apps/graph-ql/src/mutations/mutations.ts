import { Builder } from '../tools/builder';
import { GST } from '../tools/graphTypes';

export const mutations = [
  new Builder()
    .setName('createUser')
    .setArgsType({ name: GST.STRING, email: GST.STRING }) // TypeScript type 'number' will be inferred and converted to 'Int!'
    .setResponseType({ status: GST.INT }) // TypeScript type 'string' will be inferred and converted to 'String!'
    .build<{ status: number }>(
      {
        status: 200,
      },
      true
    ),
];
