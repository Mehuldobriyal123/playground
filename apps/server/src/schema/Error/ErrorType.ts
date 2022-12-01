import builder from '../../builder';

export const ErrorInterface = builder.interfaceRef<Error>('Error').implement({
  fields: (t) => ({
    message: t.exposeString('message'),
  }),
});

export class MutationError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

builder.objectType(Error, {
  name: 'BaseError',
  interfaces: [ErrorInterface],
});

builder.objectType(MutationError, {
  name: 'MutationError',
  interfaces: [ErrorInterface],
});
