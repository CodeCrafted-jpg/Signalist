import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load .env variables when running outside of Next.js
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  // Prevent TypeScript redeclaration errors in Next.js hot reload
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (!MONGODB_URI) throw new Error('MONGODB_URI must be set within .env');

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  console.log(`✅ Connected to database (${process.env.NODE_ENV})`);
  return cached.conn;
};
