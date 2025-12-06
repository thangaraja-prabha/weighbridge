<?php
require('../db.php');
include("../auth.php");
$id=$_REQUEST['id'];
$query = "SELECT * from users where id='".$id."'"; 
$result = mysqli_query($con, $query) or die ( mysqli_error());
$row = mysqli_fetch_assoc($result);
?>
<?php
require("../cheader.php");
?>
<p><br></p>
<center>
<?php
$status = "";
if(isset($_POST['new']) && $_POST['new']==1)
{
$id=$_REQUEST['id'];
date_default_timezone_set('Asia/Kolkata');
    $submittedby = $_SESSION["username"];
	$empname = $_REQUEST['empname'];
	$empdest = $_REQUEST['empdest'];
	$empcode = $_REQUEST['empcode'];
	$dob = $_REQUEST['dob'];
	$doj = $_REQUEST['doj'];
	$email = $_REQUEST['email'];
	$mobile = $_REQUEST['mobile'];
	$created_at = date("Y-m-d H:i:s");

$update="update users set empname='".$empname."', empdest='".$empdest."', empcode='".$empcode."', dob='".$dob."',doj='".$doj."', email='".$email."', mobile='".$mobile."', created_at='".$created_at."' where id='".$id."'";
		$status = "Employee Details Updated Sucessfully.</br></br>";
mysqli_query($con, $update) or die(mysqli_error());
$status = "Employee Details Updated Sucessfully.</br></br>";
echo '<p style="color:#FF0000;">'.$status.'</p>';
}else {

?>
<br>
<p align="left"; style="color:#FF0000;"><?php echo $status; ?></p>
<form name="form" method="post" action=""> 
<input type="hidden" name="new" value="1" />
	<table>
	<tr>
    <td bgcolor="#bfbfbf" colspan=3; align="center"><strong>EMPLOYEE DETAILS</strong></td>
    </tr>
	<tr>
	<td align="left">Emp Name</td>
	<td><?php echo $row['empname'];?></td>
	<td align="left"><input type="text" name="empname" value="<?php echo $row['empname'];?>" /></td>
	</tr>
	<tr>
	<td align="left">Emp Designation</td>
	<td><?php echo $row['empdest'];?></td>
	<td align="left"><input type="text" name="empdest" value="<?php echo $row['empdest'];?>" /></td>
    </tr>
	<tr>
	<td align="left">Emp Code</td>
	<td><?php echo $row['empcode'];?></td>
		<td align="left"><input type="text" name="empcode" readonly value="<?php echo $row['empcode'];?>" /></td>
    </tr>
	<tr>
	<td align="left">Username</td>
	<td colspan=2><?php echo $row['username'];?></td>
    </tr>
	<tr>
    <td align="left">DOB</td>
	<td><?php echo $row["dob"];?></td>
	<td align="left"><input type="text" name="dob" placeholder="DD-MM-YYYY" required value="<?php echo $row["dob"];?>" /></td>
	<tr>
	<tr>
<td>AGE</td><td colspan=2>
<?php
$dob = date('d-m-Y', strtotime( $row["dob"] ));
date_default_timezone_set('Asia/Kolkata');
$date = date('d-m-Y', time());

   $diff = abs(strtotime($date)- strtotime($dob));
   

   $years = floor($diff/(365*60*60*24));
   $months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));
   $days = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24) / (60*60*24));

   printf("%d YRS, %d MONTHS, %d DAYS\n", $years, $months, $days);

?></td>
</tr>
    </tr>
	<tr>
    <td align="left">DOJ</td>
	<td><?php echo $row["doj"];?></td>
		<td align="left"><input type="text" name="doj" placeholder="DD-MM-YYYY" required value="<?php echo $row["doj"];?>" /></td>
	
    </tr>
<tr>
<td>EXP</td><td colspan=2>
<?php
$doj = $row["doj"];
date_default_timezone_set('Asia/Kolkata');
$date = date('d-m-Y', time());

   $diff = abs(strtotime($date)- strtotime($doj));
   

   $years = floor($diff/(365*60*60*24));
   $months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));
   $days = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24) / (60*60*24));

   printf("%d YRS, %d MONTHS, %d DAYS\n", $years, $months, $days);

?>
</td>
</tr>
	<tr>
    <td align="left">Email</td>
	<td colspan=2;><?php echo $row['email'];?></td>
    </tr>
	<tr>
    <td align="left">Mobile</td>
	<td><?php echo $row['mobile'];?></td>
	<td align="left"><input type="float" name="mobile" value="<?php echo $row['mobile'];?>" /></td>
    </tr>
<tr>
<td>Photo </td>
<td align="center">
<?php
      	echo "<img src='../employees/".$row['imagetitle']."' >";
?></td>
	<td align="left"><input type="file" name="imagetitle" value="<?php echo $row['imagetitle'];?>" /></td>
	</tr>
	<tr>
    <td bgcolor="#bfbfbf" colspan=3; align="center"><button class="btn btn-success" type="upload" name="upload">UPDATE RECORDS</button></td>
    </tr>
	</table>
	</form>
<?php } ?>
</div>
</center>

<?php
require("../footer.php");
?>