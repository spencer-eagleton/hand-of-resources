-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS bathrooms;
DROP TABLE IF EXISTS water_stations;
DROP TABLE IF EXISTS safe_rest_areas;
DROP TABLE IF EXISTS free_items;
DROP TABLE IF EXISTS lost_items;



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



CREATE TABLE water_stations (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT NOT NULL,
    image_url TEXT NOT NULL,
    lat DEC(8,6),
    long DEC(9,6)
);


INSERT INTO
    water_stations (name, status, image_url, lat, long)
 VALUES
    ('Rest Stop Water Station', 'Free', 'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC', 45.528323, 122.689120 ),
    ('Safeway Water Station', 'Paid', 'https://images.dailyhive.com/20201028132908/portland-loo-f.jpg', 45.540156, 122.630223 );


CREATE TABLE safe_rest_areas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT NOT NULL,
    image_url TEXT NOT NULL,
    lat DEC(8,6),
    long DEC(9,6)
);

INSERT INTO
    safe_rest_areas (name, status, image_url, lat, long)
VALUES
    ('Gee Creek Safety Rest Area', 'Unregulated', 'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC', 45.528323, 122.689120 ),
    ('Evergreen Transit Rest Area', 'Regulated', 'https://images.dailyhive.com/20201028132908/portland-loo-f.jpg', 45.540156, 122.630223 );


CREATE TABLE free_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT NOT NULL,
    image_url TEXT NOT NULL,
    lat DEC(8,6),
    long DEC(9,6)
);

INSERT INTO
    free_items (name, status, image_url, lat, long)
VALUES
    ('Wooden Table', 'Available', 'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC', 45.528323, 122.689120 ),
    ('Plywood', 'Unavailable', 'https://images.dailyhive.com/20201028132908/portland-loo-f.jpg', 45.540156, 122.630223 );

CREATE TABLE lost_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT NOT NULL,
    image_url TEXT NOT NULL,
    lat DEC(8,6),
    long DEC(9,6)
);

INSERT INTO
    lost_items (name, status, image_url, lat, long)
VALUES
    ('1998 Honda Civic', 'Stationary', 'https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC', 45.528323, 122.689120 ),
    ('Orange Cat', 'Mobile', 'https://images.dailyhive.com/20201028132908/portland-loo-f.jpg', 45.540156, 122.630223 );
