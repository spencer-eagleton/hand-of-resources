const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Bathroom = require('../lib/models/Bathroom');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a bathrooms', async () => {
    const expected = {
      name: 'Old Town Portland Loo',
      status: 'Closed',
      imageURL:
        'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };
    const res = await request(app).post('/api/v1/bathrooms').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of bathrooms', async () => {
    const expected = await Bathroom.findAll();
    const res = await request(app).get('/api/v1/bathrooms');

    expect(res.body).toEqual(expected);

  });

  it('get a bathroom by id', async () => {
    const expected = {
      id: '1',
      name: 'Old Town Portland Loo',
      status: 'Closed',
      imageURL:
        'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };
    const res = await request(app).get('/api/v1/bathrooms/1');
    expect(res.body).toEqual(expected);


  });

  it('updates bathroom fetched by Id', async () => {
   


    const res = await request(app).patch('/api/v1/bathrooms/1').send({ long : '122.689200' });

    const expected = {
      id: '1',
      name: 'Old Town Portland Loo',
      status: 'Closed',
      imageURL:
        'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689200',
    };

    expect(res.body).toEqual(expected);
    
  });

  it('deletes an bathroom by id', async () => {
    const initial = {
      id: '1',
      name: 'Old Town Portland Loo',
      status: 'Closed',
      imageURL:
        'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689200',
    };

    const bathroom = await Bathroom.insert(initial);


    const res = await request(app).delete(`/api/v1/bathrooms/${bathroom.id}`);
    expect(res.body).toEqual(bathroom);

  });


});
