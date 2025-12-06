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
<table border="1">
<thead bgcolor="#bfbfbf">
<tr>
<tr><td colspan=21; align="center"> <strong>ACTIVITY REPORT </strong></td></tr>
<tr>
<th><strong>S.No</strong></th>
<th><strong>Date</strong></th>
<th><strong>Punch In</strong></th>
<th><strong>Punch Out</strong></th>
<th><strong>Customer</strong></th>
<th><strong>Location</strong></th>
<th><strong>Product</strong></th>
<th><strong>Activity</strong></th>
</tr>
</thead>
<?php
require('../db.php');
include("../auth.php");
{
date_default_timezone_set("Asia/Calcutta");
//$nowdt = date("Y-01-01 00:00:00");
//$Startdate = '';
$product = $_REQUEST['product'];
$stdate = $_REQUEST['stdate'];
$eddate = $_REQUEST['eddate'];
$submittedby = $_REQUEST['submittedby'];
//$apikey=$_REQUEST['apikey'];
//$type=$_REQUEST['type'];
//echo "$stdate";
//echo "<br>";
//echo "$eddate";
//exit;
//$exptype=$_REQUEST['exptype'];
//$Startdate1=$_REQUEST['Startdate1'];
//$Enddate1=$_REQUEST['Enddate1'];
//$item=$_REQUEST['item'];	
	$query=mysqli_query($con, "Select * from punch where submittedby='".$submittedby."' AND product='".$product."' AND datetime between '".$stdate."' AND '".$eddate."' ");
//	$query=mysqli_query($con, "Select * from anaytb where exptype='".$exptype."' AND trn_date between '2021-01-01 00:00:00' and '2021-01-31 23:59:59' ORDER BY id DESC");	
//	$count=mysqli_num_rows($query);	

}
$count=1;
while($row = mysqli_fetch_assoc($query)) { ?>
<tr>
<td align="center"><?php echo $count; ?></td>
<td align="left"><?php echo $punchindate = date('d-m-Y', strtotime( $row['punchindate'] ));?></td>
<td align="left"><?php echo $row["punchintime"]; ?></td>
<td align="left"><?php echo $row["punchouttime"]; ?></td>
<td align="left"><?php echo $row["customer"]; ?></td>
<td align="left"><?php echo $row["location"]; ?></td>
<td align="left"><?php echo $row["product"]; ?></td>
<td align="left"><?php echo $row["deptact"]; ?></td>
</tr>
<?php $count++; } ?>
<tr><td align="center" colspan=21	>Printed on <?php echo date(" d M Y ");?> at <?php echo date("H:i:s");?></td></tr>
</table>

<?php
require '../rfooter.php';
?>