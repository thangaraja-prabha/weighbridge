<?php 
// (A) DATABASE SETTINGS
// ! CHANGE SETTINGS TO YOUR OWN
$dbhost = "sg2plzcpnl489762.prod.sin2.secureserver.net";
$dbname = "swmgp";
$dbchar = "utf8";
$dbuser = "valspar";
$dbpass = "V@lspar123";

// (B) SETTINGS
$prvalid = 300; // Password reset is valid for 300 seconds

// (C) CONNECT TO DATABASE
try {
  $pdo = new PDO(
    "mysql:host=$dbhost;dbname=$dbname;charset=$dbchar",
    $dbuser, $dbpass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
  );
} catch (Exception $ex) {
  die($ex->getMessage());
}