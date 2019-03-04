import { readFileSync } from 'fs';
import { createSecureServer } from 'http2';
import { Socket } from 'net';
import { join } from 'path';

import config from '~/config';
import logger from '~/logger';
import koa from './rest';

const connectedSockets: Socket[] = [];
const server = createSecureServer({
  key: readFileSync(join(__dirname, '..', '..', 'keys/localhost-privkey.pem')),
  cert: readFileSync(join(__dirname, '..', '..', '/keys/localhost-cert.pem')),
  allowHTTP1: true
}
);
server.on('request', koa.callback());
server.on('connection', (socket: Socket) => {
  const socketId = connectedSockets.push(socket) - 1;
  socket.once('close', () => delete connectedSockets[socketId]);
});

export async function start () {
  if (server.listening) throw new Error('HTTP Server is already listening');
  const serverListenPromise = new Promise((resolve, reject) => {
    server.listen(config.http.port, resolve);
    server.once('error', reject);
  });
  await serverListenPromise;
  logger.info(`HTTP server started on ${config.http.port}`);
}

export async function stop () {
  if (!server.listening) throw new Error('HTTP Server is not listening');
  const serverClosePromise = new Promise((resolve, reject) => {
    server.once('close', resolve);
    server.close((err: Error) => {
      if (err) reject(err);
    });
  });
  connectedSockets.forEach(socket => socket.destroy());
  await serverClosePromise;
  logger.info('Http server stopped');
}
