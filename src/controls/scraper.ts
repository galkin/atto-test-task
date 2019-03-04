import { PassThrough, Readable } from 'stream';

import config from '~/config';
import logger from '~/logger';

import { getAssets } from '~/boundaries/coincap/assets';
import { Asset } from '~/entities';

let intervalId: NodeJS.Timeout;
let currentAssetValues: Asset[] = [];
let currentAssetValuesStr: string = '[]';

class AssetsStream extends Readable {
  // tslint:disable-next-line
  _read () { }
}

let assetsStreamSSE = new AssetsStream();

export async function start () {
  if (intervalId) throw new Error('Scrapper is already running');
  await updateValue();
  logger.info('Data scraper started');
  intervalId = setInterval(updateValue, config.scrapping.interval);
}

export async function stop () {
  if (!intervalId) throw new Error('Scrapper is not running');
  logger.info('Data scraper stopped');
  clearInterval(intervalId);
}

async function updateValue (): Promise<void> {
  try {
    const newAssetValues = (await getAssets(config.scrapping.assetsCount)).sort((a,b) => a.rank - b.rank);
    const newAssetValuesStr = JSON.stringify(newAssetValues);
    if (currentAssetValuesStr !== newAssetValuesStr) {
      currentAssetValues = newAssetValues;
      currentAssetValuesStr = newAssetValuesStr;
      logger.trace({ values: currentAssetValues }, 'Scrapper received new values');
      assetsStreamSSE.push(`data: ${currentAssetValuesStr}\n\n`);
    } else {
      logger.trace('Scrapper received known values');
    }
  } catch (error) {
    logger.warn({ error }, 'Error during scrapping');
  }
}

export function getCurrentAssets (): Asset[] {
  return currentAssetValues;
}

export function getAssetsStreamSSE (withCurrent: boolean = true): Readable {
  const resultStream = new PassThrough();
  if (withCurrent) resultStream.push(`data: ${currentAssetValuesStr}\n\n`);
  assetsStreamSSE.pipe(resultStream);

  return resultStream;
}
