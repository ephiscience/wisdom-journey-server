import { objectType } from "nexus";

export const CriterionTranslation = objectType({
  name: "CriterionTranslation", // <- Name of your type
  definition(t) {
    t.int("id"); // <- Field named `id` of type `Int`
    t.string("lang");
    t.string("title");
    t.string("subtitle");
    t.string("icon");
    t.int("criterionid"); //question???
  },
});
