const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const WaterStation = require('../lib/models/WaterStation');

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

  it('gets a list of waterstations', async () => {
    const expected = await WaterStation.findAll();
    const res = await request(app).get('/api/v1/waterstations');

    expect(res.body).toEqual(expected);

  });

  it('gets a water station by id', async () => {
    const expected = {
      id: '1',
      name: 'Rest Stop Water Station',
      status: 'Free',
      imageURL:
              'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };
    const res = await request(app).get('/api/v1/waterstations/1');
    expect(res.body).toEqual(expected);


  });

  it('updates a water station fetched by Id', async () => {
   


    const res = await request(app).patch('/api/v1/waterstations/1').send({ status: 'Paid', });

    const expected = {
      id: '1',
      name: 'Rest Stop Water Station',
      status: 'Paid',
      imageURL:
                'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };

    expect(res.body).toEqual(expected);
    
  });

  it('deletes an bathroom by id', async () => {
    const initial = {
      id: '1',
      name: 'Rest Stop Water Station',
      status: 'Free',
      imageURL:
                'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };

    const waterStation = await WaterStation.insert(initial);


    const res = await request(app).delete(`/api/v1/waterstations/${waterStation.id}`);
    expect(res.body).toEqual(waterStation);

  });


});
