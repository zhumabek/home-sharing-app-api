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
};

export const JWT_CONFIG: JwtModuleOptions = {
  secret: config.JWT_SECRET_KEY,
  signOptions: {
    expiresIn: '7d',
  },
};
