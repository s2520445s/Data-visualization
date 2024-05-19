document.getElementById('swapViewButton').addEventListener('click', function() {
    const tableView = document.getElementById('tableView');
    const otherView = document.getElementById('otherView');

    if (tableView.style.display === 'none') {
        tableView.style.display = 'block';
        otherView.style.display = 'none';
    } else {
        tableView.style.display = 'none';
        otherView.style.display = 'block';
    }
});

