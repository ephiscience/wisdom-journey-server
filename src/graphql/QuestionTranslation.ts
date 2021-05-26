import { objectType } from "nexus";

export const QuestionTranslation = objectType({
  name: "QuestionTranslation", // <- Name of your type
  definition(t) {
    t.int("id"); // <- Field named `id` of type `Int`
    t.string("lang");
    t.string("translation");
    t.int("questionid"); //question???
  },
});

import { extendType } from "nexus";

export const QuestionTranslationQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("translation", {
      type: QuestionTranslation,
      resolve(_root, _args, ctx) {
        return ctx.db.questionTranslation.findMany();
      },
    });
  },
});
