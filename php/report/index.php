<?php
require '../rheader.php';
?>


    <!-- Top Navigation
    ========================-->
    <nav id="top-menu">
        <div class="container">
            <div class="row">
                <!-- Brand and toggle get grouped for better mobile display -->
               <div class="col-sm-4 col-md-4">
                    <div class="navbar-header">
                    </div>
                </div>           
			</div>
        </div>
    </nav>	

<div class="form">
<center>
<table class="table table-bordered table-striped table-condensed">
<thead align="center" bgcolor="#bfbfbf">
<tr>
<tr><td colspan=15; align="center"><strong> MAINTENANCE LOGS </strong> </td></tr>
<th><strong>S.No</strong></th>
<th><strong>Date</strong></th>
<th><strong>Department </strong></th>
<th><strong>Machine Description </strong></th>
<th><strong>Nature of Problem </strong></th>
<th><strong>Shift</strong></th>
<th><strong>Start Time</strong></th>
<th><strong>End Time</strong></th>
<th><strong>B/D (hrs)</strong></th>
<th><strong>Attended By</strong></th>
<th><strong>Spares Used</strong></th>
<th><strong>Status</strong></th>
<th><strong>Remarks</strong></th>
</tr>
</thead>
<?php
require('../db.php');
include("../auth.php");
{
date_default_timezone_set("Asia/Calcutta");
//$nowdt = date("Y-01-01 00:00:00");
//$Startdate = '';
//$tedate = $_REQUEST['trn_date'];
$stdate = $_REQUEST['stdate'];
$eddate = $_REQUEST['eddate'];
$item_description1 = $_REQUEST['item_description1'];
$stype = $_REQUEST['stype'];
$dept = $_REQUEST['dept'];
$username = $_REQUEST['username'];
//$stdated = $_REQUEST['stdated'];
//$eddated = $_REQUEST['eddated'];
//$stdatet = $_REQUEST['stdatet'];
//$eddatet = $_REQUEST['eddatet'];
//$submittedby = $_REQUEST['submittedby'];
//$stdate = ('".$stdated."') ('". $stdatet."');
//$apikey=$_REQUEST['apikey'];
//$type=$_REQUEST['type'];
$stat=$_REQUEST['stat'];
//echo "$stdate";
//echo "<br>";
//echo "$eddate";
//exit;
//$exptype=$_REQUEST['exptype'];
//$Startdate1=$_REQUEST['Startdate1'];
//$Enddate1=$_REQUEST['Enddate1'];
//$item=$_REQUEST['item'];	
if ($item_description1='' || $stype='' || $dept='' || $username='')
{
$query=mysqli_query($con, "Select * from mlog where stdate between '".$stdate."' AND '".$eddate."' AND stat='".$stat."' ");
}
elseif ($item_description1='' || $stype='' || $stat='' || $username='')
{
$query=mysqli_query($con, "Select * from mlog where stdate between '".$stdate."' AND '".$eddate."' AND dept='".$dept."' ");	
}
elseif ($item_description1='' || $stat='' || $dept='' || $username='')
{
$query=mysqli_query($con, "Select * from mlog where stdate between '".$stdate."' AND '".$eddate."' AND stype='".$stype."' ");	
}
elseif ($stat='' || $stype='' || $dept='' || $username='')
{
$query=mysqli_query($con, "Select * from mlog where stdate between '".$stdate."' AND '".$eddate."' AND item_description1='".$item_description1."' ");	
}
else
{	
echo "Nothing";
//	$query=mysqli_query($con, "Select * from mlog where stdate between '".$stdate."' AND '".$eddate."' AND stat='".$stat."' ");
//	$query=mysqli_query($con, "Select * from anaytb where exptype='".$exptype."' AND trn_date between '2021-01-01 00:00:00' and '2021-01-31 23:59:59' ORDER BY id DESC");	
//	$count=mysqli_num_rows($query);	

}
$count=1;
while($row = mysqli_fetch_assoc($query)) { ?>
<tr>
<td align="center"><?php echo $count; ?></td>
<td align="left"><?php echo $row["stdate"]; ?></td>
<td align="left"><?php echo $row["dept"]; ?></td>
<td align="left"><?php echo $row["item_description1"]; ?></td>
<td align="left"><?php echo $row["nop"]; ?></td>
<td align="left"><?php echo $row["stype"]; ?></td>
<td align="center"><?php echo $row['stime'];?></td>
<td align="center"><?php echo $row['etime'];?></td>
<td align="center"><?php $diff2 = abs(strtotime($row['etime'])- strtotime($row['stime'])); echo "<br>"; $hours = floor($diff2/60/60); $minutes = floor($diff2 /60/60); $seconds = floor($diff2/60/60/60); echo $hours; echo " hours";  $minutes;  $seconds; ?></td>
<td align="left"><?php echo $row["username"]; ?></td>
<td align="center"><?php echo $row["sused"]; ?></td>
<td align="center"><?php echo $row["stat"]; ?></td>
<td align="center"><?php echo $row["remarks"]; ?></td>
</tr>
<?php $count++; } ?>
<tr><td align="center" colspan=21	>Printed on <?php echo date(" d M Y ");?> at <?php echo date("H:i:s");?></td></tr>
</table>

<?php
include "../rfooter.php";
?>