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

function createCriterion(): Promise<Criterion> {
  return prisma.criterion.create({
    data: {},
  });
}

function addTranslation(
  criterion: Criterion,
  lang: string,
  title: string,
  subtitle: string,
  icon: string
): Promise<CriterionTranslation> {
  return prisma.criterionTranslation.create({
    data: {
      lang: lang,
      title: title,
      subtitle: subtitle,
      icon: icon,
      criterionId: criterion.id,
    },
  });
}

async function main() {
  // remove previous criterions
  await prisma.criterionTranslation.deleteMany({});
  await prisma.criterion.deleteMany({});
  //const deleteQuestionTexts = await prisma.questionText.deleteMany({});

  for (let i = 0; i < results.length; i++) {
    const translations = [];
    const langs = Object.keys(results[i]);
    //console.log(langs);

    for (let j = 1; j < Object.keys(results[i]).length; j = j + 2) {
      //console.log(j, j + 1);
      const title = results[i][langs[j]];
      const subtitle = results[i][langs[j + 1]];
      const lang = langs[j].toLowerCase().slice(0, 2);
      const icon = results[i][langs[0]];
      //console.log(lang, title, subtitle);
      if (
        title &&
        title != "" &&
        subtitle &&
        subtitle != "" &&
        icon &&
        icon != ""
      ) {
        translations.push({ lang, title, subtitle, icon });
      }
    }
    //console.log(translations);
    if (translations.length) {
      const criterion = await createCriterion();
      await Promise.all(
        translations.map(({ lang, title, subtitle, icon }) =>
          addTranslation(criterion, lang, title, subtitle, icon)
        )
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
