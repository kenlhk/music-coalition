import mongoose from "mongoose";

export const connectToDb = async (): Promise<any> => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: process.env.NODE_ENV,
    });
    console.log("DB connected");
    return db;
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};

export default connectToDb;

// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI as string;
// const options = {};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// declare global {
//   var _mongoClientPromise: Promise<MongoClient>;
// }

// const env = process.env.NODE_ENV;

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your Mongo URI to .env.local");
// }

// if (env === "development") {
//   // In development mode, use a global_mongoClientPromise variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export const connectToDb = async () => {
//   const client = await clientPromise;
//   return client.db(env);
// };

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;
