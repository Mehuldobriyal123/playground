import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import builder from '../../builder';

import { AdminType } from './AdminType';
import { MutationError } from '../Error';

builder.relayMutationField(
  'AdminSignIn',
  {
    inputFields: (t) => ({
      email: t.string({ required: true }),
      password: t.string({ required: true }),
    }),
  },
  {
    errors: { types: [MutationError] },
    resolve: async (root, args, ctx) => {
      const admin = await ctx.prisma.admin.findUnique({
        where: {
          email: args.input.email,
        },
      });

      if (!admin) {
        throw new MutationError('Admin does not exist!');
      }

      const isPasswordValid = await bcrypt.compare(
        args.input.password,
        admin.password,
      );

      if (!isPasswordValid) {
        throw new MutationError('Password is invalid');
      }

      const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET!);

      return { admin, token };
    },
  },
  {
    outputFields: (t) => ({
      admin: t.field({
        type: AdminType,
        resolve: (result) => result.admin,
      }),
      token: t.string({
        resolve: (result) => result.token,
      }),
    }),
  },
);

builder.relayMutationField(
  'AdminSignUp',
  {
    inputFields: (t) => ({
      firstName: t.string({ required: true }),
      lastName: t.string({ required: true }),
      phone: t.string({ required: true }),
      country: t.string({ required: true }),
      email: t.string({ required: true }),
      password: t.string({ required: true }),
    }),
  },
  {
    errors: { types: [MutationError] },
    resolve: async (root, args, ctx) => {
      const adminExists = await ctx.prisma.admin.findUnique({
        where: {
          email: args.input.email,
        },
      });

      if (adminExists) {
        throw new MutationError(
          'An user with this email address already exist!',
        );
      }

      const hashedPassword = await bcrypt.hash(args.input.password, 10);

      const admin = await ctx.prisma.admin.create({
        data: {
          ...args.input,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET!);

      return { admin, token };
    },
  },
  {
    outputFields: (t) => ({
      admin: t.field({
        type: AdminType,
        resolve: (result) => result.admin,
      }),
      token: t.string({
        resolve: (result) => result.token,
      }),
    }),
  },
);

builder.relayMutationField(
  'AdminUpdate',
  {
    inputFields: (t) => ({
      id: t.globalID({ required: true }),
      firstName: t.string({ required: true }),
      lastName: t.string({ required: true }),
      phone: t.string({ required: true }),
      country: t.string({ required: true }),
      postal_code: t.string({ required: false }),
      website: t.string({ required: false }),
      twitter: t.string({ required: false }),
      username: t.string({ required: false }),
    }),
  },
  {
    errors: { types: [MutationError] },
    authScopes: {
      isAuthenticated: true,
    },
    resolve: async (root, args, ctx) => {
      const { id } = args.input.id;

      const admin = await ctx.prisma.admin.findUnique({
        where: { id },
      });

      if (!admin) {
        throw new MutationError('Admin does not exist!');
      }

      if (args.input.username) {
        const adminUsernameIsAlreadyTaken = await ctx.prisma.admin.findUnique({
          where: {
            username: args.input.username,
          },
        });

        if (adminUsernameIsAlreadyTaken) {
          throw new MutationError('Admin username is already taken!');
        }
      }

      const updatedAdmin = await ctx.prisma.admin.update({
        where: { id },
        data: {
          ...args.input,
          id,
        },
      });

      const token = jwt.sign(
        { userId: updatedAdmin.id },
        process.env.JWT_SECRET!,
      );

      return { admin, token };
    },
  },
  {
    outputFields: (t) => ({
      admin: t.field({
        type: AdminType,
        resolve: (result) => result.admin,
      }),
      token: t.string({
        resolve: (result) => result.token,
      }),
    }),
  },
);

builder.relayMutationField(
  'AdminResetPassword',
  {
    inputFields: (t) => ({
      email: t.string({ required: true }),
    }),
  },
  {
    errors: { types: [MutationError] },
    resolve: async (root, args, ctx) => {
      const admin = await ctx.prisma.admin.findUnique({
        where: {
          email: args.input.email,
        },
      });

      if (!admin) {
        throw new MutationError('Admin does not exist!');
      }

      // Send email to admin be able to reset his password.

      const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET!);

      return { admin, token };
    },
  },
  {
    outputFields: (t) => ({
      admin: t.field({
        type: AdminType,
        resolve: (result) => result.admin,
      }),
      token: t.string({
        resolve: (result) => result.token,
      }),
    }),
  },
);

builder.relayMutationField(
  'AdminChangePassword',
  {
    inputFields: (t) => ({
      email: t.string({ required: true }),
      currentPassword: t.string({ required: true }),
      newPassword: t.string({ required: true }),
    }),
  },
  {
    errors: { types: [MutationError] },
    resolve: async (root, args, ctx) => {
      const admin = await ctx.prisma.admin.findUnique({
        where: {
          email: args.input.email,
        },
      });

      if (!admin) {
        throw new MutationError('Admin does not exist!');
      }

      const isPasswordValid = await bcrypt.compare(
        args.input.currentPassword,
        admin.password,
      );

      if (!isPasswordValid) {
        throw new MutationError('Password is incorrect');
      }

      const newHashedPassword = await bcrypt.hash(args.input.newPassword, 10);

      const updatedAdmin = await ctx.prisma.admin.update({
        where: {
          email: args.input.email,
        },
        data: {
          password: newHashedPassword,
        },
      });

      const token = jwt.sign(
        { userId: updatedAdmin.id },
        process.env.JWT_SECRET!,
      );

      return { admin: updatedAdmin, token };
    },
  },
  {
    outputFields: (t) => ({
      admin: t.field({
        type: AdminType,
        resolve: (result) => result.admin,
      }),
      token: t.string({
        resolve: (result) => result.token,
      }),
    }),
  },
);

builder.relayMutationField(
  'AdminDelete',
  {
    inputFields: (t) => ({
      id: t.globalID({ required: true }),
    }),
  },
  {
    errors: { types: [MutationError] },
    authScopes: {
      isAuthenticated: true,
    },
    resolve: async (root, args, ctx) => {
      const { id } = args.input.id;

      const admin = await ctx.prisma.admin.findUnique({
        where: {
          id,
        },
      });

      if (!admin) {
        throw new MutationError('Admin does not exist!');
      }

      const deletedAdmin = await ctx.prisma.admin.delete({
        where: {
          id,
        },
      });

      return { admin: deletedAdmin, token: '' };
    },
  },
  {
    outputFields: (t) => ({
      admin: t.field({
        type: AdminType,
        resolve: (result) => result.admin,
      }),
      token: t.string({
        resolve: (result) => result.token,
      }),
    }),
  },
);
