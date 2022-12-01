import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import ValidationPlugin from '@pothos/plugin-validation';
import TracingPlugin, {
  wrapResolver,
  isRootField,
} from '@pothos/plugin-tracing';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';

import type PrismaTypes from './schema/types';

import { GraphQLContext } from './schema/context';
import prisma from './database';

type SchemaOptions = {
  PrismaTypes: PrismaTypes;
  Context: GraphQLContext;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
    JSON: {
      Input: any;
      Output: any;
    };
  };
  AuthScopes: {
    isAuthenticated: boolean;
  };
};

const builder = new SchemaBuilder<SchemaOptions>({
  plugins: [
    ErrorsPlugin,
    PrismaPlugin,
    RelayPlugin,
    ValidationPlugin,
    TracingPlugin,
    SimpleObjectsPlugin,
    ScopeAuthPlugin,
  ],
  errorOptions: {
    defaultTypes: [],
  },
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    exposeDescriptions: true,
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
  relayOptions: {
    // These will become the defaults in the next major version
    clientMutationId: 'omit',
    cursorType: 'ID',
  },
  validationOptions: {
    // optionally customize how errors are formatted
    validationError: (zodError, args, context, info) => {
      // the default behavior is to just throw the zod error directly
      return zodError;
    },
  },
  tracing: {
    // Enable tracing for rootFields by default, other fields need to opt in
    default: (config) => isRootField(config),
    // Log resolver execution duration
    wrap: (resolver, options, config) =>
      wrapResolver(resolver, (error, duration) => {
        console.log(
          `Executed resolver ${config.parentType}.${config.name} in ${duration}ms`,
        );
      }),
  },
  authScopes: async (context) => ({
    isAuthenticated: !!context.userId,
  }),
});

builder.queryType({});
builder.mutationType({});

export default builder;
