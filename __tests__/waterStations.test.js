const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('creates a waterStation', async () => {
    const expected = {
      name: 'Rest Stop Water Station',
      status: 'Free',
      imageURL:
            'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };
    const res = await request(app).post('/api/v1/waterstations').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

});
