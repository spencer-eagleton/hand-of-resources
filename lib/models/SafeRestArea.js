const pool = require('../utils/pool');

module.exports = class SafeRestArea {
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
              safe_rest_areas (name, status, image_url, lat, long)
            VALUES
              ($1, $2, $3, $4, $5)
            RETURNING
              *
            `,
      [name, status, imageURL, lat, long]
    );
    return new SafeRestArea(rows[0]);
  }

};
