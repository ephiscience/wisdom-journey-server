import { objectType, stringArg } from "nexus";

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
export const QuestionTranslationByLanguage = extendType({
  type: "Question",
  definition: (t) => {
    t.list.field("translation", {
      type: QuestionTranslation,
      args: { lang: stringArg() },
      resolve(root, args, ctx) {
        return ctx.db.questionTranslation.findMany({
          where: {
            questionId: { equals: root.id },
            lang: { equals: args.lang },
          },
        });
      },
    });
  },
});
