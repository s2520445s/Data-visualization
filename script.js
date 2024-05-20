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

// Tooltips for film descriptions
const filmDescriptions = {
    'Blood & Water': 'A local teen uncovers her family\'s secret past and navigates life in South African high school.',
    'Midnight Mass': 'An isolated island community experiences miraculous events and frightening omens after the arrival of a charismatic, mysterious young priest.',
    'Avvai Shanmughi': 'A hilarious drama where a man disguises himself as a nanny to be closer to his daughter.',
    'Tango With Me': 'A couple must navigate the complexities of marriage and forgiveness after a traumatic event.',
    'Last Chance U': 'Elite athletes in tough life circumstances seek to find their redemption on a junior college football team.'
};

function createTooltips() {
    const filmTitles = document.querySelectorAll('.tooltip');
    filmTitles.forEach(title => {
        const filmName = title.textContent;
        if (filmDescriptions[filmName]) {
            const tooltipText = document.createElement('span');
            tooltipText.className = 'tooltiptext';
            tooltipText.textContent = filmDescriptions[filmName];
            title.appendChild(tooltipText);

            title.addEventListener('click', function() {
                document.querySelectorAll('.tooltip .tooltiptext.click-visible').forEach(tooltip => {
                    if (tooltip !== tooltipText) {
                        tooltip.classList.remove('click-visible');
                    }
                });
                tooltipText.classList.toggle('click-visible');
            });
        }
    });
}

// Load settings and initialize chart on page load
window.addEventListener('load', function() {
    currentChartIndex = parseInt(loadSettings(), 10);

    if (isNaN(currentChartIndex) || currentChartIndex < 0 || currentChartIndex >= chartTypes.length) {
        currentChartIndex = 0;
    }

    initializeChart(chartTypes[currentChartIndex]);
    createTooltips();  // Initialize tooltips after the page loads
});

// Event listener for swapping chart view
document.getElementById('swapViewButton').addEventListener('click', function() {
    currentChartIndex = (currentChartIndex + 1) % chartTypes.length;
    initializeChart(chartTypes[currentChartIndex]);
    saveSettings(currentChartIndex);
});
