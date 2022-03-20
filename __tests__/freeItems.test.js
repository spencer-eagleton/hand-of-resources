const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const FreeItem = require('../lib/models/FreeItem');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a free item', async () => {
    const expected = {
      name: 'Wooden Table',
      status: 'Available',
      imageURL:
        'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };

    const response = await request(app)
      .post('/api/v1/freeitems')
      .send(expected);
    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of free items', async () => {
    const expected = await FreeItem.findAll();
    const res = await request(app).get('/api/v1/freeitems');

    expect(res.body).toEqual(expected);

  });

});
