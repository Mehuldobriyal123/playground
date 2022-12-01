import path from 'path';
import { writeFileSync } from 'fs';
import { printSchema, lexicographicSortSchema } from 'graphql';

import schema from '../schema';

const schemaAsString = printSchema(lexicographicSortSchema(schema));

// Generate an SDL version of our schema.
if (process.env.NODE_ENV !== 'production') {
  writeFileSync(
    path.join(__dirname, '../../generated/schema.graphql'),
    schemaAsString,
  );
} else {
}
