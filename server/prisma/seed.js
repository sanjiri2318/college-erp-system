// Seed script — creates the default ADMIN account
// Run with: npm run seed

require('dotenv').config();

const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedAdmin = async () => {
  const adminEmail = 'admin@college.com';
  const plainPassword = 'admin123';

  // Check if admin already exists
  const existing = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (existing) {
    console.log('ℹ️ Admin account already exists. Skipping seed.');
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(
    plainPassword,
    salt
  );

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      passwordHash,
      role: 'ADMIN',
      isActive: true,
      mustChangePassword: false,
    },
  });

  console.log('✅ Admin account created successfully.');
  console.log(`Email    : ${admin.email}`);
  console.log(`Role     : ${admin.role}`);
  console.log(`Password : ${plainPassword}`);
};

seedAdmin()
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });