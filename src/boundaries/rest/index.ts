import Koa from 'koa';

import { errorHandler } from './middlewares/error-handler';
import router from './router';

const app = new Koa();

app.use(errorHandler);

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
