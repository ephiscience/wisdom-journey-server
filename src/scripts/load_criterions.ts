import csv from "csv-parser";
import fs from "fs";
import { PrismaClient, Criterion, CriterionTranslation } from "@prisma/client";

//const csv = require('csv-parser')
const results: { [k: string]: string }[] = [];

fs.createReadStream(__dirname + "/../../resources/i18n_criterions.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    //console.log(results); // see results
  });

const prisma = new PrismaClient();

async function createCriterion(): Promise<Criterion> {
  const criterion = await prisma.criterion.create({
    data: {},
  });
  return criterion;
}

async function addTranslation(
  criterion: Criterion,
  lang: string,
  title: string,
  subtitle: string
): Promise<void> {
  const newtranslation = await prisma.criterionTranslation.create({
    data: {
      lang: lang,
      title: title,
      subtitle: subtitle,
      criterionId: criterion.id,
    },
  });
}

async function main() {
  // remove previous questions
  const deleteCriterionTranslations =
    await prisma.criterionTranslation.deleteMany({});
  const deleteCriterion = await prisma.criterion.deleteMany({});
  //const deleteQuestionTexts = await prisma.questionText.deleteMany({});

  for (var i = 0; i < results.length; i++) {
    let translations = [];
    let langs = Object.keys(results[i]);
    //console.log(langs);

    for (var j = 0; j < Object.keys(results[i]).length; j = j + 2) {
      //console.log(j, j + 1);
      let title = results[i][langs[j]];
      let subtitle = results[i][langs[j + 1]];
      let lang = langs[j].toLowerCase().slice(0, 2);
      //console.log(lang, title, subtitle);
      if (title && title != "" && subtitle && subtitle != "") {
        translations.push({ lang, title, subtitle });
      }
    }
    //console.log(translations);
    if (translations.length) {
      const criterion = await createCriterion();
      translations.forEach(({ lang, title, subtitle }) =>
        addTranslation(criterion, lang, title, subtitle)
      );
    }
  }

  console.log("Loaded criterions:");
  const allCriterions = await prisma.criterion.findMany({
    include: { translations: true },
  });
  console.dir(allCriterions, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
