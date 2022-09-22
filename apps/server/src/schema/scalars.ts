import { GraphQLJSON } from 'graphql-scalars';

import builder from '../builder';

builder.scalarType('JSON', {
  serialize: GraphQLJSON.serialize,
  parseValue: GraphQLJSON.parseValue,
});

builder.scalarType('DateTime', {
  serialize: (value) => value.toJSON(),
  parseValue: (value) => {
    if (typeof value === 'string') {
      return new Date(value);
    } else {
      throw new Error(`Invalid DateTime: ${value}`);
    }
  },
});
