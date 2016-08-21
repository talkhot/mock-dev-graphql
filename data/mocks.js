import { MockList } from 'graphql-tools';
import casual from 'casual-browserify';

const mocks = {
  Int: () => casual.integer(1, 1000),

  Event: () => ({
    name: `${casual.city} Music Festival`,
  }),

  User: () => ({
    age: casual.integer(1, 99),
    name: casual.full_name,
    // get the names from the fullname
    firstName: (user) => user.name.split(' ')[0],
    lastName: (user) => user.name.split(' ')[1],
    events: () => new MockList([1, 3]),
  }),

  RootQuery: () => ({
    // return a user whose id matches that of the request
    user: (o, { id }) => ({ id }),
    // return a list with x-number or mock users in it
    users: (o, { num }) => new MockList(num),
  })
};

export default mocks;
