import inquirer from 'inquirer';
import chalk from 'chalk';

const menuOpts = [
  {
    type: 'list',
    name: 'opt',
    message: 'Choose an option',
    choices: [
      {
        value: '1',
        name: `${chalk.green('1')} Add contact`,
      },
      {
        value: '2',
        name: `${chalk.green('2')} List contacts`,
      },

      {
        value: '3',
        name: `${chalk.green('3')} Search contact`,
      },
      {
        value: '4',
        name: `${chalk.green('4')} Existing contact`,
      },
      {
        value: '5',
        name: `${chalk.green('5')} Delete contact`,
      },
      {
        value: '6',
        name: `${chalk.green('6')} Available spaces`,
      },
      {
        value: '7',
        name: `${chalk.green('7')} Full agenda`,
      },
      {
        value: '8',
        name: `${chalk.green('8')} Exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log(chalk.green('========================'));
  console.log(chalk.green(' Choose an option'));
  console.log(chalk.green('========================'));

  const { opt } = await inquirer.prompt(menuOpts);
  return opt;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${chalk.green('enter')} to continue`,
    },
  ];
  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please enter a value';
        }

        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const readInputNumbers = async (message) => {
  const regex = new RegExp('^[2-9][0-9]{6,8}$');
  const question = [
    {
      type: 'input',
      name: 'num',
      message,
      validate(value) {
        return !regex.test(value) ? 'Please enter a valid number' : true;
      },
    },
  ];
  const { num } = await inquirer.prompt(question);
  return num;
};

export { inquirerMenu, pause, readInput, readInputNumbers };
