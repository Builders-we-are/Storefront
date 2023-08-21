<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Dropdown</title>
</head>
<body>
  <h1>Select a file:</h1>
  <form id="fileSelectForm" method="POST" action="/display">
    <select id="fileNameSelect" name="fileName">
      <% files.forEach(file => { %>
        <option value="<%= file.name %>"><%= file.name %></option>
      <% }); %>
    </select>
    <button type="button" id="displayButton">Display</button>
  </form>

  <script>
    // Get references to form elements
    const fileNameSelect = document.getElementById('fileNameSelect');
    const displayButton = document.getElementById('displayButton');
    const fileSelectForm = document.getElementById('fileSelectForm');

    // Add a click event listener to the "Display" button
    displayButton.addEventListener('click', function () {
      const selectedFileName = fileNameSelect.value;

      // Set the selected file name as a hidden input field value
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = 'fileName';
      hiddenInput.value = selectedFileName;

      // Append the hidden input to the form
      fileSelectForm.appendChild(hiddenInput);

      // Submit the form
      fileSelectForm.submit();
    });
  </script>
</body>
</html>
