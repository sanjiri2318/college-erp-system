// Entry point — boots the HTTP server

require('dotenv').config();

const app = require('./app');
const prisma = require('./src/config/prisma');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Verify DB connection before accepting traffic
    await prisma.$connect();
    console.log('✅ Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('🔌 Database disconnected. Server shutting down.');
  process.exit(0);
});

startServer();