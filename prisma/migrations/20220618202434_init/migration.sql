-- CreateTable
CREATE TABLE "favorite" (
    "uuid" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "movies" INTEGER[],

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("uuid")
);
