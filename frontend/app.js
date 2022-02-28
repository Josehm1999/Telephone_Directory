import chalk from 'chalk';

import { inquirerMenu } from './helpers/inquirer.js';
console.clear();

const main = async () => {
  console.log('Hell world');
  let opt = '';

  do {
    opt = await inquirerMenu();
    console.log({ opt });

    if (opt !== '0') await pausa();
  } while (opt !== '0');
};

main();
