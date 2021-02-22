import inquirer from 'inquirer';
import ShowBestRoute from '@modules/trip/services/ShowBestRouteService';

(async () => {
  if (!process.argv[2]) {
    console.error('You need to inform file path for graph');
    return;
  }

  const call = await inquirer.prompt([
    {
      name: 'fromTo',
      type: 'input',
      message: 'please enter the route:',
      default: 'GRU-CDG',
      validate: (input) => {
        if (input.split('-').length !== 2) {
          return 'Invalid format. Use the "from-to" syntax';
        } else {
          return true;
        }
      },
    },
  ]);

  const [from, to] = call.fromTo.split('-');

  const showBestRoute = new ShowBestRoute(process.argv[2])

  const { bestRoute, price } = await showBestRoute.execute({to, from});

  console.log(`best route: ${bestRoute} > ${price}`);
})();
