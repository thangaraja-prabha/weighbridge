<?php
require('../db.php');
include("../auth.php");
?>
<?php
require("../cheader.php");
?>
<p><br><br><br></p>
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
	$type = $_REQUEST['type'];;
	$trn_date = date("Y-m-d H:i:s");
  	// Get text
 // 	$image_text = mysqli_real_escape_string($db, $_POST['image_text']);

  	// image file directory
//  	$target = "items_gallery/".basename($imagetitle);
//if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {

	$squery="select type from types where type='$type' ";
	$sql=mysqli_query($con,$squery);
	$row=mysqli_num_rows($sql);	
	if($row==1)
	{
		$msg = "Already Exists";
	}
	else
	{

	$sql = "INSERT INTO types (type, username, trn_date) VALUES ('$type', '$username', '$trn_date')";
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
  <form method="POST" action="index.php" enctype="multipart/form-data">
  	<input type="hidden" name="size" value="1000000">
<table> 
	<tr>
    <td bgcolor="#bfbfbf" colspan=2; align="center"><strong>CREATE DEPARTMENT</strong></td>
    </tr> 	
<tr><td  colspan=2>
  	  <input type="text" name="type" required>
</td></tr>
<tr><td colspan=2; align="center">
  		<button class="btn btn-success" type="submit" name="submit">SUBMIT</button>
</td></tr>
</table> 
  </form>
</center>
<br>
<center>   
<table>
<thead>
<tr>
<tr><td bgcolor="#bfbfbf"; colspan=12; align="center"><strong>  LIST OF DEPARTMENT </strong></td></tr>
<th><strong>S.No</strong></th>
<th><strong>Types</strong></th>
<th><strong>Created By</strong></th>
<th><strong>Created On</strong></th>
<th><strong>Update</strong></th>
</tr>
</thead>
<tbody>
<?php
require('../db.php');
    $query = "SELECT * FROM `types` where not type='Admins' ";
	 $result = mysqli_query($con, $query);
$count=1;
while($row = mysqli_fetch_array($result)): 
{
?>
<tr>
<td align="center"><?php echo $count; ?></td>
<td align="left"><?php echo $row["type"]; ?></td>
<td align="center"><?php echo $row["username"]; ?></td>
<td align="center"><?php echo $row["trn_date"]; ?></td>
<td align="center"><a href="typee.php?id=<?php echo $row["id"]; ?>">Update</td>
<?php $count++; } ?>
<?php endwhile;?>
</tbody>
</table>
<br>
</div>
</center>
<?php
require("../footer.php");
?>