-- CreateTable
CREATE TABLE "favorite" (
    "uuid" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "movies" (
    "uuid" VARCHAR(36) NOT NULL,
    "relaseDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "characters" (
    "uuid" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "movieInfoUuid" VARCHAR(36),

    CONSTRAINT "characters_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_FavoriteMovie" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "characters_name_key" ON "characters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteMovie_AB_unique" ON "_FavoriteMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteMovie_B_index" ON "_FavoriteMovie"("B");

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_movieInfoUuid_fkey" FOREIGN KEY ("movieInfoUuid") REFERENCES "movies"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteMovie" ADD FOREIGN KEY ("A") REFERENCES "favorite"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteMovie" ADD FOREIGN KEY ("B") REFERENCES "movies"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
