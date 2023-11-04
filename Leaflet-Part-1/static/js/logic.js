// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Perform a GET request to the query URL.
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // Create an array to hold the earthquake markers.
  let earthquakeMarkers = [];

  earthquakeData.forEach(function (earthquake) {
    let coordinates = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]];
    let magnitude = earthquake.properties.mag;
    let depth = earthquake.geometry.coordinates[2];

    function markerSize(magnitude) {
      return magnitude * 20000;
    }
    // Set the marker color based on depth
    let depths = [-10, 10, 30, 50, 70, 90];
    let colors = ["#FFD700", "#FFB6C1", "#FF69B4", "#FF1493", "#8B008B", "#4B0082", "#2E0854"];

    // Create a function to set marker color based on depth
    function getColor(depth) {
    for (let i = 0; i < depths.length; i++) {
        if (depth > depths[i] && depth <= depths[i + 1]) {
            return colors[i];
        }
    }
    return colors[colors.length - 1];
    }

    let marker = L.circle(coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: getColor(depth),
      fillColor: getColor(depth),
      radius: markerSize(magnitude),
    });

    marker.bindPopup(
      `Magnitude: ${magnitude}<br>Depth: ${depth} km`
    );

    earthquakeMarkers.push(marker);
  });

  // Create a layer group from the earthquake markers.
  let earthquakes = L.layerGroup(earthquakeMarkers);

  // Send the earthquake layer to the createMap function.
  createMap(earthquakes);
}

function createMap(earthquakes) {
  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [-21.977357, 80.239575], // Adjust the initial center
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}