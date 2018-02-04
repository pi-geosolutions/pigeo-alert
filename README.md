# Build
```
mvn clean install
```
# UI

```
cd src/main/webapp/alert-ui
npm install
ng serve
```

# Postgis Raster

FOSS4G Tutorial
https://github.com/pedrogit/postgis_workshop/blob/master/postgis_workshop.sql

## Postigs Addons
https://raw.githubusercontent.com/pedrogit/postgis_workshop/master/postgisaddons-1.35/postgis_addons.sql

## Settings
```
SET postgis.enable_outdb_rasters TO True;
SET postgis.gdal_enabled_drivers = 'ENABLE_ALL';
```

## Insert Raster

```
-- -t split the raster into small tiles
-- -I create a spatial index on the tiles
-- -C add all the constraint necessary to display metadata in the raster_columns table
-- -x prevent adding the max extent constraint (which is long to add) so we can append raster to the table afterward
-- -Y make loading MUCH faster by using copy statements instead of insert statements
```
```
raster2pgsql -s 4326 -t 10x10 -I -C -x -Y "/home/florent/dev/DATA_DIR/lastrain.tif" rain_10x10 | psql -U postgres -d "eumetsat"
```

# Setup Infra
## SMS

ServerSMS

```
sudo apt-get install smstools

sudo apt-get install mailutils
