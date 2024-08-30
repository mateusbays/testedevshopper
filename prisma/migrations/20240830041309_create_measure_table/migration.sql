-- CreateTable
CREATE TABLE "Measure" (
    "measure_uuid" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "measure_value" INTEGER NOT NULL,
    "measure_type" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("measure_uuid")
);
