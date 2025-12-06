<?php
require('../db.php');
//include("../auth.php"); //include auth.php file on all auth pages 
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
<h4><i class="fa fa-angle-right"></i> EDIT SHIFTS </h4>
<section id="unseen">
<?php
include('../db.php');
$status = "";
$id=$_REQUEST['id'];
$query=mysqli_query($con,"select * from shifts where id='$id'");
$result=mysqli_fetch_assoc($query);

extract($result);

extract($_REQUEST);
if(isset($update))
{
date_default_timezone_set('Asia/Kolkata');
$username=$_SESSION['username'];
$trn_date = date("Y-m-d H:i:s");
$shift=$_REQUEST['shift'];	
$stshift=$_REQUEST['stshift'];	
$edshift=$_REQUEST['edshift'];	
	
	$query="update shifts SET shift='$shift', stshift='$stshift',edshift='$edshift', username='$username', trn_date='$trn_date' where id='$id'";
	mysqli_query($con,$query);	
	
//	header( "refresh:2;url=shifts.php" ); 
	$status = "Updated Successfully.";

}

?>
<center>
<div style='overflow: auto;'>
<p style="color:#FF0000;"><?php echo $status; ?></p>
		<form method="post" enctype="multipart/form-data">
<table class="table table-bordered table-striped table-condensed">
<thead>
<tbody>
<tr>
<td bgcolor="#bfbfbf" colspan=3; align="center"><strong>SHIFT DETAILS</strong></td>
</tr> 	
<tr>
<td>Shift Type</td>
<td>
  	  <input type="text" value="<?php echo $shift; ?>" name="shift" required>
</td></tr>
<tr>
<td>Shift Start</td><td><?php echo $stshift; ?></td>
<td>
  	  <input type="text" class="form-control timepicker-24" value="" name="stshift" required>
</td></tr>
<tr>
<td>Shift End</td><td><?php echo $edshift; ?></td>
<td>
  	  <input type="text" class="form-control timepicker-24" value="" name="edshift" required>
</td></tr>
				<tr>
			<td align="center" colspan=3">
				<input type="submit" name="update" value="Update"/>
				</td>
				</tR>
			</table>
		</form>
</div>
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