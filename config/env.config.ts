import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  password: process.env.TEST_PASSWORD ?? 'secret_sauce',
  users: {
    standard: 'standard_user',
    lockedOut: 'locked_out_user',
    problem: 'problem_user',
    performanceGlitch: 'performance_glitch_user',
    error: 'error_user',
    visual: 'visual_user',
  },
} as const;