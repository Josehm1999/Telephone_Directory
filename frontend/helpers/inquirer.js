import inquirer from 'inquirer';
import chalk from 'chalk';

const menuOpts = [
  {
    type: 'list',
    name: 'opt',
    message: 'Qué desea hacer?',
    choices: ['opt1', 'opt2', 'opt3'],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log(chalk.green('========================'));
  console.log(chalk.green(' Seleccione una opción'));
  console.log(chalk.green('========================'));

  const opt = await inquirer.prompt(menuOpts);
  return opt;
};

export { inquirerMenu };
