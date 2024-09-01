-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "namalengkap" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'A',

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
