import AppError from '@shared/errors/AppError';

import ShowBestRoute from './ShowBestRouteService';

describe('ShowBestRoute', () => {
  it('should be able to show best route', async () => {
    const showBestRoute = new ShowBestRoute('input-routes-test.csv');
    
    const bestRoute = await showBestRoute.execute({ to: 'CDG', from: 'GRU' });

    expect(bestRoute.bestRoute).toBe("GRU - BRC - SCL - ORL - CDG");
    expect(bestRoute.price).toBe(40);
  });

  it('should not be able to read a non-existent file', async () => {
    const showBestRoute = new ShowBestRoute('');
    
    await expect(
      showBestRoute.execute({ to: 'CDG', from: 'GRU' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able show a best route for a non-existent to/from', async () => {
    const showBestRoute = new ShowBestRoute('input-routes-test.csv');
    
    await expect(
      showBestRoute.execute({ to: 'non-existent-to', from: 'non-existent-from' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
