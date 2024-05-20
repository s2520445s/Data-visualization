const chartTypes = ['bar', 'line', 'pie', 'doughnut', 'radar'];
let currentChartIndex = 0;
let chartInstance;

// Function to save settings to Local Storage
function saveSettings(viewIndex) {
    localStorage.setItem('dataVizView', viewIndex);
}

// Function to load settings from Local Storage
function loadSettings() {
    return localStorage.getItem('dataVizView') || 0;
}

// Function to initialize the chart
function initializeChart(chartType) {
    console.log(`Initializing chart of type: ${chartType}`);  // Debug logging
    const ctx = document.getElementById('chartCanvas').getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }

    if (!chartType || !chartTypes.includes(chartType)) {
        console.error(`Invalid chart type: ${chartType}`);  // Debug logging for invalid chart type
        return;
    }

    // Sample data for the chart
    const data = {
        labels: ['Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5'],
        datasets: [{
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Options for the chart
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: `Chart Type: ${chartType.charAt(0).toUpperCase() + chartType.slice(1)}`
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                display: chartType !== 'pie' && chartType !== 'doughnut' && chartType !== 'radar'
            }
        }
    };

    // Initialize the new chart
    chartInstance = new Chart(ctx, {
        type: chartType,
        data: data,
        options: options
    });
}

document.getElementById('swapViewButton').addEventListener('click', function() {
    currentChartIndex = (currentChartIndex + 1) % chartTypes.length;
    initializeChart(chartTypes[currentChartIndex]);
    saveSettings(currentChartIndex);
});

// Load settings on page load
window.addEventListener('load', function() {
    currentChartIndex = parseInt(loadSettings(), 10);

    if (isNaN(currentChartIndex) || currentChartIndex < 0 || currentChartIndex >= chartTypes.length) {
        currentChartIndex = 0;
    }

    initializeChart(chartTypes[currentChartIndex]);
});
