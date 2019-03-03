import Bunyan from 'bunyan';

import config from '~/config';

interface LoggerInterface {
  trace (message: string): void;
  trace (data: Object | Error, message?: string): void;
  debug (message: string): void;
  debug (data: Object | Error, message?: string): void;
  info (message: string): void;
  info (data: Object | Error, message?: string): void;
  warn (message: string): void;
  warn (data: Object | Error | Error, message?: string): void;
  error (message: string): void;
  error (data: Object | Error, message?: string): void;
  fatal (message: string): void;
  fatal (data: Object | Error, message?: string): void;
}

export default new Bunyan({
  name: 'atto-test-task',
  streams: [
    {
      level: config.logLevel,
      stream: process.stdout
    }
  ],
  serializers: {
    error: Bunyan.stdSerializers.err
  }
}) as LoggerInterface;
