import { JwtModuleOptions } from '@nestjs/jwt';

require('dotenv').config();

export const config = {
  PORT: parseInt(process.env.PORT, 10) || 8000,
  HOST: process.env.HOST || 'http://localhost',
  ROOT_DIR: process.cwd(),
  STATIC_DIR: `${process.cwd()}/static`,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'super-secret-jwt-key',
  UPLOAD_IMAGES_DIR: 'uploads/images',
  G_CLIENT_ID: process.env.G_CLIENT_ID,
  G_CLIENT_SECRET: process.env.G_CLIENT_SECRET,
  CLIENT_SIGN_IN_URL: process.env.CLIENT_SIGN_IN_URL,
  G_OAUTH_REDIRECT_URL: process.env.G_OAUTH_REDIRECT_URL,
};

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyB8YnDZnQKqb068bZA6ZJxO7XNqc7Zbk1o',
  authDomain: 'tiny-house-node-app.firebaseapp.com',
  projectId: 'tiny-house-node-app',
  storageBucket: 'tiny-house-node-app.appspot.com',
  messagingSenderId: '807967345789',
  appId: '1:807967345789:web:0871d36d349f6f4555f514',
};

export const JWT_CONFIG: JwtModuleOptions = {
  secret: config.JWT_SECRET_KEY,
  signOptions: {
    expiresIn: '7d',
  },
};
