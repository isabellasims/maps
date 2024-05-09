class Neighborhood {
    constructor(boroName, neighborhoodName, geometry) {
        this.boroName = boroName;
        this.neighborhoodName = neighborhoodName;
        this.layer = L.geoJson(geometry);
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
        this.checked = true;
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

    toggleAll(map, checked) {
        if (checked) {
            map.addLayer(this.layerGroup);
        } else {
            map.removeLayer(this.layerGroup);
        }
        this.neighborhoods.forEach(neighborhood => {
            neighborhood.checked = checked;
            neighborhood.toggleLayer(map);
        });
    }

    syncCheckboxes(container, checked) {
        const checkboxes = container.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach((checkbox, index) => {
            const neighborhood = this.neighborhoods[index];
            neighborhood.checked = checked;
            neighborhood.syncCheckbox(checkbox);
        });
    }
}
