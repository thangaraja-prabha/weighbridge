<?php
$logFile = 'C:\\WindowsService\\log.txt';

if (file_exists($logFile)) {
    $lines = file($logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $lastLines = array_slice($lines, -50); 
    echo implode("\n", $lastLines);
} else {
    echo "⚠️ Log file not found: $logFile";
}
?>
