/*
  Warnings:

  - You are about to drop the `Attempt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Foul` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gameday` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GamedayToPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlayerToTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Attempt" DROP CONSTRAINT "Attempt_assistedId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Attempt" DROP CONSTRAINT "Attempt_gameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Attempt" DROP CONSTRAINT "Attempt_goalieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Attempt" DROP CONSTRAINT "Attempt_shooterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Foul" DROP CONSTRAINT "Foul_gameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Foul" DROP CONSTRAINT "Foul_playerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_gamedayId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_teamAId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_teamBId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_winnerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_GamedayToPlayer" DROP CONSTRAINT "_GamedayToPlayer_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_GamedayToPlayer" DROP CONSTRAINT "_GamedayToPlayer_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PlayerToTeam" DROP CONSTRAINT "_PlayerToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PlayerToTeam" DROP CONSTRAINT "_PlayerToTeam_B_fkey";

-- DropTable
DROP TABLE "public"."Attempt";

-- DropTable
DROP TABLE "public"."Foul";

-- DropTable
DROP TABLE "public"."Game";

-- DropTable
DROP TABLE "public"."Gameday";

-- DropTable
DROP TABLE "public"."Player";

-- DropTable
DROP TABLE "public"."Team";

-- DropTable
DROP TABLE "public"."_GamedayToPlayer";

-- DropTable
DROP TABLE "public"."_PlayerToTeam";

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUri" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Foul" (
    "id" SERIAL NOT NULL,
    "card" TEXT,
    "time" INTEGER,
    "x" DOUBLE PRECISION,
    "y" DOUBLE PRECISION,
    "gameId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "Foul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gamedayId" INTEGER NOT NULL,
    "scoreTeamA" INTEGER NOT NULL DEFAULT 0,
    "scoreTeamB" INTEGER NOT NULL DEFAULT 0,
    "teamAId" INTEGER NOT NULL,
    "teamBId" INTEGER NOT NULL,
    "winnerId" INTEGER,
    "finished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "color" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayersInTeam" (
    "teamId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "PlayersInTeam_pkey" PRIMARY KEY ("teamId","playerId")
);

-- CreateTable
CREATE TABLE "Gameday" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Gameday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayersInGameday" (
    "gamedayId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "PlayersInGameday_pkey" PRIMARY KEY ("gamedayId","playerId")
);

-- CreateTable
CREATE TABLE "Attempt" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION,
    "x" DOUBLE PRECISION,
    "y" DOUBLE PRECISION,
    "goal" BOOLEAN NOT NULL DEFAULT false,
    "autogoal" BOOLEAN NOT NULL DEFAULT false,
    "penalty" BOOLEAN NOT NULL DEFAULT false,
    "onTarget" BOOLEAN NOT NULL DEFAULT false,
    "shooterId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "assistedId" INTEGER,
    "goalieId" INTEGER,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Foul" ADD CONSTRAINT "Foul_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foul" ADD CONSTRAINT "Foul_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_gamedayId_fkey" FOREIGN KEY ("gamedayId") REFERENCES "Gameday"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_teamAId_fkey" FOREIGN KEY ("teamAId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_teamBId_fkey" FOREIGN KEY ("teamBId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayersInTeam" ADD CONSTRAINT "PlayersInTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayersInTeam" ADD CONSTRAINT "PlayersInTeam_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayersInGameday" ADD CONSTRAINT "PlayersInGameday_gamedayId_fkey" FOREIGN KEY ("gamedayId") REFERENCES "Gameday"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayersInGameday" ADD CONSTRAINT "PlayersInGameday_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_shooterId_fkey" FOREIGN KEY ("shooterId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_assistedId_fkey" FOREIGN KEY ("assistedId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_goalieId_fkey" FOREIGN KEY ("goalieId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
