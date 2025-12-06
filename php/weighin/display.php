<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Live Data Display</title>
<style>
    #data {
        font-size: 90px;          /* 🔹 Adjust size here */
        font-weight: bold;
    }
</style>
<script>
let lastValue = '';

function fetchData() {
    fetch('read_data.php')
        .then(response => response.text())
        .then(data => {
            const cleanData = data.trim();
            const display = document.getElementById('data');

            // Change color based on whether value changed
            if (cleanData !== lastValue) {
                display.style.color = '#ff0000'; // 🔴 Floating value (changing)
                lastValue = cleanData;

                // After 1 second, revert to green (stable)
                setTimeout(() => {
                    display.style.color = '#00ff00'; // 🟢 Stable
                }, 1000);
            }

            display.innerText = cleanData || 'No data';
        })
        .catch(err => console.error(err));
}

setInterval(fetchData, 1000);
window.onload = fetchData;
</script>
</head>
<body>
    <div id="data">Loading...</div>
</body>
</html>
