const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const SafeRestArea = require('../lib/models/SafeRestArea');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a safety rest area', async () => {
    const expected = {
      name: 'Gee Creek Safety Rest Area',
      status: 'Unregulated',
      imageURL:
        'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };

    const response = await request(app).post('/api/v1/saferestareas').send(expected);
    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of safe rest areas', async () => {
    const expected = await SafeRestArea.findAll();
    const res = await request(app).get('/api/v1/saferestareas');

    expect(res.body).toEqual(expected);

  });


  it('gets a safe rest area by id', async () => {
    const expected = {
      id: '1',
      name: 'Gee Creek Safety Rest Area',
      status: 'Unregulated',
      imageURL:
              'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };
    const res = await request(app).get('/api/v1/saferestareas/1');
    expect(res.body).toEqual(expected);
  });

  it('updates a safe rest area fetched by Id', async () => {
   


    const res = await request(app).patch('/api/v1/saferestareas/1').send({ status: 'Regulated', });

    const expected = {
      id: '1',
      name: 'Gee Creek Safety Rest Area',
      status: 'Regulated',
      imageURL:
                'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };

    expect(res.body).toEqual(expected);
    
  });

  it('deletes an SRA by id', async () => {
    const initial = {
      id: '1',
      name: 'Gee Creek Safety Rest Area',
      status: 'Unregulated',
      imageURL:
                'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC',
      lat: '45.528323',
      long: '122.689120',
    };

    const safeRestArea = await SafeRestArea.insert(initial);
 

    const res = await request(app).delete(`/api/v1/saferestareas/${safeRestArea.id}`);
    expect(res.body).toEqual(safeRestArea);

  });

});
