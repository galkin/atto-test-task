import 'reflect-metadata';

import bootstrap from '~/bootstraper';
import * as http from '~/boundaries/http2-server';
import * as dataScraper from '~/controls/scraper';

export async function start () {
  await dataScraper.start();
  await http.start();
}

export async function stop () {
  await http.stop();
  await dataScraper.stop();
}

if (!module.parent) {
  // tslint:disable-next-line
  bootstrap(start, stop);
}
