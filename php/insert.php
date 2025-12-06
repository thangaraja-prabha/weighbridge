<?php
require 'config.php';
require 'secure.php';
//require 'lcfailuremail.php';

date_default_timezone_set('Asia/Kolkata');
$year = date('Y', time());
$month = date('M', time());
$date = date('Y-m-d', time());
$time = date('H:i:s', time());
$datetime = date('Y-M-d H:i:s', time());

$sql = "INSERT INTO raja2560 (id, Year, Month, Date, Time, DateTime, Weight, Beltload, Speed, Flowrate, Totalizer, Conveyor, Belt, System, Battery)
		VALUES ('', '$year', '$month','$date', '$time', '$datetime', '$_GET[v1]', '$_GET[v2]', '$_GET[v3]', '$_GET[v4]', '$_GET[v5]', '$_GET[v6]', '$_GET[v7]', '$_GET[v8]', '$_GET[v9]')";

if($conn->query($sql) === TRUE) {
//	echo "New Record Created Sucessfully";
}
else {
//	echo "Error: ".$sql. "<br>". $conn-> error;
}
$conn->close();
?>