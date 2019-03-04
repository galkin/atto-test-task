import { getAssetsStreamSSE, getCurrentAssets } from '~/controls/scraper';
import { Context } from '../context';

export async function index (ctx: Context): Promise<void> {
  if (ctx.request.header.accept === 'text/event-stream') {
    ctx.type = 'text/event-stream';
    ctx.body = getAssetsStreamSSE();
  } else {
    ctx.body = getCurrentAssets();
  }
}
