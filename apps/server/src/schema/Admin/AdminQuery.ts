import builder from '../../builder';

builder.queryFields((t) => ({
  me: t.prismaField({
    type: 'Admin',
    nullable: true,
    resolve: async (query, root, args, ctx, info) => {
      if (!ctx.userId) {
        return null;
      }

      return await ctx.prisma.admin.findUnique({
        ...query,
        where: { id: ctx.userId },
      });
    },
  }),
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
  admins: t.prismaConnection({
    type: 'Admin',
    cursor: 'id',
    args: {
      firstName: t.arg.string({ required: false }),
      lastName: t.arg.string({ required: false }),
      email: t.arg.string({ required: false }),
      phone: t.arg.string({ required: false }),
      country: t.arg.string({ required: false }),
      postal_code: t.arg.string({ required: false }),
      website: t.arg.string({ required: false }),
      twitter: t.arg.string({ required: false }),
      username: t.arg.string({ required: false }),
    },
    authScopes: {
      isAuthenticated: true,
    },
    resolve: async (query, root, args, ctx, info) => {
      return await ctx.prisma.admin.findMany({
        ...query,
        where: {
          firstName: {
            contains: args?.firstName ? args?.firstName : undefined,
          },
          lastName: {
            contains: args?.lastName ? args?.lastName : undefined,
          },
          email: {
            contains: args?.email ? args?.email : undefined,
          },
          phone: {
            contains: args?.phone ? args?.phone : undefined,
          },
          country: {
            contains: args?.country ? args?.country : undefined,
          },
          postal_code: {
            contains: args?.postal_code ? args?.postal_code : undefined,
          },
          website: {
            contains: args?.website ? args?.website : undefined,
          },
          twitter: {
            contains: args?.twitter ? args?.twitter : undefined,
          },
          username: {
            contains: args?.username ? args?.username : undefined,
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
    },
  }),
}));
