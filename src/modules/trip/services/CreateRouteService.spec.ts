import fs from 'fs';
import CreateRouteService from './CreateRouteService';

jest.mock('fs');

let createRouteService: CreateRouteService;

describe('CreateRoute', () => {
  beforeEach(() => {
    createRouteService = new CreateRouteService('input-routes-test.csv');
  });

  it('should be able to create a new route', async () => {
    await createRouteService.execute({
      from:'BSB',
      to: 'GYN',
      price: 100
    });

    expect(fs.appendFile)
      .toHaveBeenCalledWith(
        'input-routes-test.csv',
        '\nBSB,GYN,100',
        'utf8',
        expect.anything(),
      );
  });
});
