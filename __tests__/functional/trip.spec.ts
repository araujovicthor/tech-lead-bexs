import app from '@shared/infra/http/app';
import request from 'supertest';

describe('trip functional test', () => {
  it('should be able to get best route from api rest', async () => {
    const response = await request(app)
      .get('/trip?from=GRU&to=CDG')
    
    expect(response.body)
      .toMatchObject(
        {'bestRoute': 'GRU - BRC - SCL - ORL - CDG','price': 40},
      );
  });

  test('should be able to register new routes', async () => {
    const response = await request(app)
      .post('/trip')
      .send({
        'to': 'XYZ',
        'from': 'ABC',
        'price': 20
      });

    expect(response.body).toMatchObject({
      'to': 'XYZ',
      'from': 'ABC',
      'price': 20
    });
  });
});
