-- CreateTable
CREATE TABLE "QuestionTranslation" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionTranslation" ADD FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
