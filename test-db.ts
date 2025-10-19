import { connectToDatabase } from './database/mongoose';

(async () => {
  try {
    const conn = await connectToDatabase();
    console.log('Database name:', conn.connection.name);
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  } finally {
    process.exit(0);
  }
})();