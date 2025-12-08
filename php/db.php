<?php
$s=$_SERVER['SERVER_NAME'];
if ($s=='localhost')
{
$hostname = "localhost";
$Username = "root";
$Password = "";
$dbname = "wb2025";

$con=mysqli_connect($hostname, $Username, $Password, $dbname);
if(!$con){
	die("connection failed:" .mysqli_connect_error());
}
}
else  
{
$hostname = "sg3plcpnl0204.prod.sin3.secureserver.net";
$Username = "rajawb";
$Password = "R@jawb";
$dbname = "weighbridge";
$con=mysqli_connect($hostname, $Username, $Password, $dbname);
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
}
?>