import { createReadStream } from 'fs';
import { join } from 'path';

import { Context } from '../context';

export async function index (ctx: Context): Promise<void> {
  ctx.type = 'text/html; charset=utf-8';
  ctx.status = 200;
  const filePath = join(__dirname, '..', '..', '..', '..', '/public/index.html');
  ctx.body = createReadStream(filePath);
}
