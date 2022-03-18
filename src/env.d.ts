declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT: string;
        SERVICE_NAME: string;
      }
    }
  }
  
  export {};
  