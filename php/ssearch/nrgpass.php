<?php 
require '../rheader.php';
 ?>
<div class="form">
<?php
require('../db.php');
//include('../auth.php');

$id='1';
$query = "SELECT * from setting where id='".$id."'"; 
$result = mysqli_query($con, $query) or die ( mysqli_error());
$row = mysqli_fetch_assoc($result);
{
?>
<form ="form" method="post" action=""> 
<div class="row">
<br>
<div class="col-md-12">
<br>
<table border="1" style='width:90%;:left;margin-left:5%'>
<tr>
<td colspan=1;>
<?php
      	echo "<img src='../".$row['imagetitle']."' >";
?>
</td>
<td align='right' colspan=5;>
<font size='4'><b><?php echo $row['company'];?></b></font><br>
<?php echo $row['street'];?>, <br>
<?php echo $row['city'];?>, <br>
<?php echo $row['taluk'];?>, 
<?php echo $row['dist'];?>, <br>
<?php echo $row['state'];?>, 
<?php echo $row['pin'];?>. <br>
Mobile: <?php echo $row['mobile'];?>. <br>
Email: <?php echo $row['mail'];?>, <br>
Web: <?php echo $row['web'];?> 
</td>
</tr>
</table>
<?php } ?>
</table>

<?php
require('../db.php');
//include('../auth.php');
//$id=$_REQUEST['id'];
$id=$_REQUEST['id'];
$query = "SELECT * from swmgplog where id='".$id."'"; 
$result = mysqli_query($con, $query) or die ( mysqli_error());
$row = mysqli_fetch_assoc($result);
{
$count=1;	
?>
<form ="form" method="post" action=""> 
<div class="row">
<br>
<div class="col-md-12">
<br>
<table border="1" style='width:90%;:left;margin-left:5%'>
<input ="id" type="hidden" ="<?php echo $row['id'];?>" />
<tr><td colspan=7; bgcolor="A7AFB0" align="center"><font size='4'><b><?php echo $row['type'];?></b></font></td></tr>
<tr><td colspan=5; align="left"><font size='3'><b>TO</b></font</td><td><b>GATE PASS NO</b></td><td><?php echo $row['id'];?></td></tr>
<tr>
<td><b>Company: </b></td>
<td colspan=4;>M/s <?php echo $row['cname'];?></td><td><b>Issued Date: </b></td><td><?php echo $stdate = date('d-m-Y', strtotime( $row['stdate'] ));?></td>
</tr>

<tr>
<td rowspan=3;><b>Address: </b></td>
<td colspan=4; rowspan=3;>
<?php echo $row['cadd'];?>,<br>
<?php echo $row['ccity'];?>,<br>
<?php echo $row['ctalk'];?>,
<?php echo $row['cdist'];?>,<br>
<?php echo $row['cstate'];?>
<?php echo $row['cpin'];?>.
</td>
<td><b>Transit Ref: </b></td><td><?php echo $row['vdetail'];?></td>
</tr>
<tr>
<td><b>Initiated By:  </b></td><td>Mr/Mrs <?php echo $row['pby'];?></td>
</tr>
<tr>
<td><b>Initiated on: </b></td><td colspan=2;><?php echo $row['pbyt'];?></td>
</tr>
<tr>
<td><b>Contact:  </b></td><td>Mr/Mrs <?php echo $row['cpname'];?></td><td><b>Mobile: </b></td><td colspan=2;><?php echo $row['cpmobile'];?></td><td></b></td><td></td>
</tr>

</table>
</div>
<br>
<center>
<div class="col-md-12">
<table border="1" style='width:90%;:center;margin-center:5%'>
<tr><td bgcolor="A7AFB0" align="center"><b> S NO</b> </td><td bgcolor="A7AFB0" align="center"> <b>ITEM / MATERIAL DETAILS</b> </td><td bgcolor="A7AFB0" align="center"> <b>QTY </b></td><td bgcolor="A7AFB0" align="center"> <b>REMARKS</b> </td></tr>
<tr><td><?php echo $count++; ?></td><td><?php echo $row['item_description1'];?></td><td><?php echo $row['numofqty1'];?></td><td rowspan=10><?php echo $row['remarks'];?></td></tr>
<tr><td><?php echo $count++; ?></td><td><?php echo $row['item_description2'];?></td><td><?php echo $row['numofqty2'];?></td></tr>
<tr><td><?php echo $count++; ?></td><td><?php echo $row['item_description3'];?></td><td><?php echo $row['numofqty3'];?></td></tr>
<tr><td><?php echo $count++; ?></td><td><?php echo $row['item_description4'];?></td><td><?php echo $row['numofqty4'];?></td></tr>
<tr><td><?php echo $count++; ?></td><td><?php echo $row['item_description5'];?></td><td><?php echo $row['numofqty5'];?></td></tr>
<tr><td><?php echo $count++; ?></td><td><?php echo $row['item_description6'];?></td><td><?php echo $row['numofqty6'];?></td></tr>
<tr><td><?php echo $count++; ?></td><td><?php echo $row['item_description7'];?></td><td><?php echo $row['numofqty7'];?></td></tr>
<tr><td><?php echo $count++; ?></td><td><?php echo $row['item_description8'];?></td><td><?php echo $row['numofqty8'];?></td></tr>
<tr><td><?php echo $count++; ?></td><td><?php echo $row['item_description9'];?></td><td><?php echo $row['numofqty9'];?></td></tr>
<tr><td><?php echo $count++; ?></td><td><?php echo $row['item_description10'];?></td><td><?php echo $row['numofqty10'];?></td></tr>
<?php $count++; ?>
</div>
</form>
</table>
</div>
</center>
<div class="col-md-12">
<table border="1" style='width:90%;:left;margin-left:5%'>
<input ="id" type="hidden" ="<?php echo $row['id'];?>" />
<tr><td colspan=6; bgcolor="A7AFB0" align="center"><b> DECLARATION </b></td></tr>
<br>
<tr>
<td><b>Approved By</b></td><td>Mr/Mrs <?php echo $row['paby'];?></td>
<td><b>Maintenance / Store </b></td><td>Mr/Mrs <?php echo $row['msby'];?></td>
<td><b>Checked By</b></td><td>Mr/Mrs <?php echo $row['cby'];?></td>
</tr>
<tr>
<td><b>Approved on</b></td><td><?php echo $row['pabyt'];?></td>
<td><b>Maintenance / Store on</b></td><td><?php echo $row['msbyt'];?></td>
<td><b>Checked on</b></td><td><?php echo $row['cbyt'];?></td>
</tr>
<tr><td><b>Last Updated on</b></td><td colspan=2><?php echo $row['trn_date']; ?> </td>
<td><b>Printed on</b></td><td colspan=2><?php date_default_timezone_set('Asia/Kolkata'); echo date('Y-m-d') . " at " . date('H:i:s'); ?> </td></tr>
</tr>
<?php } ?>
</table>
</div>

</div>

	<!-- End Main Navigation
    ========================-->	

    <!-- Footer Area -->
    <nav id="top-menu">
	<p>
	<br>
	</p>
    </nav>
    </body>
</html>
