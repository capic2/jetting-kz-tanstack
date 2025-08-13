-- CreateTable
CREATE TABLE "Settings" (
    "engine" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_engine_key" ON "Settings"("engine");
