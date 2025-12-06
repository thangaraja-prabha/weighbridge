<?php
require('../db.php');
include("../auth.php"); //include auth.php file on all auth pages 
?>
<?php
require("../cheader.php");
?>
<p><br><p>
<?php
include('../db.php');
$status = "";
$id=$_REQUEST['id'];
$query=mysqli_query($con,"select * from types where id='$id'");
$result=mysqli_fetch_assoc($query);

extract($result);

extract($_REQUEST);
if(isset($update))
{
date_default_timezone_set('Asia/Kolkata');
$username=$_SESSION['username'];
$trn_date = date("Y-m-d H:i:s");
$type=$_REQUEST['type'];	
	
	$query="update types SET type='$type', username='$username', trn_date='$trn_date' where id='$id'";
	mysqli_query($con,$query);	
	
//	header( "refresh:2;url=types.php" ); 
	$status = "Updated Successfully.";

}

?>
<p><br><p>
<center>
<div style='overflow: auto;'>
<p style="color:#FF0000;"><?php echo $status; ?></p>
		<form method="post" enctype="multipart/form-data">
			<table border="1" style='width:500px;'>
				<tr>
					<td>Update</tD>
					<td><input type="text" value="<?php echo $type; ?>" name="type"/></td>
				</tR>
				<tr>
			<td align="center" colspan="2">
				<input type="submit" name="update" value="Update"/>
				</td>
				</tR>
			</table>
		</form>
</div><br><br><br><br><br><br><br><br><br><br>
<p><br><br><br><br><p>	
<?php
require("../footer.php");
?>