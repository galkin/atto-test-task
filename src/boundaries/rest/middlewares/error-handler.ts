import { Context } from '~/boundaries/rest/context';
import logger from '~/logger';

export async function errorHandler (ctx: Context, next: Function) {
  try {
    await next();
  } catch (error) {
    const code = error.status || 500;
    ctx.status = code;
    ctx.type = 'application/json';
    ctx.body = { code, message: error.message };
    if (code >= 400 && code <= 499) {
      logger.trace({ error, ctx });
    } else {
      logger.error({ error, ctx });
    }
  }
}
