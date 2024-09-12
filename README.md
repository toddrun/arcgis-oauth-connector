# arcgis-oauth-connector

### Description
This was an experiment which started out as a means of testing
oAuth with ArcGIS, but turned into an exploration of how
ArcGIS decides when to prompt for a login.

While basemaps from https://developers.arcgis.com/rest/basemap-styles/
require location services, which require an Esri API key to use, there
are a handful of values which are "free" (no key required).

This branch simply demonstrates how free basemaps can be used to display
a Map without requiring login. It also shows how using a non-free option
will prompt for login before rendering the map.

### Running
Checkout out the repo and then `yarn; yarn start`. That should take care
of everything you need!
