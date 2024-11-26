-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AmenityToHostel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Amenity_name_key" ON "Amenity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AmenityToHostel_AB_unique" ON "_AmenityToHostel"("A", "B");

-- CreateIndex
CREATE INDEX "_AmenityToHostel_B_index" ON "_AmenityToHostel"("B");

-- AddForeignKey
ALTER TABLE "_AmenityToHostel" ADD CONSTRAINT "_AmenityToHostel_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToHostel" ADD CONSTRAINT "_AmenityToHostel_B_fkey" FOREIGN KEY ("B") REFERENCES "hostels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
