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


  it('gets a free item by id', async () => {
    const expected = {
      id: '1',
      name: 'Wooden Table',
      status: 'Available',
      imageURL:
        'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };
    const res = await request(app).get('/api/v1/freeitems/1');
    expect(res.body).toEqual(expected);
  });

  it('updates a free item fetched by Id', async () => {
    const res = await request(app).patch('/api/v1/freeitems/1').send({ status: 'Unavailable', });
    const expected = {
      id: '1',
      name: 'Wooden Table',
      status: 'Unavailable',
      imageURL:
                'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };

    expect(res.body).toEqual(expected);
    
  });


});
