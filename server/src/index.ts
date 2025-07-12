import * as dotenv from 'dotenv';
dotenv.config();

import * as http from 'http';
import app from './app';
import { appConfig } from './helpers';

if(process.env.NODE_ENV !== 'production') {
  http.createServer(app.callback()).listen(appConfig.port, () => {
    console.log(`Server running on port ${appConfig.port}`);
  });
}

export default app.callback();
