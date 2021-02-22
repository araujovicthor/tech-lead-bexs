import fs from 'fs';
import AppError from '@shared/errors/AppError';

interface IRequest {
  to: string;
  from: string;
  price: number;
}

class CreateRouteService {
  constructor(
    private databaseFile: string,
  ) {}

  public async execute({ from, to, price }: IRequest): Promise<IRequest> {
    const newRoute = `\n${from},${to},${price}`;

    await fs.appendFile(this.databaseFile, newRoute, 'utf8',
      (err) => {
        if (err) throw new AppError('Error saving new route, try again');
      },
    );

    return {to, from, price}
  }
}

export default CreateRouteService;
