-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'OWNER', 'MANAGER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
