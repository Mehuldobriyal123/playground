import builder from '../../builder';

builder.mutationType({
  description: 'AdminMutation',
  fields: (t) => ({
    AdminSignIn: t.string({
      args: {
        email: t.arg.string({ required: true }),
        password: t.arg.string({ required: true }),
      },
      resolve: async (root, args, ctx, info) => {
        return 'sign in admin!';
      },
    }),
    AdminSignUp: t.string({
      args: {
        email: t.arg.string({ required: true }),
        password: t.arg.string({ required: true }),
      },
      resolve: async (root, args, ctx, info) => {
        return 'sign up admin!';
      },
    }),
    AdminUpdate: t.string({
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, context) => {
        return 'update admin!';
      },
    }),
  }),
});
