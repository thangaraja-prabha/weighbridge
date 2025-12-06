<?php
require('../db.php');
//include("../auth.php");
?>
<?php
require("../cheader.php");
?>
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        *********************************************************************************************************************************************************** -->
    <!--main content start-->
<section id="main-content">
<section class="wrapper">
<h3><i class="fa fa-angle-right"></i> LOGS </h3>
<div class="row">
<div class="col-lg-12">
<div style='overflow: auto;'>
<h4><i class="fa fa-angle-right"></i> MAINTENANCE LOGS </h4>
<section id="unseen">
<table class="table table-bordered table-striped table-condensed">
<thead>
<tbody>
<tr>
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
<th><strong>Update </strong></th>
</tr>
</thead>
<tbody>
<?php
$count=1;
$submittedby = $_SESSION["username"];
$stat = 'Completed';
$sel_query="Select * from mlog where stat='".$stat."' ORDER BY id DESC";
$result = mysqli_query($con,$sel_query);
        if (isset($_GET['pageno'])) {
            $pageno = $_GET['pageno'];
        } else {
            $pageno = 1;
        }
        $no_of_records_per_page = 15;
        $offset = ($pageno-1) * $no_of_records_per_page;

        $total_pages_sql = "SELECT COUNT(*) FROM mlog where stat='".$stat."' ORDER BY id DESC";
        $result = mysqli_query($con,$total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);

        $sql = "SELECT * FROM mlog where stat='".$stat."' ORDER BY id DESC LIMIT $offset, $no_of_records_per_page";
        $result = mysqli_query($con,$sql);
		$count=1;
while($row = mysqli_fetch_assoc($result)) { ?>
<tr>
<td align="center"><?php echo $count; ?></td>
<td align="left"><?php echo $row["stdate"]; ?></td>
<td align="left"><?php echo $row["dept"]; ?></td>
<td align="left"><?php echo $row["item_description1"]; ?></td>
<td align="left"><?php echo $row["nop"]; ?></td>
<td align="left">
<?php include "../db.php"; 
	$sql=mysqli_query($con,"select * from shifts ");
	while($res=mysqli_fetch_assoc($sql)){ 
	$stshift=$res['stshift'];
	$edshift=$res['edshift'];
	}
	$stime=$row['stime'];
	if ($stime < $stshift){
		echo "A";
	} elseif ($stime > $edshift) {
		echo "A";
	} elseif ($stime < $stshift) {
		echo "B";
	} elseif ($stime > $edshift) {
		echo "B";
	} elseif ($stime < $stshift) {
		echo "C";
	} elseif ($stime > $edshift) {
		echo "C";
	} elseif ($stime < $stshift) {
		echo "G";
	} elseif ($stime > $edshift) {
		echo "G";
	} else 
	{
//	echo $stype;
	}
	 ?>
</td>
<td align="center"><?php echo $row['stime'];?></td>
<td align="center"><?php echo $row['etime'];?></td>
<td align="center" <?php  
$a=$row['stime'];
$b=$row['etime'];
$d1 = new DateTime($a);
$d2 = new DateTime($b);	
$interval = $d1->diff($d2);
$diffInHours   = $interval->h; //8
if ($diffInHours > '1')
{
$bgColor = ' style="background-color:#ff8c66;" ';	
}else{
$bgColor = ' ';	
} echo $bgColor; ?> >
<?php 
//get Date diff as intervals 
$a=$row['stime'];
$b=$row['etime'];
$d1 = new DateTime($a);
$d2 = new DateTime($b);	
$interval = $d1->diff($d2);
echo $diffInHours   = $interval->h; //8
echo ":";
echo $diffInMinutes = $interval->i; //23
echo ":";
echo $diffInSeconds = $interval->s; //45
?></td>
<td align="left"><?php echo $row["username"]; ?></td>
<td align="center"><?php echo $row["sused"]; ?></td>
<td align="center"><?php echo $row["stat"]; ?></td>
<td align="center"><?php echo $row["remarks"]; ?></td>
<td align="center"><a href=" update.php?id=<?php echo $row["id"]; ?>" ><i class="fa fa-edit"></i></a></td>
<?php $count++; } ?>
</tbody>
</table>
</div>
<div style='overflow: auto;' align='center'>
<table class="table">
<thead>
<tbody>
<tr>
    <ul class="pagination">
        <td><a href="?pageno=1" class="btn btn-success">First</a></td>
        <td class="<?php if($pageno <= 1){ echo 'disabled'; } ?>">
            <a href="<?php if($pageno <= 1){ echo '#'; } else { echo "?pageno=".($pageno - 1); } ?>" class="btn btn-primary">Prev</a>
        </td>
        <td class="">
            <a href="<?php echo "?pageno=".($pageno); ?>" class="btn btn-warning"><?php echo "$pageno"; ?></a>
        </td>
        <td class="<?php if($pageno >= $total_pages){ echo 'disabled'; } ?>">
            <a href="<?php if($pageno >= $total_pages){ echo '#'; } else { echo "?pageno=".($pageno + 1); } ?>" class="btn btn-primary">Next</a>
        </td>
        <td><a href="?pageno=<?php echo $total_pages; ?>"class="btn btn-success">Last</a></td>
    </ul>
</table>
              </section>
            </div>
            <!-- /content-panel -->
          </div>
          <!-- /col-lg-12 -->
        </div>
        <!-- /row -->
      </section>
      <!-- /wrapper -->
    </section>
    <!-- /MAIN CONTENT -->

<?php
require("../footer.php");
?>
