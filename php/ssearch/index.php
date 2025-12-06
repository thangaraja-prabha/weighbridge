<?php
require('../db.php');
//include("../auth.php");
require("../cheader.php");
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
              <h4><i class="fa fa-angle-right"></i> Search Results </h4>
              <section id="unseen">
<center>
<div style='overflow: auto;'>          
<table class="table table-bordered table-striped table-condensed">
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
<?php
require('../db.php');
    $valueToSearch = $_REQUEST['valueToSearch'];
//	$valueToSearch = '';
//	$valueToSearch = $_POST['valueToSearch'];
//	$submittedby = $_SESSION['username'];
//	echo "$valueToSearch";
//	exit;
    // search in all table columns
    // using concat mysql function
$query = "SELECT * FROM `mlog` WHERE CONCAT(`username`,`dept`,`item_description1`,`nop`,`stat`) LIKE '%".$valueToSearch."%'";
$result = mysqli_query($con,$query);				 		
$count=1;
while($row = mysqli_fetch_assoc($result))
{
?>
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
</table>
</div>  
</center> 
<!-- /content-panel -->
</section>
<!-- /col-lg-4 -->
</section>
</div>
<?php
require("../footer.php");
?>