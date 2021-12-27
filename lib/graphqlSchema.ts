import { makeExecutableSchema } from "@graphql-tools/schema";
import * as resolvers from "./graphqlResolvers";
import { typeDefs } from "./graphqlTypeDefs";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
