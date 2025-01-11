-- CreateTable
CREATE TABLE "demo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "message" VARCHAR(255) NOT NULL,

    CONSTRAINT "demo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT,
    "password" TEXT NOT NULL,
    "profile_pic" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_mobile_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_profile_completed" BOOLEAN NOT NULL DEFAULT false,
    "is_account_deleted" BOOLEAN NOT NULL DEFAULT false,
    "is_account_suspended" BOOLEAN NOT NULL DEFAULT false,
    "google_id" TEXT,
    "username" TEXT NOT NULL,
    "bio" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
