import chalk from 'chalk';

import {
  confirmation,
  inquirerMenu,
  pause,
  readInput,
  readInputNumbers,
} from './helpers/inquirer.js';
import {
  createDirectory,
  listContacts,
  freeSpaces,
} from './services/directory.service.js';

import {
  isRegistered,
  searchContact,
  createContact,
  deleteContact,
} from './services/contact.service.js';
console.clear();

const main = async () => {
  let opt = '';
  const id = await createDirectory();
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        let name = await readInput('Name: ');
        let landline = await readInputNumbers('Landline: ');
        let cellphone = await readInputNumbers('Cellphone');

        let createdContact = await createContact(
          name.trim(),
          landline.trim(),
          cellphone.trim(),
          id
        );
        console.log(createdContact);
        break;

      case '2':
        const contacts = await listContacts(id);
        console.log(chalk.green(contacts));
        break;

      case '3':
        let nameS = await readInput('Name: ');
        let contact = await searchContact(id, nameS.trim());
        console.log(contact);
        break;

      case '4':
        let nameR = await readInput('Name: ');
        let message = await isRegistered(id, nameR.trim());
        console.log(chalk.green(message));
        break;

      case '5':
        let nameD = await readInput('Name: ');
        let ok = await confirmation(
          'Are you sure you want to delete this contact?'
        );
        if (ok) {
          let messageD = await deleteContact(id, nameD.trim());
          console.log(chalk.green(messageD));
        }

        break;

      case '6':
        let fSpaces = await freeSpaces(id);
        console.log(`${chalk.green('There is ', fSpaces, 'free spaces.')}`);
        break;

      case '7':
        let isFull = await freeSpaces(id);
        isFull === 0
          ? console.log(`${chalk.red('The directory is full')}`)
          : console.log(`${chalk.green('The directory is not full yet')}`);
        break;
    }
    if (opt !== '8') await pause();
  } while (opt !== '8');
};

main();
