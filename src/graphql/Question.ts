import { objectType } from "nexus";

export const Question = objectType({
  name: "Question", // <- Name of your type
  definition(t) {
    t.int("id"); // <- Field named `id` of type `Int`
  },
});

import { extendType } from "nexus";

export const QuestionQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("questions", {
      type: Question,
      resolve(_root, _args, ctx) {
        return ctx.db.question.findMany();
      },
    });
  },
});
