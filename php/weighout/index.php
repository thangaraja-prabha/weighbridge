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
        <h1><a align="center">WEIGHT <?php echo '555105' ?> <?php echo "Kg"; ?></a></h1>
        <div class="row mt">
          <div class="col-lg-12">
            <div class="content-panel">
              <section id="unseen">
<center>
<div style='overflow: auto;'>          
<table class="table table-bordered table-striped table-condensed">
<tr>
<tr>
<td align="center" bgcolor="A7AFB0" colspan=15><strong>PENDING FOR SECOND WEIGHTMENT</strong></td>
</tr>
<th><strong>S.No</strong></th>
<th><strong>Ticket No</strong></th>
<th><strong>Vehicle Number</strong></th>
<th><strong>Material Name </strong></th>
<th><strong>Transporter Name </strong></th>
<th><strong>Customer Name </strong></th>
<th><strong>Supplier Name</strong></th>
<th><strong>First Weight</strong></th>
<th><strong>Logged By</strong></th>
<th><strong>Logged On</strong></th>
<th><strong>Remarks</strong></th>
<th><strong>Last Update By</strong></th>
<th><strong>Last Update On</strong></th>
<th><strong><i class="fa fa-edit"></i></strong></th>
<th><strong><i class="fa fa-trash"></i></strong></th>
</tr>
<?php
require('../db.php');
//	$valueToSearch = '';
//	$valueToSearch = $_REQUEST['valueToSearch'];
//	$valueToSearch = $_POST['valueToSearch'];
//	$submittedby = $_SESSION['username'];
//	echo "$valueToSearch";
//	exit;
    // search in all table columns
    // using concat mysql function
$query = "SELECT * FROM `wlog` WHERE stat='W1' Order by id ASC";
$result = mysqli_query($con,$query);				 		
$count=1;
while($row = mysqli_fetch_assoc($result))
{
?>
 <tr>
<td align="center"><?php echo $count; ?></td>
<td align="left"><?php echo $row["id"]; ?></td>
<td align="left"><?php echo $row["vnum"]; ?></td>
<td align="left"><?php echo $row["mname"]; ?></td>
<td align="left"><?php echo $row["tname"]; ?></td>
<td align="left"><?php echo $row["cname"]; ?></td>
<td align="left"><?php echo $row["sname"]; ?></td>
<td align="center"><?php echo $row["wt1"];?></td>
<td align="center"><?php echo $row["wt1by"];?></td>
<td align="left"><?php echo $row["wt1at"]; ?></td>
<td align="center"><?php echo $row["remarks"]; ?></td>
<td align="center"><?php echo $row["username"]; ?></td>
<td align="center"><?php echo $row["trn_date"]; ?></td>
<td align="center"><a href=" update.php?id=<?php echo $row["id"]; ?>" ><i class="fa fa-edit"></i></td>
<td align="center"><a class='delete' href=" delete.php?id=<?php echo $row["id"]; ?>" ><i class="fa fa-trash"></i></td>
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