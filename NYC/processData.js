// let boroughUrl = 'https://data.cityofnewyork.us/resource/7t3b-ywvw.json';
// let neighborhoodUrl = 'https://data.cityofnewyork.us/resource/q2z5-ai38.json';


let finalData = {};

parseNeighborhoodData = (neighborhoodData) => {
    let parsedHoods = {};
    neighborhoodData.features.forEach(feature => {
        let boroName = feature.boro_name;
        let neighborhoodName = feature.ntaname;
        let geometry = feature.the_geom;
        let layer = L.geoJson(geometry)
        // create the boro key for each boro
        // add properties to each boro
        if (!parsedHoods[boroName]) {
            parsedHoods[boroName] = {
                name: boroName,
                neighborhoods: [],
                layerGroup: L.featureGroup(),

            }

        }

        // Add a click event listener to each borough layer
        parsedHoods[boroName].layerGroup.on('click', function () {
            // Toggle all neighborhood layers when a borough layer is clicked
            parsedHoods[boroName].neighborhoods.forEach(neighborhood => {
                neighborhood.layer.eachLayer(neighborhoodLayer => {
                    neighborhoodLayer.setStyle({ opacity: neighborhoodLayer.options.opacity ? 0 : 1 });
                });
            });
        });

        // add elements to neighborhoods properties
        parsedHoods[boroName].neighborhoods.push(
            {
                boroName: boroName,
                neighborhoodName: neighborhoodName,
                geometry: geometry,
                layer: layer,
                checked: false,
            }
        );

        parsedHoods[boroName].layerGroup.addLayer(layer); // Add neighborhood layers to each boro's layer group
    })
    finalData = parsedHoods;
    return parsedHoods;
}

fetchData = async (url) => {
    try {
        let response = await fetch(url);
        if(response.ok){
            let data = await response.json();
            return turf.featureCollection(data);
        }else{
            alert('data api down, check back later');
            throw new Error('Failed to retrieve neighborhood data');  
        }
    } catch (error) {
        console.error('Error:', error.message);
    } 
}