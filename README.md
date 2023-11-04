# challenge15-leaflet

# Earthquake Map using Leaflet and D3

This project displays earthquake data on an interactive map using Leaflet and D3.

## Java script Code Structure

The code is divided into the following key sections:

###. **Data Retrieval**
In this section, the code retrieves earthquake data from a specified API endpoint and passes the data to the createFeatures function.
      // Store our API endpoint as queryUrl.
   let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

   // Perform a GET request to the query URL.
   d3.json(queryUrl).then(function (data) {
     // Once we get a response, send the data.features object to the createFeatures function.
     createFeatures(data.features);
   });



### Colour and Depth Definitions
This part defines depth ranges and their associated colours for earthquake markers.

This part defines depth ranges and their associated colors for earthquake markers.
// Set the marker colour based on depth
let depths = [-10, 10, 30, 50, 70, 90];
let colors = ["#FFD700", "#FFB6C1", "#FF69B4", "#FF1493", "#8B008B", "#4B0082", "#2E0854"];



### Creating Earthquake Markers
This section defines the createFeatures function that processes earthquake data and creates markers with information about each earthquake. These markers are then added to a layer group.

function createFeatures(earthquakeData) {
  // Create an array to hold the earthquake markers.
  let earthquakeMarkers = [];

  earthquakeData.forEach(function (earthquake) {
    // Extract earthquake data, calculate marker size and color based on depth,
    // bind popup information, and add the marker to the array.
  });

  // Create a layer group from the earthquake markers.
  let earthquakes = L.layerGroup(earthquakeMarkers);

  // Send the earthquake layer to the createMap function.
  createMap(earthquakes);
}




### Creating the Map and Legend
The createMap function initialises the map, defines base layers, creates a layer control for switching between different map views, and generates a legend that provides information about depth ranges and associated colours.

javascript
function createMap(earthquakes) {
  // Create the base layers.
  // Define base maps and overlay maps.
  // Initialize the map with specified settings.
  // Create a layer control for switching between base and overlay maps.
  // Create a legend for depth and associated colours.
}


## HTML Code
No changes in the HTML file are required.

## Custom CSS Styles
The appearance of the map's legend was handled by modifying the CSS styles in the provided style.css file. The existing CSS styles are tailored for the legend and can be further customised to match your preferences.


