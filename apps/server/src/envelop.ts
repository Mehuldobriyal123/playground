import { envelop, useSchema } from '@envelop/core';
import { useGraphQlJit } from '@envelop/graphql-jit';
import { useParserCache } from '@envelop/parser-cache';
import { useValidationCache } from '@envelop/validation-cache';
import { useResponseCache } from '@envelop/response-cache';
import { useDisableIntrospection } from '@envelop/disable-introspection';

import schema from './schema/';

const getEnveloped = envelop({
  plugins: [
    useSchema(schema),
    useGraphQlJit(),
    useValidationCache(),
    useParserCache(),
    useResponseCache({
      ttl: 2000,
      includeExtensionMetadata: true,
      session: (context) => String(context.user?.id),
    }),
    // Return true for disabling the introspection for the incoming operation, or false to allow introspection.
    useDisableIntrospection({
      disableIf: () => false,
    }),
  ],
});

export default getEnveloped;
