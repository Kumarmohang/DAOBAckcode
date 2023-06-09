import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const LOG_LEVEL = process.env.NODE_ENV !== 'development' ? 'error' : 'debug';
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  DB_ENGINE,
  PHOTO_DIR,
  FILE_DIR,
  THUMBNAIL_DIR,
} = process.env;
