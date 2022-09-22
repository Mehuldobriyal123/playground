import builder from '../../builder';

builder.prismaObject('Admin', {
  findUnique: (admin) => ({ id: admin.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    email: t.exposeString('email'),
    phone: t.exposeString('phone'),
    country: t.exposeString('country'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
