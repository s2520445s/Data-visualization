document.getElementById('swapViewButton').addEventListener('click', function() {
    const chart = document.querySelector('.chart');
    if (chart.textContent === 'CHART PLACEHOLDER') {
        chart.textContent = 'OTHER VIEW PLACEHOLDER';
    } else {
        chart.textContent = 'CHART PLACEHOLDER';
    }
});
