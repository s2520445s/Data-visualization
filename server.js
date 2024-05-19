const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the directory where your HTML files are located
app.use(express.static(__dirname)); // Update if your files are in a subdirectory

// Fallback to dashboard.html for Single Page Applications
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html')); // Update to point to dashboard.html
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
