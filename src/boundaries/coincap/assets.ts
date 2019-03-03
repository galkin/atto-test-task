import { plainToClass } from 'class-transformer';
import got from 'got';

import { Asset } from '~/entities';
import logger from '~/logger';
import options from './options';

export async function getAssets (limit: number): Promise<Asset[]> {
  const { body } = await got.get(`assets`, {
    ...options,
    query: {
      limit
    }
  });

  logger.trace({ body, limit }, 'Result from request assets');
  return plainToClass(Asset, body.data, { strategy: 'excludeAll' });
}
