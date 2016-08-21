const User = `
  type User {
    id: ID!
    name: String
    firstName: String
    lastName: String
    age: Int
    events: [Event]
  }
`;

export default () => [User];
