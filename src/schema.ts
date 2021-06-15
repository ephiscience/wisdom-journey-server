import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql";

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, "generated", "nexus-typegen.ts"),
    schema: join(__dirname, "generated", "schema.graphql"),
  },
  sourceTypes: {
    modules: [{ module: ".prisma/client", alias: "P" }],
  },
  contextType: {
    module: join(__dirname, "./context.ts"),
    export: "Context",
  },
});
