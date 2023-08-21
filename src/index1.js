import 'cesium/Build/Cesium/Widgets/widgets.css';
import Cesium from 'cesium/Build/Cesium/Cesium';

const viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
});

const czmlDropdown = document.getElementById('czmlDropdown');

async function populateCzmlDropdown() {
    try {
        const response = await fetch('/czml-list');
        const czmlList = await response.json();

        czmlList.forEach((file) => {
            const option = document.createElement('option');
            option.value = file._id; // Use the unique _id as the value
            option.textContent = file.name; // Display the CZML file name
            czmlDropdown.appendChild(option);
        });

        // Add an event listener to load the selected CZML file
        czmlDropdown.addEventListener('change', async () => {
            const selectedId = czmlDropdown.value;
            const czmlPath = `/czml/${selectedId}`;
            loadCzmlFile(czmlPath);
        });
    } catch (error) {
        console.error(error);
    }
}

async function loadCzmlFile(czmlPath) {
    viewer.dataSources.removeAll(); // Clear existing CZML data

    try {
        const response = await fetch(czmlPath);
        const { czmlData } = await response.json();

        // Load and display the selected CZML file
        Cesium.CzmlDataSource.load(czmlData).then((dataSource) => {
            viewer.dataSources.add(dataSource);
            viewer.zoomTo(dataSource);
        });
    } catch (error) {
        console.error(error);
    }
}

// Call the function to populate the dropdown on page load
populateCzmlDropdown();
