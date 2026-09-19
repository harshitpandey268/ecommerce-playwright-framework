import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  username: process.env.TEST_USERNAME ?? 'standard_user',
  password: process.env.TEST_PASSWORD ?? 'secret_sauce',
};