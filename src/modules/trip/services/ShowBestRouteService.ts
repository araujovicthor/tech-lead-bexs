import AppError from '@shared/errors/AppError';
import readGraph from '../utils/readGraph';
import dijkstra from '../utils/dijkstra';

interface IRequest {
  to: string;
  from: string;
}

interface IResponse {
  bestRoute: string;
  price: number;
}

class ShowBestRouteService {
  constructor(
    private databaseFile: string,
  ) {}

  public async execute({ from, to }: IRequest): Promise<IResponse> {
    const graph = readGraph(this.databaseFile);

    if (!graph) {
      throw new AppError('Error on graph file');
    };

    const bestRoute = dijkstra(from, to, graph);

    if (!bestRoute || !bestRoute.price){
      throw new AppError('Best route not find');
    }

    return bestRoute;
  }
}

export default ShowBestRouteService;
