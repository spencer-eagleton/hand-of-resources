const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const LostItem = require('../lib/models/LostItem');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a lost item', async () => {
    const expected = {
      name: '1998 Honda Civic',
      status: 'Stationary',
      imageURL:
        'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };

    const response = await request(app)
      .post('/api/v1/lostitems')
      .send(expected);
    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of lost items', async () => {
    const expected = await LostItem.findAll();
    const res = await request(app).get('/api/v1/lostitems');

    expect(res.body).toEqual(expected);
  });

  it('gets a lost item by id', async () => {
    const expected = {
      id: '1',
      name: '1998 Honda Civic',
      status: 'Stationary',
      imageURL:
        'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };
    const res = await request(app).get('/api/v1/lostitems/1');
    expect(res.body).toEqual(expected);
  });

  it('updates a lost item fetched by Id', async () => {
    const res = await request(app).patch('/api/v1/lostitems/1').send({ status: 'Mobile', });
    const expected = {
      id: '1',
      name: '1998 Honda Civic',
      status: 'Mobile',
      imageURL:
                'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };

    expect(res.body).toEqual(expected);
    
  });

  it('deletes a lost item by id', async () => {
    const initial = {
      id: '1',
      name: '1998 Honda Civic',
      status: 'Stationary',
      imageURL:
                'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };

    const lostItem = await LostItem.insert(initial);
    const res = await request(app).delete(`/api/v1/lostitems/${lostItem.id}`);
    expect(res.body).toEqual(lostItem);
  });


});
