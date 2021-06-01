import {
  objectType,
  extendType,
  intArg,
  stringArg,
  arg,
  core,
  nonNull,
} from "nexus";

export const Question = objectType({
  name: "Question", // <- Name of your type
  definition(t) {
    t.int("id"); // <- Field named `id` of type `Int`
    t.list.field("translations", {
      type: "QuestionTranslation",
      args: { lang: stringArg() },
      resolve(question, args, ctx) {
        return ctx.db.questionTranslation.findMany({
          where: {
            questionId: { equals: question.id },
            lang: { equals: args.lang },
          },
        });
      },
    });
  },
});

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

export const QuestionQueryByLanguage = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("questions", {
      type: Question,
      args: { lang: stringArg() },
      resolve(root, args, ctx) {
        return ctx.db.question.findMany({
          where: {
            translations: {
              lang: { equals: args.lang },
            },
          },
        });
      },
    });
  },
});

/*
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
*/
