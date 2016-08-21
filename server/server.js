import Koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import koaCors from 'koa-cors';
import convert from 'koa-convert';
import { apolloKoa, graphiqlKoa } from 'apollo-server';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
// data
import Schema from '../data/schema';
import Resolvers from '../data/resolvers';
import Mocks from '../data/mocks';

const isDeveloping = true;
const GRAPHQL_PORT = process.env.PORT || 8080;

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  allowUndefinedInResolve: true
});

if (isDeveloping) {
  addMockFunctionsToSchema({
    schema: executableSchema,
    mocks: Mocks,
    preserveResolvers: false
  });
}

const app = new Koa();
const router = koaRouter();

app.use(convert(koaBody()));
app.use(convert(koaCors()));

router.post('/graphql', apolloKoa({
  schema: executableSchema,
}));

router.get('/graphiql', graphiqlKoa({
  endpointURL: '/graphql',
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
