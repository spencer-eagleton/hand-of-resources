const pool = require('../utils/pool');

module.exports = class WaterStation {
  id;
  name;
  status;
  imageURL;
  lat;
  long;
  
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.status = row.status;
    this.imageURL = row.image_url;
    this.lat = row.lat;
    this.long = row.long;
  }

  static async insert({ name, status, imageURL, lat, long }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
              water_stations (name, status, image_url, lat, long)
            VALUES
              ($1, $2, $3, $4, $5)
            RETURNING
              *
            `,
      [name, status, imageURL, lat, long]
    );
    return new WaterStation(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            water_stations
        `
    );
    return rows.map((row) => new WaterStation(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      From
        water_stations
      WHERE
        id=$1
      `,
      [id]
    );
    return new WaterStation(rows[0]);
  }

};
