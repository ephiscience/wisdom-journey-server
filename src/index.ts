import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ConnectionOptions, createConnection } from "typeorm";
import { QuestionResolver } from "./resolvers/QuestionResolver";

async function main() {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [QuestionResolver],
  });

  const server = new ApolloServer({ schema });

  return server.listen(4000);
}

main().then(() => {
  console.log("Server has started!");
});
