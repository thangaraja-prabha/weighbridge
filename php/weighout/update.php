<?php
require('../db.php');
//include("../auth.php");
require("../cheader.php");

$status = "";
if(isset($_POST['new']) && $_POST['new']==1)
{
$id='2';
date_default_timezone_set('Asia/Kolkata');
$remarks = $_REQUEST['remarks'];
$stat = 'W2';
$wt2by = $_SESSION["username"];
$wt2at = date("Y-m-d H:i:s");	
$trn_date = date("Y-m-d H:i:s");
$username = $_SESSION["username"];
$wt2 =$_REQUEST['wt2'];

$update="update wlog set stat='".$stat."', wt2='".$wt2."', wt2at='".$wt2at."', wt2by='".$wt2by."', remarks='".$remarks."', username='".$username."', trn_date='".$trn_date."' where id='2'";
		$status = "Updated Sucessfully.</br></br>";
mysqli_query($con, $update);
$status = "Updated Sucessfully.</br></br>";
echo '<p style="color:#FF0000;">'.$status.'</p>';
}else {

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
<div style='overflow: auto;'> 
<center>
<form name="form" method="post" action=""> 
<input type="hidden" name="new" value="1" />
<table class="table table-bordered table-striped table-condensed">
<tbody>
<tr>
<td>Ticket No</td>
<td><?php require('../db.php'); echo ($sessionId ); ?></td></tr>
<tr>
<td>Vehicle Number</td>
<td><?php require('../db.php'); echo $row['vnum']; ?>
</td>
</tr>
<tr>
<td>Item Description</td>
<td><?php $row['mname']; ?>
</td>
</tr>
<tr>
<td>Transporter  Details</td>
<td>
<?php $row['tname']; ?>
</td>
</tr>
<tr>
<td>Inward Details</td>
<td>
<?php $row['sname']; ?>
</td>
</tr>
<tr>
<td>Outward Details</td>
<td>
<?php $row['cname']; ?>
</td>
</tr>
<tr>
<tr>
<td>Remarks</td>
<td><textarea rows="4" cols="40" name="remarks" placeholder="<?php $row['remarks']; ?>" value="<?php $row['remarks']; ?>" ></textarea></td>
</tr>
<tr>
<td align="center" bgcolor="A7AFB0" colspan="3"><input name="submit" type="submit" value="Submit" /></td>
</tr>
<tr>
<td colspan=3; align="left"; style="color:#FF0000;"><?php echo $status; ?></td></tr>
</table>
<br>
</form>
<?php } ?>
</div>
</center>
</section>
</div>
</div>
</div>
</div>
<!-- /content-panel -->
</section>
<!-- /col-lg-4 -->
</section>
</div>	
	
<?php
require("../footer.php");
?>
