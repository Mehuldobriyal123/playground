import path from 'path';
import { writeFileSync } from 'fs';
import { printSchema, lexicographicSortSchema } from 'graphql';

import builder from '../builder';

import './Admin';
import './Error';
import './scalars';

const schema = builder.toSchema({});

const schemaAsString = printSchema(lexicographicSortSchema(schema));

// Generate an SDL version of our schema.
if (process.env.NODE_ENV !== 'production') {
  writeFileSync(
    path.join(__dirname, '../../generated/schema.graphql'),
    schemaAsString,
  );
}

export default schema;
