# arcgis-oauth-connector

### Description
This is an experiment which started out as a means of testing
oAuth with ArcGIS, but has turned into an exploration of how
ArcGIS decides when to prompt for a login.

The intent was to make a node server that served up a react
component, complete with an ArcGIS 
[Map](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html) 
and 
[MapView](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html). From there, a "connect" button
would allow logging into, and retrieving data from, an AGOL instance.

However, because of inconsistencies betweeen this experiment and 
another, this one has been put on hold (for now). The question is:
Why does loading the Map and MapView on the page prompt to log into
AGOL, when in another experimental branch, it does not?
This needs to be understood before moving forward (as it's a blocker
to _both_ experiments).

### Running
At this point, it's easiest to just run the "client" locally:
- Check out the code
- `cd client; yarn; yarn start`
- You'll get prompted to log into AGOL
  - This happens in production when the global apiKey is _not_ set
  - In the other experiment, there is no prompt, even though the apiKey is not set

