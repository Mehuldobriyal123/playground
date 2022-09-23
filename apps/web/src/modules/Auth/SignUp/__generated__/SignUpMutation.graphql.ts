/**
 * @generated SignedSource<<5ae2ecb8b691be4cdbe093d3215fb195>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AdminSignUpInput = {
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
};
export type SignUpMutation$variables = {
  input: AdminSignUpInput;
};
export type SignUpMutation$data = {
  readonly AdminSignUp: {
    readonly admin: {
      readonly country: string;
      readonly email: string;
      readonly firstName: string;
      readonly id: string;
      readonly lastName: string;
      readonly phone: string;
    } | null;
    readonly error: string | null;
    readonly token: string | null;
  } | null;
};
export type SignUpMutation = {
  response: SignUpMutation$data;
  variables: SignUpMutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'input',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'AdminMutationPayload',
        kind: 'LinkedField',
        name: 'AdminSignUp',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'token',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'error',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            concreteType: 'Admin',
            kind: 'LinkedField',
            name: 'admin',
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'id',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'firstName',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'lastName',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'email',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'phone',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'country',
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'SignUpMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'SignUpMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: '632cb8382c6f38fc24b6fa3de71ae53a',
      id: null,
      metadata: {},
      name: 'SignUpMutation',
      operationKind: 'mutation',
      text: 'mutation SignUpMutation(\n  $input: AdminSignUpInput!\n) {\n  AdminSignUp(input: $input) {\n    token\n    error\n    admin {\n      id\n      firstName\n      lastName\n      email\n      phone\n      country\n    }\n  }\n}\n',
    },
  };
})();

(node as any).hash = 'dc0e2a5f442897fc8a7697ed9ccb3dcd';

export default node;
