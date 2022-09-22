/* eslint-disable */
import type { Prisma, Admin } from '@prisma/client';
export default interface PrismaTypes {
  Admin: {
    Name: 'Admin';
    Shape: Admin;
    Include: never;
    Select: Prisma.AdminSelect;
    OrderBy: Prisma.AdminOrderByWithRelationAndSearchRelevanceInput;
    WhereUnique: Prisma.AdminWhereUniqueInput;
    Where: Prisma.AdminWhereInput;
    RelationName: never;
    ListRelations: never;
    Relations: {};
  };
}
