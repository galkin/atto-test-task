import { join } from 'path';

import { LogLevelString } from 'bunyan';
import { load } from 'dotenv-safe';

load({
  allowEmptyValues: false,
  path: join(__dirname, '..', '.env'),
  sample: join(__dirname, '..', '.env.example')
});

export default {
  logLevel: process.env.LOG_LEVEL! as LogLevelString,
  scrapping: {
    interval: parseInt(process.env.SCRAPPING_INTERVAL!, 10),
    assetsCount: parseInt(process.env.SCRAPPING_ASSETS_COUNT_INTERVAL!, 10)
  },
  shutdownTimeout: parseInt(process.env.SHUTDOWN_TIMEOUT!, 10)
};
