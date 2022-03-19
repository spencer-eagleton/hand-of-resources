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
);

INSERT INTO
    bathrooms (name, status, image_url, lat, long)
 VALUES
    ('Old Town Portland Loo', 'Closed', 'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC', 45.528323, 122.689120 ),
    ('Grant Park Public Restrooms', 'Open', 'https://images.dailyhive.com/20201028132908/portland-loo-f.jpg', 45.540156, 122.630223 );