import * as dotenv from 'dotenv';
dotenv.config();
import configCheck from 'config-check';

const port = configCheck('PORT').required().exec();

export const appConfig = {
  port,
};