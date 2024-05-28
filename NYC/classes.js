class Neighborhood {
    // if no pop, default to 1 to avoid divison by 0
    constructor(boroName, neighborhoodName, geometry, population = 1) {
        this.boroName = boroName;
        this.neighborhoodName = neighborhoodName;
        this.layer = L.geoJson(geometry);
        this.population = population;
        this.isChecked = false;
        
    }

    toggleLayer(map) {
        if(this.isChecked){
            map.addLayer(this.layer);          
        }else{
            map.removeLayer(this.layer);
        }
    }

    zoomToBounds(map) {
        map.fitBounds(this.layer.getBounds());
        this.isChecked = true;
    }

    syncCheckbox(checkbox) {
        checkbox.checked = this.checked;
    }
}
class Borough {
    constructor(name) {
        this.name = name;
        this.neighborhoods = [];
        this.layerGroup = L.featureGroup();
        this.showAll = false;
    }

    addNeighborhood(neighborhood) {
        this.neighborhoods.push(neighborhood);
        this.layerGroup.addLayer(neighborhood.layer);
    }

   

    toggleAllLayers(map, container, on){
        this.neighborhoods.forEach(neighborhood => {
            neighborhood.isChecked = on;
            neighborhood.toggleLayer(map);
        });            
        const checkboxes = container.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach(checkbox=> {
            checkbox.checked = on;
        });
        
    }

    syncCheckboxes(container, on) {
        const checkboxes = container.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach((checkbox, index) => {
            const neighborhood = this.neighborhoods[index];
            neighborhood.checked = checked;
            neighborhood.syncCheckbox(checkbox);
        });
    }

    toggleAndSync(map, container, showAll){
        const checkboxes = container.querySelectorAll('input[type=checkbox]');
        this.neighborhoods.forEach(neighborhood => {
            neighborhood.isChecked = showAll;
            neighborhood.toggleLayer(map);
        })
    }

    
}
