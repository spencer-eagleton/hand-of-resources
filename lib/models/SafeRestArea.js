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

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            safe_rest_areas
        `
    );
    return rows.map((row) => new SafeRestArea(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      From
        safe_rest_areas
      WHERE
        id=$1
      `,
      [id]
    );
    return new SafeRestArea(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentArea = await SafeRestArea.findById(id);

    const newAttributes = { ...currentArea, ...attributes };
    const { name, status, imageURL, lat, long } = newAttributes;
    const { rows } = await pool.query(
      `
      UPDATE
        safe_rest_areas
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
    return new SafeRestArea(rows[0]);
  }

};
