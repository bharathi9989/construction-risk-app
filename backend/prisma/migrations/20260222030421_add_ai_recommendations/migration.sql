-- AlterTable
ALTER TABLE "RiskResult" ADD COLUMN     "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "recommendations" JSONB;
