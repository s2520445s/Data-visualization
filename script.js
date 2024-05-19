// Function to save settings to Local Storage
function saveSettings(view) {
    localStorage.setItem('dataVizView', view);
}

// Function to load settings from Local Storage
function loadSettings() {
    return localStorage.getItem('dataVizView') || 'table';
}

document.getElementById('swapViewButton').addEventListener('click', function() {
    const tableView = document.getElementById('tableView');
    const otherView = document.getElementById('otherView');

    // Determine the current and new view
    const currentView = tableView.style.display === 'none' ? 'other' : 'table';
    const newView = currentView === 'table' ? 'other' : 'table';

    // Update the visibility of the views
    tableView.style.display = newView === 'table' ? 'block' : 'none';
    otherView.style.display = newView === 'table' ? 'none' : 'block';

    // Save the new view setting to Local Storage
    saveSettings(newView);
});

// Load settings on page load
window.addEventListener('load', function() {
    const savedView = loadSettings();
    const tableView = document.getElementById('tableView');
    const otherView = document.getElementById('otherView');

    // Apply the saved view setting
    tableView.style.display = savedView === 'table' ? 'block' : 'none';
    otherView.style.display = savedView === 'table' ? 'none' : 'block';
});
