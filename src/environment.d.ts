declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      VITE_MAPBOX_ACCESS_TOKEN: string;
    }
  }
}

export {};
