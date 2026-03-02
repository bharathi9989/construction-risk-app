/*
  Warnings:

  - You are about to drop the column `costRisk` on the `RiskResult` table. All the data in the column will be lost.
  - You are about to drop the column `delayProb` on the `RiskResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RiskResult" DROP COLUMN "costRisk",
DROP COLUMN "delayProb",
ADD COLUMN     "costOverrunLikelihood" DOUBLE PRECISION,
ADD COLUMN     "delayProbability" DOUBLE PRECISION,
ADD COLUMN     "laborRiskScore" DOUBLE PRECISION,
ADD COLUMN     "materialRiskScore" DOUBLE PRECISION;
