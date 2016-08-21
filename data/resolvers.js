import customDateTimeScalar from './resolvers/customDateTimeScalar';

const resolveFunctions = {
  RootQuery: {
    user() {
      return null;
    },

    users() {
      return null;
    },
  },

  User: {
    events() {
      return null;
    },
  },

  RootMutation: {
    updateUser(_, { id, name }) {
      return new Promise((resolve) => {
        return resolve({ name, id });
      });
    }
  }
};

export default Object.assign(resolveFunctions, customDateTimeScalar);
