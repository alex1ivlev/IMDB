-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "picture" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
