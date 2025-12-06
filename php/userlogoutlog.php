<?php
//require("../db.php");
//include("../auth.php");
require("db.php");
include("auth.php");
//echo $_SESSION['username']; 
$username =$_SESSION['username'];
//date_default_timezone_set('Asia/Kolkata');
//$logout_trn = date("Y-m-d H:i:s");
$updatelog="SELECT * from userlog ORDER BY id DESC LIMIT 1";
//$updatelog="UPDATE userlog set logout_trn='".$logout_trn."' , id='".$id."' ";
$result = mysqli_query($con,$updatelog);
while($row = mysqli_fetch_assoc($result)) { ?>
<?php $row["id"]; 
date_default_timezone_set('Asia/Kolkata');
$logout_trn = date("Y-m-d H:i:s");
//echo "$logout_trn";
$id=$row['id'];
//echo "$id";
 $sql = "UPDATE userlog SET logout_trn='$logout_trn' WHERE id='".$id."' ";

if ($con->query($sql) === TRUE) {
   "Record updated successfully";
} 
 
}?>