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
<h3><i class="fa fa-angle-right"></i> SHIFT DETAILS </h3>
<div class="row">
<div class="col-lg-12">
<div style='overflow: auto;'>
<h4><i class="fa fa-angle-right"></i> CREATE SHIFTS </h4>
<section id="unseen">
<?php
require('../db.php');

  // Initialize message variable
  $msg = "";

  // If submit button is clicked ...
  if (isset($_POST['submit'])) {
  	// Get image name
  	date_default_timezone_set('Asia/Kolkata');
	$username = $_SESSION['username'];
//	$imagetitle = $_FILES['image']['name'];
	$shift = $_REQUEST['shift'];;
	$trn_date = date("Y-m-d H:i:s");
  	// Get text
 // 	$image_text = mysqli_real_escape_string($db, $_POST['image_text']);

  	// image file directory
//  	$target = "items_gallery/".basename($imagetitle);
//if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {

	$squery="select shift from shifts where shift='$shift' ";
	$sql=mysqli_query($con,$squery);
	$row=mysqli_num_rows($sql);	
	if($row==1)
	{
		$msg = "Already Exists";
	}
	else
	{

	$sql = "INSERT INTO shifts (shift, username, trn_date) VALUES ('$shift', '$username', '$trn_date')";
  	// execute query
  	 mysqli_query($con, $sql);
  	$msg = "Created successfully";
  	}
}
 ?>
<center>
<div style='overflow: auto;'>  
<p align="center"; style="color:#FF0000;"><?php echo $msg; ?></p>
<div id="content">
<?php if ('Administrator' == $sessionRole) {?> 
  <form method="POST" action="index.php" enctype="multipart/form-data">
  	<input type="hidden" name="size" value="1000000">
<table class="table table-bordered table-striped table-condensed">
<thead>
<tbody>
<tr>
<td bgcolor="#bfbfbf" align="center"><strong>SHIFT DETAILS</strong></td>
<td>
  	  <input type="text" name="shift" required>
</td></tr>
<tr><td colspan=2; align="center">
  		<button class="btn btn-success" type="submit" name="submit">SUBMIT</button>
</td></tr>
</table> 
  </form>
  <?php } ?>  
</center>
<br>
<center>   
<table class="table table-bordered table-striped table-condensed">
<thead>
<tbody>
<tr>
<tr><td bgcolor="#bfbfbf"; colspan=12; align="center"><strong>  LIST OF SHIFTS </strong></td></tr>
<th><strong>S.No</strong></th>
<th><strong>Shifts</strong></th>
<th><strong>Shift Starts</strong></th>
<th><strong>Shift Ends</strong></th>
<th><strong>Created By</strong></th>
<th><strong>Created On</strong></th>
<th><strong>Update</strong></th>
</tr>
</thead>
<tbody>
<?php
require('../db.php');
    $query = "SELECT * FROM `shifts` ";
	 $result = mysqli_query($con, $query);
$count=1;
while($row = mysqli_fetch_array($result)): 
{
?>
<tr>
<td align="center"><?php echo $count; ?></td>
<td align="left"><?php echo $row["shift"]; ?></td>
<td align="left"><?php echo $row["stshift"]; ?></td>
<td align="left"><?php echo $row["edshift"]; ?></td>
<td align="center"><?php echo $row["username"]; ?></td>
<td align="center"><?php echo $row["trn_date"]; ?></td>
<td align="center"><a href="typee.php?id=<?php echo $row["id"]; ?>">Update</td>
<?php $count++; } ?>
<?php endwhile;?>
</tbody>
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