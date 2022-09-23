import builder from '../../builder';

builder.queryFields((t) => ({
  admin: t.prismaField({
    type: 'Admin',
    args: {
      id: t.arg.string({ required: true }),
    },
    errors: {
      types: [Error],
    },
    resolve: async (query, root, args, ctx, info) => {
      return await ctx.prisma.admin.findUniqueOrThrow({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
