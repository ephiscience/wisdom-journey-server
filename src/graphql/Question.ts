import { objectType, extendType, intArg, stringArg, nonNull } from "nexus";

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
        const translation = await ctx.db.questionTranslation.findFirst({
          where: { questionId: question.id, lang: args.lang },
        });

        if (translation) {
          return translation.translation;
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
      resolve(_root, { lang }, { db }) {
        if (lang) {
          return db.question.findMany({
            where: {
              translations: {
                some: {
                  lang: lang!, // TODO: Remove the `!`
                },
              },
            },
          });
        } else {
          return db.question.findMany();
        }
      },
    });

    t.field("question", {
      type: Question,
      args: { id: nonNull(intArg()) },
      resolve(_root, { id }, { db }) {
        return db.question.findUnique({
          where: { id },
        });
      },
    });
  },
});
