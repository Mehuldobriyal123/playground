import dotenv from 'dotenv';
import fastify from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config';
import {
  getGraphQLParameters,
  processRequest,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix';
import { renderPlaygroundPage } from 'graphql-playground-html';
import { Novu } from '@novu/node';

import getEnveloped from './envelop';
import { contextFactory } from './schema/context';

dotenv.config();

const app = fastify();

const novu = new Novu(`${process.env.NOVU_API_KEY}`);

app.register(cors, {
  origin: '*',
});

app.route({
  method: ['GET', 'PUT', 'POST'],
  url: '/graphql',
  async handler(req, res) {
    const { parse, validate, execute, schema } = getEnveloped({
      req,
    });

    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query,
    };

    if (shouldRenderGraphiQL(request)) {
      res.type('text/html');
      res.send(
        renderPlaygroundPage({
          endpoint: '/graphql',
        }),
      );
    } else {
      const { operationName, query, variables } = getGraphQLParameters(request);

      const result = await processRequest({
        operationName,
        query,
        variables,
        request,
        schema,
        parse,
        validate,
        execute,
        contextFactory: () => contextFactory(req, novu),
      });

      for (const [key, value] of Object.entries(res.getHeaders())) {
        res.raw.setHeader(key, String(value || ''));
      }

      sendResult(result, res.raw);

      // Tell fastify a response was sent
      res.hijack();
    }
  },
});

app.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  console.log(`GraphQL server is running.`);
});
