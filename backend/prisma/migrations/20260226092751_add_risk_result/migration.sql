/*
  Warnings:

  - You are about to drop the column `calculatedAt` on the `RiskResult` table. All the data in the column will be lost.
  - You are about to drop the column `costOverrunLikelihood` on the `RiskResult` table. All the data in the column will be lost.
  - You are about to drop the column `delayProbability` on the `RiskResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RiskResult" DROP COLUMN "calculatedAt",
DROP COLUMN "costOverrunLikelihood",
DROP COLUMN "delayProbability",
ADD COLUMN     "costRisk" DOUBLE PRECISION,
ADD COLUMN     "delayProb" DOUBLE PRECISION;
