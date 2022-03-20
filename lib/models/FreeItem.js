const pool = require('../utils/pool');

module.exports = class FreeItem {
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
              free_items (name, status, image_url, lat, long)
            VALUES
              ($1, $2, $3, $4, $5)
            RETURNING
              *
            `,
      [name, status, imageURL, lat, long]
    );
    return new FreeItem(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            free_items
        `
    );
    return rows.map((row) => new FreeItem(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      From
        free_items
      WHERE
        id=$1
      `,
      [id]
    );
    return new FreeItem(rows[0]);
  }


  static async updateById(id, attributes) {
    const currentItem = await FreeItem.findById(id);

    const newAttributes = { ...currentItem, ...attributes };
    const { name, status, imageURL, lat, long } = newAttributes;
    const { rows } = await pool.query(
      `
      UPDATE
        free_items
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
    return new FreeItem(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        free_items
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]

    );
    return new FreeItem(rows[0]);
  }

};
