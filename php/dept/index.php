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
        <h3><i class="fa fa-angle-right"></i> DEPARTMENT </h3>
        <div class="row">
          <div class="col-lg-12">
			<div style='overflow: auto;'>
              <h4><i class="fa fa-angle-right"></i> CREATE DEPARTMENT </h4>
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
	$dept = $_REQUEST['dept'];;
	$trn_date = date("Y-m-d H:i:s");
  	// Get text
 // 	$image_text = mysqli_real_escape_string($db, $_POST['image_text']);

  	// image file directory
//  	$target = "items_gallery/".basename($imagetitle);
//if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {

	$squery="select dept from depts where dept='$dept' ";
	$sql=mysqli_query($con,$squery);
	$row=mysqli_num_rows($sql);	
	if($row==1)
	{
		$msg = "Already Exists";
	}
	else
	{

	$sql = "INSERT INTO depts (dept, username, trn_date) VALUES ('$dept', '$username', '$trn_date')";
  	// execute query
  	 mysqli_query($con, $sql);
  	$msg = "Created successfully";
  	}
}
 ?>
<center>
<p align="center"; style="color:#FF0000;"><?php echo $msg; ?></p>
</center>
<form method="POST" action="index.php" enctype="multipart/form-data">
<input type="hidden" name="size" value="1000000">
<table class="table table-bordered table-striped table-condensed">
<thead>
<tbody>
<tr>
    <td bgcolor="#bfbfbf" align="center"><strong>CREATE DEPARTMENT</strong></td>
<td>
  	  <input type="text" name="dept" required>
</td></tr>
<tr><td colspan=2; align="center">
  		<button class="btn btn-success" type="submit" name="submit">SUBMIT</button>
</td></tr>
</table> 
</form>
              </section>
            </div>
            <!-- /content-panel -->
          </div>
          <!-- /col-lg-12 -->
        </div>

        <div class="row">
          <div class="col-lg-12">
			<div style='overflow: auto;'>
              <h4><i class="fa fa-angle-right"></i> LIST OF DEPARTMENT </h4>
              <section id="unseen"> 
<table class="table table-bordered table-striped table-condensed">
<thead>
<tbody>
<tr>
<tr><td bgcolor="#bfbfbf"; colspan=12; align="center"><strong>  LIST OF DEPARTMENT </strong></td></tr>
<th><strong>S.No</strong></th>
<th><strong>Department</strong></th>
<th><strong>Created By</strong></th>
<th><strong>Created On</strong></th>
<th><strong>Update</strong></th>
</tr>
</thead>
<?php
require('../db.php');
    $query = "SELECT * FROM `depts` where not dept='Admins' ";
	 $result = mysqli_query($con, $query);
$count=1;
while($row = mysqli_fetch_array($result)): 
{
?>
<tr>
<td align="center"><?php echo $count; ?></td>
<td align="left"><?php echo $row["dept"]; ?></td>
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