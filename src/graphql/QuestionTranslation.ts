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
