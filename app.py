from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/hi')
def hi_nigeria():
    return 'Hi Nigeria'


if __name__ == '__main__':
    app.run()



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Content</title>
  <script src="https://cesium.com/downloads/cesiumjs/releases/1.86/Build/Cesium/Cesium.js"></script>
  <style>
    /* Add your CSS styles here */
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    
    #cesiumContainer {
      width: 100%;
      height: 100vh; /* 100% of viewport height */
    }
    
    /* Style for the dropdown */
    .dropdown-container {
      text-align: center;
      padding: 10px;
      background-color: #f0f0f0;
    }

    select {
      width: 100%;
      max-width: 400px;
      padding: 10px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <h1>File: <%= fileName %></h1>
  <div id="cesiumContainer"></div>

  <!-- Dropdown to select a different file -->
  <div class="dropdown-container">
    <h2>Select a different file:</h2>
    <form method="POST" action="/display">
      <select name="fileName" onchange="this.form.submit()">
        <% files.forEach(file => { %>
          <option value="<%= file.name %>" <%= (file.name === fileName) ? 'selected' : '' %>><%= file.name %></option>
        <% }); %>
      </select>
    </form>
  </div>

  <script>
    // Get the selected file name
    const selectedFileName = "<%= fileName %>";

    // Load CZML content based on the selected file name (you may need to fetch it from the server)
    // For demonstration, we assume that you have a mapping of file names to their CZML content.
    const czmlContentMap = {
      "file1": `<%- fileContentForFile1 %>`,
      "file2": `<%- fileContentForFile2 %>`,
      // Add more file names and corresponding CZML content here
    };

    // Retrieve the CZML content for the selected file
    const czml = czmlContentMap[selectedFileName];

    if (czml) {
      // Initialize Cesium Viewer
      const viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        infoBox: false,
        fullscreenButton: false,
        vrButton: false,
        timeline: false,
      });

      // Add the CZML data source
      viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));
    } else {
      console.error(`CZML content for file "${selectedFileName}" not found.`);
    }
  </script>
</body>
</html>
