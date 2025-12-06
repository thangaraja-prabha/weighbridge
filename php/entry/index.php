<?php
require '../db.php';
//include '../auth.php';
require '../cheader.php';
?>
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        *********************************************************************************************************************************************************** -->
    <!--main content start-->
    <section id="main-content">
      <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Maintenance Logs</h3>
        <div class="row mt">
          <div class="col-lg-12">
            <div class="content-panel">
              <h4><i class="fa fa-angle-right"></i> Data Entry </h4>
              <section id="unseen">
<div style='overflow: auto;'> 
<?php
    include "../db.php";  // Using database connection file here
	$username = $_SESSION['username'];

	$sql=mysqli_query($con,"select * from users  Where username='". $username ."' ");
	while($res=mysqli_fetch_assoc($sql))
	{
	$rights=$res['rights'];
//	$submittedby = $_SESSION['username'];	
//		echo "$rights";
//		exit;
//				$type = "Service";
if ($rights=='Users')
{
    
require('../db.php');

$status = "";
if(isset($_POST['new']) && $_POST['new']==1)
{
date_default_timezone_set('Asia/Kolkata');
date_default_timezone_set('Asia/Kolkata');
$dept =$_REQUEST['dept'];
$item_description1 =$_REQUEST['item_description1'];
$nop =$_REQUEST['nop'];
$stype = $_REQUEST['stype'];	
$stdate = $_REQUEST['stdate'];
//$stdate = date('Y-m-d', time());
$eddate = $_REQUEST['stdate'];
$stime = $_REQUEST['stime'];
//$stime = date('H:i:s', time());
//echo"$stime";
//exit;
$etime =$_REQUEST['etime'];	
//$bdtime = $_REQUEST['bdtime'];	
$sused = $_REQUEST['sused'];
$remarks = $_REQUEST['remarks'];
$stat = $_REQUEST['stat'];
//$stat = 'Pending';
$trn_date = date("Y-m-d H:i:s");
$username = $_REQUEST['username'];

$ins_query="insert into mlog (`dept`,`item_description1`,`nop`,`stdate`,`eddate`,`stime`,`etime`,`sused`,`stype`,`stat`,`remarks`,`username`,`trn_date`) 
values ('$dept','$item_description1','$nop','$stdate','$eddate','$stime','$etime','$sused','$stype','$stat','$remarks','$username','$trn_date')";
		mysqli_query($con,$ins_query);
		$status = "Updated Sucessfully.</br></br>";	
//require_once 'bdu.php';		
}
?>
<div style='overflow: auto;'> 
<center>
<form name="form" method="post" action=""> 
<input type="hidden" name="new" value="1" />
<table class="table table-bordered table-striped table-condensed">
<thead>
<tbody>
<tr>
<td align="center" bgcolor="A7AFB0" colspan=4><strong>BREAKDOWN REGISTER</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td>Breakdown Date</td>
<td>
<input class="form-control form-control-inline input-medium default-date-picker" size="16" type="text" name="stdate" required value=""></td></tr>
<tr><td>Breakdown Start Time</td><td><input type="text" name="stime" class="form-control timepicker-24" required value=""></td></tr>
<tr><td>Breakdown End Time</td><td><input type="text" name="etime" class="form-control timepicker-24" required value="">
</td>
</tr>
<tr>
<td>Department</td>
<td><select name="dept" required >
    <option value required>-- Select --</option>
    <?php
        include "../db.php";  // Using database connection file here
$id=$sessionId;
$query = "SELECT * from depts where id='".$id."'"; 
$result = mysqli_query($con, $query) or die ( mysqli_error());
$row = mysqli_fetch_assoc($result);
{
	$apikey = $row['apikey'];

	$records = mysqli_query($con, "SELECT dept From depts group by dept ");  // Use select query here 

        while($data = mysqli_fetch_array($records))
        {
            echo "<option value='". $data['dept'] ."'>" .$data['dept'] ."</option>";  // displaying data in option menu
        }	
}
    ?>  
</select>
<?php mysqli_close($con);  // close connection ?>
</td>
</tr>
<tr>
<td>Machine Description</td>
<td>
<select name="item_description1" required >
    <option value required>-- Select --</option>
    <?php
        include "../db.php";  // Using database connection file here
$id=$sessionId;
$query = "SELECT * from mdetail where id='".$id."'"; 
$result = mysqli_query($con, $query) or die ( mysqli_error());
$row = mysqli_fetch_assoc($result);
{
	$apikey = $row['apikey'];

	$records = mysqli_query($con, "SELECT mtype From mdetail group by mtype ");  // Use select query here 

        while($data = mysqli_fetch_array($records))
        {
            echo "<option value='". $data['mtype'] ."'>" .$data['mtype'] ."</option>";  // displaying data in option menu
        }	
}
    ?>  
</select>
<?php mysqli_close($con);  // close connection ?>
</td>
</tr>
<tr>
<td>Shift Type</td>
<td>
<select name="stype" required >
    <option value required>-- Select --</option>
    <?php
        include "../db.php";  // Using database connection file here
	$records = mysqli_query($con, "SELECT shift From shifts ");  // Use select query here 

        while($data = mysqli_fetch_array($records))
        {
            echo "<option value='". $data['shift'] ."'>" .$data['shift'] ."</option>";  // displaying data in option menu
        }	
    ?>  
</select>
</td>
</tr>
<tr>
<td>Nature of Problem</td>
<td>
<select name="nop" required >
    <option value required>-- Select --</option>
    <?php
        include "../db.php";  // Using database connection file here
$id=$sessionId;
$query = "SELECT * from nopt where id='".$id."'"; 
$result = mysqli_query($con, $query) or die ( mysqli_error());
$row = mysqli_fetch_assoc($result);
{
	$apikey = $row['apikey'];
        $records = mysqli_query($con, "SELECT * From nopt group by nop ");

        while($data = mysqli_fetch_array($records))
        {
            echo "<option value='". $data['nop'] ."'>" .$data['nop'] ."</option>";  // displaying data in option menu
        }	
  	}
	?>  
</select>
<?php mysqli_close($con);  // close connection ?>
</td>
</tr>
<tr>
<td>Spares Used</td>
<td>
<input type="text" name="sused" required value=""></td>
</tr>
<tr>
<td>Attended By</td>
<td colspan=5>
<select name="username" required >
    <option value required>-- Select --</option>
    <?php
        include "../db.php";  // Using database connection file here

        $records = mysqli_query($con, "SELECT * From users  Where not rights='Admins' AND NOT username='Admin' ");

        while($data = mysqli_fetch_array($records))
        {
            echo "<option value='". $data['username'] ."'>" .$data['username'] ."</option>";  // displaying data in option menu
        }	
	?>  
</select>
<?php mysqli_close($con);  // close connection ?>
</td>
</tr>
<tr>
<td>Status</td>
<td colspan=5>
<select name="stat"><option required value=""/>-- Select --</option>
	<option>Pending</option>
	<option>Skipped</option>
	<option>Completed</option>
</select>
</td>
</tr>
<tr>
<tr>
<td>Remarks</td>
<td><textarea rows="4" cols="40" name="remarks" placeholder="Enter Remarks" required ></textarea></td>
</tr>
<tr>
<td align="center" bgcolor="A7AFB0" colspan="3"><input name="submit" type="submit" value="Submit" /></td>
</tr>
<tr>
<td colspan=3; align="left"; style="color:#FF0000;"><?php echo $status; ?></td></tr>
</table>
<br>
</form>
</center>
</section>
</div>
</div>
</div>
<!-- /content-panel -->
</section>
<!-- /col-lg-4 -->
</section>
</div>
<?php 
   
} 
else
{
    
require('../db.php');

$status = "";
if(isset($_POST['new']) && $_POST['new']==1)
{
date_default_timezone_set('Asia/Kolkata');
$dept =$_REQUEST['dept'];
$item_description1 =$_REQUEST['item_description1'];
$nop =$_REQUEST['nop'];
$stype = $_REQUEST['stype'];	
$stdate = $_REQUEST['stdate'];
//$stdate = date('Y-m-d', time());
$eddate = $_REQUEST['stdate'];
$stime = $_REQUEST['stime'];
//$stime = date('H:i:s', time());
//echo"$stime";
//exit;
$etime =$_REQUEST['etime'];	
//$bdtime = $_REQUEST['bdtime'];	
$sused = $_REQUEST['sused'];
$remarks = $_REQUEST['remarks'];
$stat = $_REQUEST['stat'];
//$stat = 'Pending';
$trn_date = date("Y-m-d H:i:s");
$username = $_REQUEST['username'];

$ins_query="insert into mlog (`dept`,`item_description1`,`nop`,`stdate`,`eddate`,`stime`,`etime`,`sused`,`stype`,`stat`,`remarks`,`username`,`trn_date`) 
values ('$dept','$item_description1','$nop','$stdate','$eddate','$stime','$etime','$sused','$stype','$stat','$remarks','$username','$trn_date')";
		mysqli_query($con,$ins_query);
		$status = "Updated Sucessfully.</br></br>";	
	//	require_once 'bdu.php';		
}
?>
<div style='overflow: auto;'> 
<center>
<form name="form" method="post" action=""> 
<input type="hidden" name="new" value="1" />
<table class="table table-bordered table-striped table-condensed">
<thead>
<tbody>
<tr>
<td align="center" bgcolor="A7AFB0" colspan=4><strong>BREAKDOWN REGISTER</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td>Breakdown Date</td>
<td>
<input class="form-control form-control-inline input-medium default-date-picker" size="16" type="text" name="stdate" required value=""></td></tr>
<tr><td>Breakdown Start Time</td><td><input type="text" name="stime" class="form-control timepicker-24" required value=""></td></tr>
<tr><td>Breakdown End Time</td><td><input type="text" name="etime" class="form-control timepicker-24" required value="">
</td>
</tr>
<tr>
<td>Department</td>
<td><select name="dept" required >
    <option value required>-- Select --</option>
    <?php
        include "../db.php";  // Using database connection file here
$id=$sessionId;
$query = "SELECT * from depts where id='".$id."'"; 
$result = mysqli_query($con, $query) or die ( mysqli_error());
$row = mysqli_fetch_assoc($result);
{
	$apikey = $row['apikey'];

	$records = mysqli_query($con, "SELECT dept From depts group by dept ");  // Use select query here 

        while($data = mysqli_fetch_array($records))
        {
            echo "<option value='". $data['dept'] ."'>" .$data['dept'] ."</option>";  // displaying data in option menu
        }	
}
    ?>  
</select>
<?php mysqli_close($con);  // close connection ?>
</td>
<td><b><a href="../dept/"><i class="fa fa-plus"></i>  ADD </b></td>
</tr>
<tr>
<td>Machine Description</td>
<td>
<select name="item_description1" required >
    <option value required>-- Select --</option>
    <?php
        include "../db.php";  // Using database connection file here
$id=$sessionId;
$query = "SELECT * from mdetail where id='".$id."'"; 
$result = mysqli_query($con, $query) or die ( mysqli_error());
$row = mysqli_fetch_assoc($result);
{
	$apikey = $row['apikey'];

	$records = mysqli_query($con, "SELECT mtype From mdetail group by mtype ");  // Use select query here 

        while($data = mysqli_fetch_array($records))
        {
            echo "<option value='". $data['mtype'] ."'>" .$data['mtype'] ."</option>";  // displaying data in option menu
        }	
}
    ?>  
</select>
<?php mysqli_close($con);  // close connection ?>
</td>
<td><b><a href="../mdetail/"><i class="fa fa-plus"></i>  ADD </b></td>
</tr>
<tr>
<td>Shift Type</td>
<td>
<select name="stype" required >
    <option value required>-- Select --</option>
    <?php
        include "../db.php";  // Using database connection file here
	$records = mysqli_query($con, "SELECT shift From shifts ");  // Use select query here 

        while($data = mysqli_fetch_array($records))
        {
            echo "<option value='". $data['shift'] ."'>" .$data['shift'] ."</option>";  // displaying data in option menu
        }	
    ?>  
</select>
</td>
<td><b><a href="../shifts/"><i class="fa fa-plus"></i>  ADD </b></td>
</tr>
<tr>
<td>Nature of Problem</td>
<td>
<select name="nop" required >
    <option value required>-- Select --</option>
    <?php
        include "../db.php";  // Using database connection file here
$id=$sessionId;
$query = "SELECT * from nopt where id='".$id."'"; 
$result = mysqli_query($con, $query) or die ( mysqli_error());
$row = mysqli_fetch_assoc($result);
{
	$apikey = $row['apikey'];
        $records = mysqli_query($con, "SELECT * From nopt group by nop ");

        while($data = mysqli_fetch_array($records))
        {
            echo "<option value='". $data['nop'] ."'>" .$data['nop'] ."</option>";  // displaying data in option menu
        }	
  	}
	?>  
</select>
<?php mysqli_close($con);  // close connection ?>
</td>
<td><b><a href="../nop/"><i class="fa fa-plus"></i>  ADD </b></td>
</tr>
<tr>
<td>Spares Used</td>
<td>
<input type="text" name="sused" required value=""></td>
</tr>
<tr>
<td>Attended By</td>
<td colspan=5>
<select name="username" required >
    <option value required>-- Select --</option>
    <?php
        include "../db.php";  // Using database connection file here

        $records = mysqli_query($con, "SELECT * From users  Where not rights='Admins' AND NOT username='Admin' ");

        while($data = mysqli_fetch_array($records))
        {
            echo "<option value='". $data['username'] ."'>" .$data['username'] ."</option>";  // displaying data in option menu
        }	
	?>  
</select>
<?php mysqli_close($con);  // close connection ?>
</td>
</tr>
<tr>
<td>Status</td>
<td colspan=5>
<select name="stat"><option required value=""/>-- Select --</option>
	<option>Pending</option>
	<option>Skipped</option>
	<option>Completed</option>
</select>
</td>
</tr>
<tr>
<tr>
<td>Remarks</td>
<td><textarea rows="4" cols="40" name="remarks" placeholder="Enter Remarks" required ></textarea></td>
</tr>
<tr>
<td align="center" bgcolor="A7AFB0" colspan="3"><input name="submit" type="submit" value="Submit" /></td>
</tr>
<tr>
<td colspan=3; align="left"; style="color:#FF0000;"><?php echo $status; ?></td></tr>
</table>
<br>
</form>
</center>
</section>
</div>
</div>
</div>
</div>
<!-- /content-panel -->
</section>
<!-- /col-lg-4 -->
</section>
</div>
<?php
}
}
?>
<?php
require("../footer.php");
?>