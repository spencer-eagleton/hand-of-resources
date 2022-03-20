const pool = require('../utils/pool');

module.exports = class Bathroom {
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
            bathrooms (name, status, image_url, lat, long)
          VALUES
            ($1, $2, $3, $4, $5)
          RETURNING
            *
          `,
      [name, status, imageURL, lat, long]
    );
    return new Bathroom(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            bathrooms
        `
    );
    return rows.map((row) => new Bathroom(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      From
        bathrooms
      WHERE
        id=$1
      `,
      [id]
    );
    return new Bathroom(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentBathroom = await Bathroom.findById(id);

    const newAttributes = { ...currentBathroom, ...attributes };
    const { name, status, imageURL, lat, long } = newAttributes;
    const { rows } = await pool.query(
      `
      UPDATE
        bathrooms
      SET
        name=$1,
        status=$2,
        image_url=$3,
        lat=$4,
        long=$5
      WHERE
        id=$6
      RETURNING
        *
      `,
      [name, status, imageURL, lat, long, id]
    );
    return new Bathroom(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        bathrooms
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]

    );
    return new Bathroom(rows[0]);
  }

};
