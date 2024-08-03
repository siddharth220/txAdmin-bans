// Function to convert Unix timestamp to a human-readable date
function formatDate(timestamp) {
    if (timestamp === null) return 'N/A'; // Handle null timestamps
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Function to extract the primary license from the ids array
function extractPrimaryLicense(ids) {
    const licenseEntry = ids.find(id => id.startsWith('license:'));
    return licenseEntry ? licenseEntry.split(':')[1] : 'N/A';
}

// Function to format the IDs array for display
function formatIds(ids) {
    if (!Array.isArray(ids) || ids.length === 0) return 'N/A'; // Handle non-array or empty array
    return ids.join('<br>'); // Join all IDs with line breaks for better readability
}

// Function to format the HWIDs array for display
function formatHwids(hwids) {
    if (!Array.isArray(hwids) || hwids.length === 0) return 'N/A'; // Handle non-array or empty array
    return hwids.join('<br>'); // Join all HWIDs with line breaks for better readability
}

// Function to populate the table with action data
function populateActionTable(actions) {
    const tableBody = document.getElementById('actionTable').querySelector('tbody');

    // Clear existing table rows if any
    tableBody.innerHTML = '';

    actions.forEach(action => {
        if (action.type === 'ban' || action.type === 'warn') {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${action.id}</td>
                <td>${action.type.charAt(0).toUpperCase() + action.type.slice(1)}</td>
                <td>${action.playerName}</td>
                <td>${formatIds(action.ids)}</td>
                <td>${formatHwids(action.hwids)}</td>
                <td>${action.reason}</td>
                <td>${action.author}</td>
                <td>${formatDate(action.timestamp)}</td>
                <td>${action.expiration ? 'Yes' : 'No'}</td>
                <td>${formatDate(action.revocation.timestamp)}</td>
                <td>${action.revocation.author ? action.revocation.author : 'N/A'}</td>
            `;

            tableBody.appendChild(row);
        }
    });
}

// Fetch the JSON data from the file
fetch("playersDB.json")
  .then((response) => response.json())
  .then((data) => {
    populateActionTable(data.actions);
  })
  .catch((error) => console.error("Error loading JSON data:", error));
