/**
 * @generated SignedSource<<11bdf7d7ab4ccd9e40f1fd4bce067f42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AdminSignInInput = {
  email: string;
  password: string;
};
export type SignInMutation$variables = {
  input: AdminSignInInput;
};
export type SignInMutation$data = {
  readonly AdminSignIn: {
    readonly admin: {
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
export type SignInMutation = {
  response: SignInMutation$data;
  variables: SignInMutation$variables;
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
        name: 'AdminSignIn',
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
      name: 'SignInMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'SignInMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: '160cbc85da18d062d8dfc9eb377fd42a',
      id: null,
      metadata: {},
      name: 'SignInMutation',
      operationKind: 'mutation',
      text: 'mutation SignInMutation(\n  $input: AdminSignInInput!\n) {\n  AdminSignIn(input: $input) {\n    token\n    error\n    admin {\n      id\n      firstName\n      lastName\n      email\n      phone\n    }\n  }\n}\n',
    },
  };
})();

(node as any).hash = '0d8925e6f811d7e3152e03f3c6608483';

export default node;
