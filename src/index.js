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
    navigationHelpButton: false
});

// Load and display your CZML file
const czmlPath = 'czml/your.czml';
Cesium.CzmlDataSource.load(czmlPath).then(dataSource => {
    viewer.dataSources.add(dataSource);
    viewer.zoomTo(dataSource);
});



// ... existing imports ...

const czmlDropdown = document.getElementById('czmlDropdown');
const czmlFileInput = document.getElementById('czmlFileInput');
const uploadButton = document.getElementById('uploadButton');

// ... existing code ...

// Event listener for the "Upload" button
uploadButton.addEventListener('click', () => {
    const selectedFile = czmlFileInput.files[0];
    if (selectedFile) {
        uploadCzmlFile(selectedFile);
    } else {
        console.error('No file selected for upload.');
    }
});

async function uploadCzmlFile(file) {
    try {
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('czmlFile', file);

        // Send a POST request to the server to handle the file upload
        const response = await fetch('/upload-czml', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            // File successfully uploaded, refresh the CZML file list
            populateCzmlDropdown();
        } else {
            console.error('Error uploading CZML file.');
        }
    } catch (error) {
        console.error(error);
    }
}

// ... existing code ...

