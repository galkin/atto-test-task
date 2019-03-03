import config from '~/config';
import logger from '~/logger';

import { getAssets } from '~/boundaries/coincap/assets';
import { Asset } from '~/entities';

let intervalId: NodeJS.Timeout;
let currentAssetValues: Asset[] = [];
let currentAssetValuesStr: string = '[]';

export function start (): void {
  if (intervalId) throw new Error('Scrapper is already running');
  logger.info('Data scraper started');
  intervalId = setInterval(updateValue, config.scrapping.interval);
}

export function stop (): void {
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
      logger.debug({ values: currentAssetValues }, 'Scrapper received new values');
    }
  } catch (error) {
    logger.warn({ error }, 'Error during scrapping');
  }
}

export function getCurrentAssets (): Asset[] {
  return currentAssetValues;
}
