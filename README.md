# Denver Bikes [![Netlify Status](https://api.netlify.com/api/v1/badges/3714c0a4-54cd-4324-ae9d-b28cb7d3ac15/deploy-status)](https://app.netlify.com/sites/denver-bikes/deploys)

This is an interactive map of bike racks and trails and sidewalks in Denver.

![Screenshot of Denver Bikes](https://user-images.githubusercontent.com/11357045/156080572-799c0f1a-7a35-4a41-b043-1aa410566699.png "Screenshot of Denver Bikes")

## Quick start

1. Install project dependencies: `yarn install`
1. Run `yarn copy-env` to copy the `.env.local.example` contents into a new `.env.local` file. Replace `YOUR_TOKEN_HERE` with your Mapbox token.
1. Start the client: `yarn start`
1. Visit `http://localhost:3000` in your browser.

## Resources

- [Denver Existing Bicycle Facilities](https://www.denvergov.org/opendata/dataset/city-and-county-of-denver-existing-denver-bicycle-facilities)
- [Denver Bike Racks Data](https://www.denvergov.org/opendata/dataset/city-and-county-of-denver-bike-racks)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
- [Create React App](https://github.com/facebook/create-react-app)

## How to transform the data used in this project

1. Download ["City and County of Denver: Existing Denver Bicycle Facilities - Shapefile"](https://www.denvergov.org/opendata/dataset/city-and-county-of-denver-existing-denver-bicycle-facilities) and unzip the file.
1. Go to https://mapshaper.org/ and upload the .shp, .prj, and .dbf files into the tool.
1. Use the mapshaper console to filter out unneeded fields and rename fields. For 2022 data:
    * filter: `filter-fields EXISTING_F,FULLNAME,FROMNAME,TONAME,SUM_ROAD_L,SUM_BIKE_L`
    * rename: `rename-fields type=EXISTING_F,name=FULLNAME,fromStreet=FROMNAME,toStreet=TONAME,roadLength=SUM_ROAD_L,bikeLength=SUM_BIKE_L`
1. Export the filtered data.
1. Upload zipped data as a new tileset to https://studio.mapbox.com/tilesets/.

2022 DATA FORMAT:
```
FACILITYID	3166
EXISTING_F	Shared Roadway
INSTALL_YE	Pre-DMoves
YEAR_UPGRA	
PLAN_YEAR	
SUM_BIKE_L	0.73267267
SUM_ROAD_L	0.36633634
FULLNAME	CHEESMAN PARK 2
FROMNAME	E 11TH AVE/NMCHG
TONAME	E 8TH AVE
FACILITY_U	
FUNDING_SO	
INSTALL_ME
```

2020 DATA FORMAT
```
EXISTING_F	Shared Roadway
RECOMMEND_	
ACTION_TAK	ASM
YEAR_BUILT	Pre-DMoves
MILEAGE	0.73267267
FULLNAME	CHEESMAN PARK 2
FROMNAME	E 11TH AVE/NMCHG
TONAME	E 8TH AVE
NEXT_STEPS	
RECOMMEND1	
EXISTING_1	Shared Roadway
BICYCLE_FA	1
BICYCLE_PH	1
BIKELANECO	2
```
