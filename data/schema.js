import User from './schemas/user.js';
import Event from './schemas/event.js';
import Scalars from './schemas/Scalars';

const RootMutation = `
  type RootMutation {
    updateUser (
      id: ID!
      name: String
    ): User
  }
`;

const RootQuery = `
  type RootQuery {
    # they are reslove function and don't need to match our type User
    user(id: ID!): User
    users(num: Int): [User]
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [
  SchemaDefinition,
  RootMutation,
  RootQuery,
  Scalars,
  User,
  Event
];
