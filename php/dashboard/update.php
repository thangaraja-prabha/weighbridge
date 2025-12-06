<?php
require '../db.php';
//include '../auth.php';
require '../cheader.php';
?>
<p><br><br><br></p>
<div class="row">
<div class="col-md-12">
<br>
<?php
$id=$_REQUEST['id'];
$query = "SELECT * from mlog where id='".$id."'"; 
$result = mysqli_query($con, $query);
$row = mysqli_fetch_assoc($result);
?>
<?php
$status = "";

if(isset($_POST['new']) && $_POST['new']==1)
{
date_default_timezone_set('Asia/Kolkata');
//$dept =$_REQUEST['dept'];
//$item_description1 =$_REQUEST['item_description1'];
//$nop =$_REQUEST['nop'];
//$stype =$_REQUEST['stype'];	
//$stdate = date('Y-m-d', time());
$eddate = date('Y-m-d', time());
//$stime = date('H:i:s', time());
//echo"$stime";
//exit;
$etime = date('H:i:s', time());	
$sused = $_REQUEST['sused'];
$remarks = $_REQUEST['remarks'];
$stat = $_REQUEST['stat'];
$trn_date = date("Y-m-d H:i:s");
$username = $_SESSION["username"];
$stime = $_REQUEST['stime'];

	$sql=mysqli_query($con,"select * from shifts ");
	while($res=mysqli_fetch_assoc($sql)){ 
	$stshift=$res['stshift'];
	$edshift=$res['edshift'];	
	}
	if ($stime < $stshift){
		echo $stype='A';
	} elseif ($stime > $edshift) {
		echo $stype='A';
	} elseif ($stime < $stshift) {
		echo $stype='B';
	} elseif ($stime > $edshift) {
		echo $stype='B';
	} elseif ($stime < $stshift) {
		echo $stype='C';
	} elseif ($stime > $edshift) {
		echo $stype='C';
	} elseif ($stime < $stshift) {
		echo $stype='G';
	} elseif ($stime > $edshift) {
		echo $stype='G';
	} else 
	{
	echo $stype;
	}
	

$updates="update mlog SET username='".$username."',stype='".$stype."', sused='".$sused."',remarks='".$remarks."',trn_date='".$trn_date."', eddate='".$eddate."', etime='".$etime."', stat='".$stat."' where id='".$id."'";
mysqli_query($con, $updates);
$status = "Record Updated Successfully.";
echo '<p style="color:#FF0000;">'.$status.'</p>';
}else {
?>
<center>
<form name="form" method="post" action=""> 
<input type="hidden" name="new" value="1" />
<table>
<tr>
<td align="center" bgcolor="A7AFB0" colspan=3><strong>COMPLAINT REGISTER</strong></td>
</tr>
<tr>
<td>Department</td><td><?php echo $row['dept'];?></td>
<td >
</td>
</tr>
<tr>
<td>Machine Details</td><td><?php echo $row['item_description1'];?></td>
<td ></td>
</tr>
<tr>
<td>Nature Of Problem</td><td><?php echo $row['nop'];?></td>
<td>
</td>
</tr>
<tr>
<td>Spares Used</td><td><input type="text" name="sused" required value="<?php echo $row['sused'];?>"></td></td>
<td>
</td>
</tr>
<input type="hidden" name="stype" required value="<?php echo $row['stype'];?>">
<td>Status</td>
<td><select name="stat"><option required value="<?php echo $row['stat'];?>"/>Select </option>
								<option>Pending</option>
								<option>Skipped</option>
								<option>Completed</option>
								</select></td>
</tr>
<tr>
<td>Remarks</td><td><?php echo $row['remarks'];?></td>
<td><textarea rows="4" cols="40" name="remarks" placeholder="<?php echo $row['remarks'];?>" value="<?php echo $row['remarks'];?>"></textarea></td>
</tr>
<tr>
<td align="center" bgcolor="A7AFB0" colspan="3"><input name="submit" type="submit" value="Submit" /></td>
</tr>
<tr>
<td colspan=2; align="left"; style="color:#FF0000;"><?php echo $status; ?></td></tr>
</table>
<br>
</form>
</center>
</div>
</div>
<?php } ?>
<br><br>
<?php
require("../footer.php");
?>