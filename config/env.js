import { config } from 'dotenv';

/* 
Load env variables from the appropriate .env file 
- NODE_ENV will be set beforehand, to determine the environment
- defaults to 'development' if NODE_ENV is not set
*/
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, NODE_ENV, DB_URI } = process.env;
