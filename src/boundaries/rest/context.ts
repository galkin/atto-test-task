import { Request } from 'koa';
import { IRouterContext } from 'koa-router';

interface RequestWithBody extends Request {
  body: { [key: string]: any };
  rawBody: string;
}

export interface Context extends IRouterContext {
  request: RequestWithBody;
}
