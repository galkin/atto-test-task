import 'reflect-metadata';

import bootstrap from '~/bootstraper';
import * as dataScraper from '~/controls/scraper';

export async function start () {
  dataScraper.start();
}

export async function stop () {
  dataScraper.stop();
}

if (!module.parent) {
  // tslint:disable-next-line
  bootstrap(start, stop);
}
