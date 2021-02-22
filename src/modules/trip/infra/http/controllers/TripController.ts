import { Request, Response } from 'express';

import ShowBestRoute from '@modules/trip/services/ShowBestRouteService';
import CreateRoute from '@modules/trip/services/CreateRouteService';

export default class TripController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { to, from } = request.query;

    const showBestRoute = new ShowBestRoute('input-routes.csv');

    const bestRoute = await showBestRoute.execute({ to: String(to), from: String(from) });

    return response.json(bestRoute);
  }
  
  public async create(request: Request, response: Response): Promise<Response> {
    const { to, from, price } = request.body;

    const createRoute = new CreateRoute('input-routes.csv');

    const newRoute = await createRoute.execute({
      to,
      from,
      price
    });

    return response.json(newRoute);
  }
}