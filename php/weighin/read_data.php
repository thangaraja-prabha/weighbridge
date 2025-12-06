<?php
// Path to your file
$filePath = 'C:\\WindowsService\\latest_data.txt';

// Check if file exists
if (file_exists($filePath)) {
    $data = trim(file_get_contents($filePath));
    echo $data !== '' ? $data : 'No data found in file';
} else {
    echo 'File not found: ' . htmlspecialchars($filePath);
}
?>
