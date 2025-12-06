<?php
//require("../db.php");
require("db.php");

date_default_timezone_set('Asia/Kolkata');
$login_trn = date("Y-m-d H:i:s");
$date = date('Y-m-d', time());
$month = date('M', time());
$year = date('Y', time());
$submittedby = $_SESSION["username"];

$log="insert into userlog (`login_trn`,`date`,`month`,`year`,`submittedby`) values ('$login_trn','$date','$month','$year','$submittedby')";
		mysqli_query($con,$log);

?>