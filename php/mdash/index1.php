<?php
require('../db.php');
include("../auth.php"); //include auth.php file on all secure pages 
?>
<?php
require("../mheader.php");
?>
<p><br><br><br></p>
<center>
		<a href="vall.php" target="_blank" class="btn btn-warning">Vendor Count : 
		<?php
require('../db.php');
   $query1="select count(id) from punch";
   $result1 = mysqli_query($con,$query1);
   $total_rows1 = mysqli_fetch_array($result1)[0];
 { ?>
<td align="center" bgcolor='#bfbfbf'> <?php echo $total_rows1; ?></td>
<?php $query1;} ?>
</a>		
</center>
<br>
<center>
<div style='overflow: auto;'>
<div class="row">
<div class="col-md-2">
<table border="1" style='width:40;float:left;margin-left:15%'>
<thead align="center" bgcolor="#bfbfbf">
<tr>
<th><strong>ID </strong></th>
<th><strong>product </strong></th>
<th><strong>Process </strong></th>

</tr>
</thead>
<tbody>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$sel_query="Select * from products ORDER BY id asc";
$result = mysqli_query($con,$sel_query);
        $no_of_records_per_page = 10;
        $offset = 0 * $no_of_records_per_page;

        $total_pages_sql = "SELECT COUNT(*) FROM products ORDER BY id asc";
        $result = mysqli_query($con,$total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);

        $sql = "SELECT * FROM products ORDER BY id asc LIMIT $offset, $no_of_records_per_page";
		$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_assoc($result)) { ?>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$product=$row["product"];
////$customer="IREPS";
//$cnt="1";
        $sqlcount="Select count(id) from punch where product='".$product."'  ";
		$sqlresult = mysqli_query($con,$sqlcount);
		$sqlcountrows = mysqli_fetch_array($sqlresult)[0];
 
$s1result = mysqli_query($con,$sqlcount);
$s1total_rows = mysqli_fetch_array($s1result)[0];
 
	if ($s1total_rows < 5) {
	$bgColor = ' style="background-color:#FF0000;" ';
	}else{
	$bgColor = ' style="background-color:#44FF33;" ';	
}
?>
<tr>
<td align="left"><?php echo $row["id"]; ?></td>
<td align="left"><?php echo $row["product"]; ?></td>
<td align="center" <?php echo $bgColor; ?> ><a href="vproduct.php?product=<?php echo $row["product"]; ?>" target="_blank"><?php echo $s1total_rows; ?></a></td>
<?php } ?>
</tbody>
</table>
</div>
<table border="1" style="border-collapse:collapse;">
<thead align="center" bgcolor="#bfbfbf">
<tr>

<th><strong>ID </strong></th>
<th><strong>product </strong></th>
<th><strong>Process </strong></th>

</tr>
</thead>
<tbody>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$sel_query="Select * from products ORDER BY id asc";
$result = mysqli_query($con,$sel_query);
        $no_of_records_per_page = 10;
        $offset = 1 * $no_of_records_per_page;

        $total_pages_sql = "SELECT COUNT(*) FROM products ORDER BY id asc";
        $result = mysqli_query($con,$total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);

        $sql = "SELECT * FROM products ORDER BY id asc LIMIT $offset, $no_of_records_per_page";
		$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_assoc($result)) { ?>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$product=$row["product"];
//$customer="IREPS";
        $sqlcount="Select count(id) from punch where product='".$product."'  ";
		$sqlresult = mysqli_query($con,$sqlcount);
		$sqlcountrows = mysqli_fetch_array($sqlresult)[0];

   
$s1result = mysqli_query($con,$sqlcount);
$s1total_rows = mysqli_fetch_array($s1result)[0];
   
		if ($s1total_rows < 5) {
	$bgColor = ' style="background-color:#FF0000;" ';
	}else{
	$bgColor = ' style="background-color:#44FF33;" ';	
}
?>
<tr>
<td align="left"><?php echo $row["id"]; ?></td>
<td align="left"><?php echo $row["product"]; ?></td>
<td align="center" <?php echo $bgColor; ?> ><a href="vproduct.php?product=<?php echo $row["product"]; ?>" target="_blank"><?php echo $s1total_rows; ?></a></td>
<?php } ?>
</tbody>
</table>
</div>
<div class="col-md-2">
<table border="1" style="border-collapse:collapse;">
<thead align="center" bgcolor="#bfbfbf">
<tr>

<th><strong>ID </strong></th>
<th><strong>product </strong></th>
<th><strong>Process </strong></th>

</tr>
</thead>
<tbody>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$sel_query="Select * from products ORDER BY id asc";
$result = mysqli_query($con,$sel_query);
        $no_of_records_per_page = 10;
        $offset = 2 * $no_of_records_per_page;

        $total_pages_sql = "SELECT COUNT(*) FROM products ORDER BY id asc";
        $result = mysqli_query($con,$total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);

        $sql = "SELECT * FROM products ORDER BY id asc LIMIT $offset, $no_of_records_per_page";
		$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_assoc($result)) { ?>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$product=$row["product"];
//$customer="IREPS";
        $sqlcount="Select count(id) from punch where product='".$product."'  ";
		$sqlresult = mysqli_query($con,$sqlcount);
		$sqlcountrows = mysqli_fetch_array($sqlresult)[0];
   
$s1result = mysqli_query($con,$sqlcount);
$s1total_rows = mysqli_fetch_array($s1result)[0];
   
		if ($s1total_rows < 5) {
	$bgColor = ' style="background-color:#FF0000;" ';
	}else{
	$bgColor = ' style="background-color:#44FF33;" ';	
}
?>
<tr>
<td align="left"><?php echo $row["id"]; ?></td>
<td align="left"><?php echo $row["product"]; ?></td>
<td align="center" <?php echo $bgColor; ?> ><a href="vproduct.php?product=<?php echo $row["product"]; ?>" target="_blank"><?php echo $s1total_rows; ?></a></td>
<?php } ?>
</tbody>
</table>
</div>



<div class="col-md-2">
<table border="1" style="border-collapse:collapse;">
<thead align="center" bgcolor="#bfbfbf">
<tr>

<th><strong>ID </strong></th>
<th><strong>product </strong></th>
<th><strong>Process </strong></th>
</tr>
</thead>
<tbody>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$sel_query="Select * from products ORDER BY id asc";
$result = mysqli_query($con,$sel_query);
        $no_of_records_per_page = 10;
        $offset = 3 * $no_of_records_per_page;

        $total_pages_sql = "SELECT COUNT(*) FROM products ORDER BY id asc";
        $result = mysqli_query($con,$total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);

        $sql = "SELECT * FROM products ORDER BY id asc LIMIT $offset, $no_of_records_per_page";
		$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_assoc($result)) { ?>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$product=$row["product"];
//$customer="IREPS";
        $sqlcount="Select count(id) from punch where product='".$product."'  ";
		$sqlresult = mysqli_query($con,$sqlcount);
		$sqlcountrows = mysqli_fetch_array($sqlresult)[0];
	
   
$s1result = mysqli_query($con,$sqlcount);
$s1total_rows = mysqli_fetch_array($s1result)[0];	
	
	if ($s1total_rows < 5) {
	$bgColor = ' style="background-color:#FF0000;" ';
	}else{
	$bgColor = ' style="background-color:#44FF33;" ';	
}

?>
<tr>
<td align="left"><?php echo $row["id"]; ?></td>
<td align="left"><?php echo $row["product"]; ?></td>
<td align="center" <?php echo $bgColor; ?> ><a href="vproduct.php?product=<?php echo $row["product"]; ?>" target="_blank"><?php echo $s1total_rows; ?></a></td>
<?php } ?>
</tbody>
</table>
</div>
<div class="col-md-2">
<table border="1" style="border-collapse:collapse;">
<thead align="center" bgcolor="#bfbfbf">
<tr>
<th><strong>ID </strong></th>
<th><strong>product </strong></th>
<th><strong>Process </strong></th>
</tr>
</thead>
<tbody>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$sel_query="Select * from products ORDER BY id asc";
$result = mysqli_query($con,$sel_query);
        $no_of_records_per_page = 10;
        $offset = 4 * $no_of_records_per_page;

        $total_pages_sql = "SELECT COUNT(*) FROM products ORDER BY id asc";
        $result = mysqli_query($con,$total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);

        $sql = "SELECT * FROM products ORDER BY id asc LIMIT $offset, $no_of_records_per_page";
		$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_assoc($result)) { ?>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$product=$row["product"];
//$customer="IREPS";
        $sqlcount="Select count(id) from punch where product='".$product."'  ";
		$sqlresult = mysqli_query($con,$sqlcount);
		$sqlcountrows = mysqli_fetch_array($sqlresult)[0];
		
   
$s1result = mysqli_query($con,$sqlcount);
$s1total_rows = mysqli_fetch_array($s1result)[0];

   if ($s1total_rows < 5) {
	$bgColor = ' style="background-color:#FF0000;" ';
	}else{
	$bgColor = ' style="background-color:#44FF33;" ';
	}	
?>
<tr>
<td align="left"><?php echo $row["id"]; ?></td>
<td align="left"><?php echo $row["product"]; ?></td>
<td align="center" <?php echo $bgColor; ?> ><a href="vproduct.php?product=<?php echo $row["product"]; ?>" target="_blank"><?php echo $s1total_rows; ?></a></td>
<?php } ?>
</tbody>
</table>
</div>
<div class="col-md-2">
<table border="1" style="border-collapse:collapse;">
<thead align="center" bgcolor="#bfbfbf">
<tr>

<th><strong>ID </strong></th>
<th><strong>product </strong></th>
<th><strong>Process </strong></th>
</tr>
</thead>
<tbody>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$sel_query="Select * from products ORDER BY id asc";
$result = mysqli_query($con,$sel_query);
        $no_of_records_per_page = 10;
        $offset = 5 * $no_of_records_per_page;

        $total_pages_sql = "SELECT COUNT(*) FROM products ORDER BY id asc";
        $result = mysqli_query($con,$total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);

        $sql = "SELECT * FROM products ORDER BY id asc LIMIT $offset, $no_of_records_per_page";
		$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_assoc($result)) { ?>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$product=$row["product"];
//$customer="IREPS";
        $sqlcount="Select count(id) from punch where product='".$product."'  ";
		$sqlresult = mysqli_query($con,$sqlcount);
		$sqlcountrows = mysqli_fetch_array($sqlresult)[0];
		
   
$s1result = mysqli_query($con,$sqlcount);
$s1total_rows = mysqli_fetch_array($s1result)[0];

   if ($s1total_rows < 5) {
	$bgColor = ' style="background-color:#FF0000;" ';
	}else{
	$bgColor = ' style="background-color:#44FF33;" ';
	}	
?>
<tr>
<td align="left"><?php echo $row["id"]; ?></td>
<td align="left"><?php echo $row["product"]; ?></td>
<td align="center" <?php echo $bgColor; ?> ><a href="vproduct.php?product=<?php echo $row["product"]; ?>" target="_blank"><?php echo $s1total_rows; ?></a></td>
<?php } ?>
</tbody>
</table>
</div>
</div>
</center>
<br><br>
<center>
<div style='overflow: auto;'>
<div class="col-md-2">
<table border="1" style='width:40;float:left;margin-left:15%'>
<thead align="center" bgcolor="#bfbfbf">
<tr>

<th><strong>ID </strong></th>
<th><strong>product </strong></th>
<th><strong>Process </strong></th>
</tr>
</thead>
<tbody>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$sel_query="Select * from products ORDER BY id asc";
$result = mysqli_query($con,$sel_query);
        $no_of_records_per_page = 10;
        $offset = 6 * $no_of_records_per_page;

        $total_pages_sql = "SELECT COUNT(*) FROM products ORDER BY id asc";
        $result = mysqli_query($con,$total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);

        $sql = "SELECT * FROM products ORDER BY id asc LIMIT $offset, $no_of_records_per_page";
		$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_assoc($result)) { ?>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$product=$row["product"];
//$customer="IREPS";
        $sqlcount="Select count(id) from punch where product='".$product."'  ";
		$sqlresult = mysqli_query($con,$sqlcount);
		$sqlcountrows = mysqli_fetch_array($sqlresult)[0];
		
   
$s1result = mysqli_query($con,$sqlcount);
$s1total_rows = mysqli_fetch_array($s1result)[0];

   if ($s1total_rows < 5) {
	$bgColor = ' style="background-color:#FF0000;" ';
	}else{
	$bgColor = ' style="background-color:#44FF33;" ';
	}	
?>
<tr>
<td align="left"><?php echo $row["id"]; ?></td>
<td align="left"><?php echo $row["product"]; ?></td>
<td align="center" <?php echo $bgColor; ?> ><a href="vproduct.php?product=<?php echo $row["product"]; ?>" target="_blank"><?php echo $s1total_rows; ?></a></td>
<?php } ?>
</tbody>
</table>
</div>
</div>
</div>
</center>
<br><br>			
<p><br></p><p><br></p>
<?php
require("../footer.php");
?>