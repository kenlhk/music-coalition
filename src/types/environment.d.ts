namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
  }

  interface Global {
    _mongoClientPromise: Promise<MongoClient>;
  }
}
