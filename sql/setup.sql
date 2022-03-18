-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS bathrooms;

CREATE TABLE bathrooms (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT NOT NULL,
    image_url TEXT NOT NULL,
    lat DEC(8,6),
    long DEC(9,6)
)