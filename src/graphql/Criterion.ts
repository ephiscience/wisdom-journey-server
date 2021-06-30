import { objectType, extendType, stringArg, nonNull } from "nexus";

export const Criterion = objectType({
  name: "Criterion",
  definition(t) {
    t.int("id");
    t.string("icon");
    t.list.field("translations", {
      type: "CriterionTranslation",
      args: { lang: stringArg() },
      resolve(criterion, args, ctx) {
        return ctx.db.criterionTranslation.findMany({
          where: {
            criterionId: criterion.id,
            lang: args.lang!, // TODO: Remove the `!`
          },
        });
      },
    });
    t.string("title", {
      args: { lang: nonNull(stringArg()) },
      async resolve(criterion, args, ctx) {
        const translation = await ctx.db.criterionTranslation.findFirst({
          where: { criterionId: criterion.id, lang: args.lang },
        });

        if (translation) {
          return translation.title;
        } else {
          return null;
        }
      },
    });
    t.string("subtitle", {
      args: { lang: nonNull(stringArg()) },
      async resolve(criterion, args, ctx) {
        const translation = await ctx.db.criterionTranslation.findFirst({
          where: { criterionId: criterion.id, lang: args.lang },
        });

        if (translation) {
          return translation.subtitle;
        } else {
          return null;
        }
      },
    });
  },
});

export const CriterionQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("criterions", {
      type: nonNull(Criterion),
      args: { lang: stringArg() },
      resolve(root, args, ctx) {
        if (args.lang) {
          return ctx.db.criterion.findMany({
            where: {
              translations: {
                some: {
                  lang: args.lang!, // TODO: Remove the `!`
                },
              },
            },
          });
        } else {
          return ctx.db.criterion.findMany();
        }
      },
    });
  },
});
