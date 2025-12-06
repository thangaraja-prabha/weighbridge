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
<h3><i class="fa fa-angle-right"></i> DEPARTMENT DETAILS </h3>
<div class="row">
<div class="col-lg-12">
<div style='overflow: auto;'>
<h4><i class="fa fa-angle-right"></i> UPDATE DETAILS </h4>
<section id="unseen">
<table class="table table-bordered table-striped table-condensed">
<?php
include('../db.php');
$status = "";
$id=$_REQUEST['id'];
$query=mysqli_query($con,"select * from depts where id='$id'");
$result=mysqli_fetch_assoc($query);

extract($result);

extract($_REQUEST);
if(isset($update))
{
date_default_timezone_set('Asia/Kolkata');
$username=$_SESSION['username'];
$trn_date = date("Y-m-d H:i:s");
$dept=$_REQUEST['dept'];	
	
	$query="update depts SET dept='$dept', username='$username', trn_date='$trn_date' where id='$id'";
	mysqli_query($con,$query);	
	
//	header( "refresh:2;url=depts.php" ); 
	$status = "Updated Successfully.";

}

?>
<p><br><p>
<center>
<div style='overflow: auto;'>
<p style="color:#FF0000;"><?php echo $status; ?></p>
		<form method="post" enctype="multipart/form-data">
			<table border="1" style='width:500px;'>
				<tr>
					<td>Update</tD>
					<td><input type="text" value="<?php echo $dept; ?>" name="dept"/></td>
			<td align="center" colspan="2">
				<input type="submit" name="update" value="Update"/>
				</td>
				</tR>
			</table>
		</form>
</div><br><br><br><br><br><br><br><br><br><br>
<p><br><br><br><br><p>	
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