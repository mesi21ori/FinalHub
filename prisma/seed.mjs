// prisma/seed.mjs

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is missing in environment variables");
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const platformAdmin = await prisma.user.upsert({
    where: {
      email: "shumetmeseret7@gmail.com"
    },
    update: {
      username: "platform_admin",
      password: hashedPassword,
      role: "PLATFORM_ADMIN",
      isPlatformAdmin: true,
      isActive: true
    },
    create: {
      email: "shumetmeseret7@gmail.com",
      username: "platform_admin",
      password: hashedPassword,
      role: "PLATFORM_ADMIN",
      isPlatformAdmin: true,
      isActive: true
    }
  });

  console.log("Platform Admin ready:", platformAdmin.email);

  const preferences = [
    "Wars",
    "Politics",
    "Religion",
    "Culture",
    "Famine & Crisis",
    "Civil Rights",
    "Economy",
    "Diplomacy",
    "Leadership",
    "Ethnic Movements"
  ];

  for (const preference of preferences) {
    const existingPreference = await prisma.preference.findFirst({
      where: {
        name: preference
      }
    });

    if (!existingPreference) {
      await prisma.preference.create({
        data: {
          name: preference
        }
      });
    }
  }

  console.log("Preferences ready");
}

main()
  .catch(async (error) => {
    console.error("Seed error:", error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });