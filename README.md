# Develop
## Angular CLI
Build web static resources
```shell
cd src/main/webapp/alert-ui
npm install
ng serve
```
localhost:4200

## sprint boot
Add spring-boot runner in Intellij

# Deploy in tomcat
pom.xml configuration:

```xml
<packaging>war</packaging>
..
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>
```

Build ui for tomcat mode.
```shell
cd src/main/webapp/alert-ui
ng build --base-href

```

Build war
```shell
mvn package -DskipTests
```

Then push war in tomcat

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
```shell
raster2pgsql -s 4326 -t 10x10 -C -x -Y "/home/florent/dev/DATA_DIR/lastrain.tif" rain_10x10 | psql -U postgres -d "eumetsat"
```

# Setup Infra
## SMS

ServerSMS

```shell
sudo apt-get install smstools
sudo apt-get install mailutils
```

# Weather Alert

To Trigger a process analyse, you have to push a config file in a specific folder.
Here an example of config file for incoming rain alert
```
process=bufferRainProcessService
tablename=lastrain
threshold=10
smtpuser=pigeo.alert
smtppassword=********
```