import mongoose from 'mongoose';

// Get MongoDB URI based on environment
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/tmg-next-app';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalForMongoose = global as unknown as {
  mongoose: MongooseConnection;
};

let cached = globalForMongoose.mongoose

if (!cached) {
  cached = globalForMongoose.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Recommended for serverless deployments
    };

    // Log the connection attempt and URI (without sensitive data)
    const sanitizedUri = MONGODB_URI.replace(
      /mongodb\+srv:\/\/([^:]+):([^@]+)@/,
      'mongodb+srv://[username]:[password]@'
    );
    console.warn('[DB] Connecting to MongoDB...', { uri: sanitizedUri });

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.warn('[DB] MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.warn('[DB] MongoDB connection error:', {
          name: error.name,
          message: error.message,
          code: error.code,
        });
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    const error = e as Error;
    console.warn('[DB] Failed to connect to MongoDB:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
