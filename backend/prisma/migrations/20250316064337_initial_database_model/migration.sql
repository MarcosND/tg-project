-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL,
    "questionsAsked" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "duration" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsPerCharacter" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "ricardo" INTEGER NOT NULL DEFAULT 0,
    "alfredo" INTEGER NOT NULL DEFAULT 0,
    "laura" INTEGER NOT NULL DEFAULT 0,
    "paulo" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "QuestionsPerCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionsPerCharacter_gameId_key" ON "QuestionsPerCharacter"("gameId");

-- AddForeignKey
ALTER TABLE "QuestionsPerCharacter" ADD CONSTRAINT "QuestionsPerCharacter_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
