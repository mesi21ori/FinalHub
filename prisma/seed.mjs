


import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD || 'default-secure-password'; // Use environment variable for password

  // Delete the existing Platform Admin user with ID 1
  await prisma.user.deleteMany({
    where: {
      id: 1,
    },
  });

  // Create the Platform Admin user
  const platformAdmin = await prisma.user.create({
    data: {
      email: 'shumetmeseret7@gmail.com', // Correct email format
      username: 'platform_admin',
      password: await bcrypt.hash(adminPassword, 10), // Hash password
      role: 'PLATFORM_ADMIN',
      isPlatformAdmin: true,
      isActive: true,
    },
  });

  console.log('Platform Admin user has been created:', platformAdmin);

  // Insert preferences into the Preference table
  const preferences = [
    "Wars", "Politics", "Religion", "Culture", 
    "Famine & Crisis", "Civil Rights", "Economy", 
    "Diplomacy", "Leadership", "Ethnic Movements"
  ];

  // Insert each preference into the Preference table
  for (const preference of preferences) {
    await prisma.preference.create({
      data: {
        name: preference,
      },
    });
  }

  console.log('Preferences inserted successfully');
}

// Run the main function and handle errors
main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
