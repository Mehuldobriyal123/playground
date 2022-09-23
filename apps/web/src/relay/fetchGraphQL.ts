import {
  RequestParameters,
  Variables,
  FetchFunction,
  Observable,
} from 'relay-runtime';
import fetch from 'isomorphic-fetch';

import { getToken } from 'src/utils/auth';

const API_ENDPOINT =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8080/graphql'
    : `${process.env.REACT_APP_API_ENDPOINT}`;

const fetchGraphQL: FetchFunction = (
  request: RequestParameters,
  variables: Variables,
) => {
  return Observable.create((source) => {
    const authorization = getToken();

    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: request.text,
        variables,
      }),
    })
      .then((response) => response.json())
      .then((data) => source.next(data));
  });
};

export default fetchGraphQL;
