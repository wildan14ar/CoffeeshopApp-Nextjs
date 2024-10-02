/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `ReviewProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReviewProduct_userId_productId_key" ON "ReviewProduct"("userId", "productId");
