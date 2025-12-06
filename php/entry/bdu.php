<?php
include('../db.php');
//require('../cheader.php');
$status = "";
$id=$_REQUEST['id'];
$query=mysqli_query($con,"select * from mlog where id='$id'");
$result=mysqli_fetch_assoc($query);

extract($result);

extract($_REQUEST);
if(isset($update))
{
date_default_timezone_set('Asia/Kolkata');
$username=$_SESSION['username'];
$trn_date = date("Y-m-d H:i:s");
//$stime=$_REQUEST['stime'];
//$etime=$_REQUEST['etime'];	
	
	$query="update mlog SET bdtime='$bdtime', username='$username', trn_date='$trn_date' where id='$id'";
	mysqli_query($con,$query);	
	
//	header( "refresh:2;url=depts.php" ); 
	$status = "BD Updated Successfully.";

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
					<td><input type="text" value="<?php	$a=$row['stime'];
$b=$row['etime'];
$d1 = new DateTime($a);
$d2 = new DateTime($b);	
$interval = $d1->diff($d2);
echo $diffInHours   = $interval->h; //8
echo ":";
echo $diffInMinutes = $interval->i; //23
echo ":";
echo $diffInSeconds = $interval->s; //45 ?>" name="bdtime"/></td>
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