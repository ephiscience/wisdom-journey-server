import csv from "csv-parser";
import fs from "fs";
import { PrismaClient, Question, QuestionTranslation } from "@prisma/client";

//const csv = require('csv-parser')
const results: { [k: string]: string }[] = [];

fs.createReadStream(__dirname + "/../../resources/i18n_Questions.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    //console.log(results); // see results
  });

const prisma = new PrismaClient();

function createQuestion(): Promise<Question> {
  return prisma.question.create({
    data: {},
  });
}

function addTranslation(
  question: Question,
  lang: string,
  text: string
): Promise<QuestionTranslation> {
  return prisma.questionTranslation.create({
    data: {
      lang: lang,
      translation: text,
      questionId: question.id,
    },
  });
}

async function main() {
  // remove previous questions
  await prisma.questionTranslation.deleteMany({});
  await prisma.question.deleteMany({});
  //const deleteQuestionTexts = await prisma.questionText.deleteMany({});

  for (let i = 0; i < results.length; i++) {
    const translations = [];

    for (const language in results[i]) {
      const text = results[i][language];
      const lang = language.toLowerCase().slice(0, 2);
      if (text && text !== "") {
        translations.push({ lang, text });
      }
    }
    if (translations.length) {
      const question = await createQuestion();
      await Promise.all(
        translations.map(({ lang, text }) =>
          addTranslation(question, lang, text)
        )
      );
    }
  }

  console.log("Loaded questions:");
  const allQuestions = await prisma.question.findMany({
    include: { translations: true },
  });
  console.dir(allQuestions, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
