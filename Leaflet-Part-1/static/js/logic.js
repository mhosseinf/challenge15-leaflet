// Create a Leaflet map object
let myMap = L.map("map", {
    center: [-21.977357, 80.239575],
    zoom: 3,
  });
  
  // Define base layers
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);
  
  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  });
  
  // Create an overlay object to hold earthquake data
  let overlayMaps = {
    Earthquakes: L.layerGroup([]),
  };
  
  // Add the layer control to the map
  L.control.layers({ "Street Map": street, "Topographic Map": topo }, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  
  // Function to create earthquake markers and bind popups
  function createEarthquakeMarkers(earthquakeData) {
    let earthquakeMarkers = [];
  
    earthquakeData.forEach(function (earthquake) {
      let coordinates = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]];
      let magnitude = earthquake.properties.mag;
      let depth = earthquake.geometry.coordinates[2];
  
      function markerSize(magnitude) {
        return magnitude * 10000;
      }
  
      let marker = L.circle(coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "purple",
        fillColor: "purple",
        radius: markerSize(magnitude),
      });
  
      marker.bindPopup(
        `Magnitude: ${magnitude}<br>Depth: ${depth} km`
      );
  
      earthquakeMarkers.push(marker);
    });
  
    return earthquakeMarkers;
  }
  
  // Fetch earthquake data and create earthquake markers
  let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
  
  d3.json(queryUrl).then(function (data) {
    let earthquakeMarkers = createEarthquakeMarkers(data.features);
  
    let earthquakeLayer = overlayMaps.Earthquakes;
    earthquakeLayer.clearLayers();
    earthquakeMarkers.forEach(function (marker) {
      earthquakeLayer.addLayer(marker);
    });
    overlayMaps.Earthquakes = earthquakeLayer;
    myMap.addLayer(earthquakeLayer);
  });
