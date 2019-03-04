import Router from 'koa-router';

import * as currencies from './controllers/currencies';
import * as fe from './controllers/fe';

const router = new Router({
  sensitive: true,
  strict: true
});

router
// @ts-ignore @todo: fix interface issue
  .get('/', fe.index)
  .get('/currencies/', currencies.index);

export default router;
