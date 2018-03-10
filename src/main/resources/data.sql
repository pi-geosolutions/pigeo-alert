CREATE OR REPLACE VIEW zones_buffer_30 AS
  SELECT ST_Transform(ST_Buffer(ST_Transform(geom, 3857), 30000), 4326)::geometry(Geometry, 4326) As the_geom, id, name
  FROM zones;

CREATE OR REPLACE VIEW zones_buffer_50 AS
  SELECT ST_Transform(ST_Buffer(ST_Transform(geom, 3857), 50000), 4326)::geometry(Geometry, 4326) As the_geom, id, name
  FROM zones;
