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
  name: "Question",
  definition(t) {
    t.int("id");
    t.list.field("translations", {
      type: "QuestionTranslation",
      args: { lang: stringArg() },
      resolve(question, args, ctx) {
        return ctx.db.questionTranslation.findMany({
          where: {
            questionId: question.id,
            lang: args.lang!, // TODO: Remove the `!`
          },
        });
      },
    });

    t.string("text", {
      args: { lang: nonNull(stringArg()) },
      async resolve(question, args, ctx) {
        const q = await ctx.db.questionTranslation.findFirst({
          where: { questionId: question.id, lang: args.lang },
        });

        if (q) {
          return q.translation;
        } else {
          return null;
        }
      },
    });
  },
});

export const QuestionQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("questions", {
      type: nonNull(Question),
      args: { lang: stringArg() },
      resolve(root, args, ctx) {
        if (args.lang) {
          return ctx.db.question.findMany({
            where: {
              translations: {
                some: {
                  lang: args.lang!, // TODO: Remove the `!`
                },
              },
            },
          });
        } else {
          return ctx.db.question.findMany();
        }
      },
    });
  },
});
