import builder from '../../builder';

export const AdminType = builder.prismaNode('Admin', {
  findUnique: (id) => ({ id }),
  id: { resolve: (admin) => admin.id },
  fields: (t) => ({
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    email: t.exposeString('email'),
    phone: t.exposeString('phone'),
    country: t.exposeString('country'),
    postal_code: t.exposeString('postal_code', { nullable: true }),
    website: t.exposeString('website', { nullable: true }),
    twitter: t.exposeString('twitter', { nullable: true }),
    username: t.exposeString('username', { nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
