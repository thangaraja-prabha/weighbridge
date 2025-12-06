<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Basic Page Needs
    ================================================== -->
    <meta charset="utf-8">
    <!--[if IE]><meta http-equiv="x-ua-compatible" content="IE=9" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CEC</title>
   
    <!-- Bootstrap -->
    <link rel="stylesheet" type="text/css"  href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="fonts/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" type="text/css" href="fonts/icons/flaticon.css">

    <!-- Stylesheet
    ================================================== -->
    <link rel="stylesheet" type="text/css"  href="css/style.css">
	<link rel="stylesheet" type="text/css"  href="css/table.css">
    <link rel="stylesheet" type="text/css" href="css/responsive.css">	
	
    <!-- Javascript
    ================================================== -->
	<script type="text/javascript" src="js/windowprint.js"></script>
	<script type="text/javascript" src="js/goback.js"></script>
  
          <style>
            table,tr,th,td
            {
                border: 1px solid black;
            }
        </style>
</head>
   <body onload="if (document.referrer == '') self.location='emlogin.php';">
<body>

    <!-- Top Navigation
    ========================-->
    <nav id="top-menu">
        <div class="container">
            <div class="row">
                <!-- Brand and toggle get grouped for better mobile display -->
               <div class="col-sm-4 col-md-4">
                    <div class="navbar-header">
						<a><img src="logo.jpg" alt="cityelectrical" style="width:350px"></a>
                    </div>
                </div>           
			</div>
        </div>
    </nav>
    <nav id="top-menu">
	<p>
	<br>
	</p>
    </nav>		
<br>
<center>
<div style='overflow: auto;'>
<table border="1">
<thead>
<tr>
<tr><td colspan=15; bgcolor="#bfbfbf" align="center"><strong> Participation <?php $participation=$_REQUEST['participation']; echo "$participation"; ?> REPORT </strong> </td></tr>
<th><strong>S.No</strong></th>
<th><strong>ID</strong></th>
<th><strong>Date</strong></th>
<th><strong>Company</strong></th>
<th><strong>Tender No</strong></th>
<th><strong>Closing Date</strong></th>
<th><strong>Participation</strong></th>
<th><strong>Type</strong></th>
<th><strong>Prepared By</strong></th>
<th><strong>Checked By</strong></th>
<th><strong>Updated On</strong></th>
<th><strong>Updated By</strong></th>
<th><strong>Report</strong></th>
</tr>
</thead>
<?php
require '../db.php';
require '../auth.php';
$monthtext=$_REQUEST['month'];
$yeartext=$_REQUEST['year'];
$participation=$_REQUEST['participation'];

	$query=mysqli_query($con, "Select * from cec2020 Where participation = '$participation' and month = '$monthtext' and year ='$yeartext' ORDER BY closing_date ASC");
	
	$count=mysqli_num_rows($query);	

if($count == "0")
{
echo '<h2> No Data found !</h2>';
}
else
$count=1;
date_default_timezone_set('Asia/Kolkata');
$year = date('Y', time());
$month = date('M', time());
$date = date('Y-m-d', time());
while($row = mysqli_fetch_assoc($query)) { ?>
<tr>
<td align="center"><?php echo $count; ?></td>
<td align="center"><?php echo $row["id"]; ?></td>
<td align="left"><?php echo $date = date('d-m-Y', strtotime( $row['date'] ));?></td>
<td align="left"><?php echo $row["company"]; ?></td>
<td align="left"><?php echo $row["tender_no"]; ?></td>
<td align="left"><?php echo $closing_date = date('d-m-Y', strtotime( $row['closing_date'] ));?></td>
<td align="left"><?php echo $row["participation"]; ?></td>
<td align="left"><?php echo $row["type"]; ?></td>
<td align="left"><?php echo $row["pby"]; ?></td>
<td align="left"><?php echo $row["cby"]; ?></td>
<td align="left"><?php echo $row["trn_date"]; ?></td>
<td align="center"><?php echo $row["submittedby"]; ?></td>
<td align="center"><a href="report.php?id=<?php echo $row["id"]; ?>">Report</a></td>
</tr>
<?php $count++; } ?>
<tr><td colspan=15>Records on <strong> <?php echo "$monthtext $yeartext"; ?></strong> </td></tr>
<tr><td colspan=15>Printed on <?php echo date(" d M Y ");?> at <?php echo date("H:i:s");?></td></tr>
</table>
<p><br></p>
	<p>
	<br>
	</p>	<!-- End Main Navigation
    ========================-->	

    <!-- Footer Area -->
    <nav id="top-menu">
	<p>
	<br>
	</p>
    </nav>
</body>
</html>