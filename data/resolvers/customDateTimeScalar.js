import { Kind } from 'graphql/language';
import { GraphQLError } from 'graphql-tools';

// borrowed from: github.com/soundtrackyourbrand/graphql-custom-datetype/blob/master/datetype.js
function coerceDate(value) {
  if (!(value instanceof Date)) {
    // Is this how you raise a 'field error'?
    throw new Error('Field error: value is not an instance of Date');
  }
  if (isNaN(value.getTime())) {
    throw new Error('Field error: value is an invalid Date');
  }
  return value.toJSON();
}

const customDateTimeScalar = {
  // custom scalars
  DateTime: {
    // value from the client
    __parseValue(value) {
      return coerceDate(value);
    },

    // value sent to the client
    __serialize(value) {
      return coerceDate(value);
    },

    __parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) {
        const errMsg = 'Query error: Can only parse strings to dates but got a: ';
        throw new GraphQLError(errMsg + ast.kind, [ast]);
      }
      const result = new Date(ast.value);
      if (isNaN(result.getTime())) {
        throw new GraphQLError('Query error: Invalid date', [ast]);
      }
      if (ast.value !== result.toJSON()) {
        const errMsg = 'Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ';
        throw new GraphQLError(errMsg, [ast]);
      }
      return result;
    }
  }
};

export default customDateTimeScalar;
