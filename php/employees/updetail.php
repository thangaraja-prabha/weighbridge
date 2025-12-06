<?php
require('../db.php');
include("../auth.php");
$id=$_REQUEST['id'];
$query = "SELECT * from users where id='".$id."'"; 
$result = mysqli_query($con, $query) or die ( mysqli_error());
$row = mysqli_fetch_assoc($result);

if(isset($_POST['new']) && $_POST['new']==1)
{
$id=$_REQUEST['id'];
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$empname =$_REQUEST['empname'];	
$empdest = $_REQUEST['empdest'];	
$empcode =$_REQUEST['empcode'];
$dob = $_REQUEST['mobile'];	
$doj = $_REQUEST['location'];
$email = $_REQUEST['actdate'];	
$mobile = $_REQUEST['yestdue'];
$submittedby = $_SESSION["username"];	
$created_at = date("Y-m-d H:i:s");

$update="select * from users where id='".$id."'";
}else {
?>
<form ="form" method="post" action=""> 
<div class="row">
<br>
<div class="col-md-7">
<br>
<table border="1" style='width:90%;:left;margin-left:5%'>
<center><tr><td colspan=6><a target="_blank" href=""><img src="../SW_logo_W_Report.jpg"></a></td></tr></center>
<input ="id" type="hidden" ="<?php echo $row['id'];?>" />
<tr><td colspan=6; bgcolor="A7AFB0" align="center"> EMPLOYEE PERSONAL DETAIL </td></tr>
<tr>
<td>Employee Designation</td><td><?php echo $row['empdest'];?></td>
</tr>
<tr>
<td>Employee Code</td><td><?php echo $row['empcode'];?></td>
</tr>
<tr>
<td>Username</td><td><?php echo $row['username'];?></td>
</tr>
<tr>
<td>Email</td><td><?php echo $row['email'];?></td>
</tr>
<tr>
<td>Mobile</td><td><?php echo $row['mobile'];?></td>
</tr>
<tr>
<td>Last Update on</td><td colspan=2><?php echo $row['created_at'];?></td>
</tr>
<tr>
<td>Printed on</td><td colspan=2><?php date_default_timezone_set('Asia/Kolkata'); echo date('Y-m-d') . " at " . date('H:i:s'); ?> </td>
</tr>
<tr>
<tr><td colspan=4; bgcolor="A7AFB0" align="center">  </td></tr>
<?php } ?>
</table>
</div>

</div>
<center>
<?php
require("../footer.php");
?>
</center>