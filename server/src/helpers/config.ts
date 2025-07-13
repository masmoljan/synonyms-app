import * as dotenv from "dotenv";

dotenv.config();

import configCheck from "config-check";

const port = configCheck("PORT").required().exec();
const nodeEnv = configCheck("NODE_ENV").required().exec();

export const appConfig = {
	port,
  nodeEnv
};
