<?php
require('../db.php');
//include("../auth.php");
require("../cheader.php");
?>
<?php
require('../db.php');

if(isset($_POST['search']))
{
    $valueToSearch = $_POST['valueToSearch'];
    // search in all table columns
    // using concat mysql function
    $query = "SELECT * FROM `users` WHERE ( CONCAT(`empname`) LIKE '%".$valueToSearch."%' AND not type='Admins' AND NOT type='Administrator' ) ";
    $search_result = filterTable($query);
    
}
 else {
    $query = "SELECT * FROM `users` WHERE NOT type='Admins' AND NOT type='Administrator' ";
    $search_result = filterTable($query);
}

// function to connect and execute the query
function filterTable($query)
{
    require ('../db.php');
    $filter_Result = mysqli_query($con, $query);
    return $filter_Result;
}

?>
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        *********************************************************************************************************************************************************** -->
    <!--main content start-->
<section id="main-content">
<section class="wrapper">
<h3><i class="fa fa-angle-right"></i> USERS </h3>
<div class="row">
<div class="col-lg-12">
<div style='overflow: auto;'>
<h4><i class="fa fa-angle-right"></i> LIST OF USERS </h4>
<div style='overflow: auto;'>
<div class="row">
<div class="col-md-12">
<table class="table table-bordered table-striped table-condensed">
<div style='overflow: auto;'>      
<thead>
<tr>
<tr><td bgcolor="#bfbfbf" colspan=8; align="center"><strong> LIST OF USER'S </strong></td></tr>
<th><strong>S.No</strong></th>
<th><strong>Name</strong></th>
<th><strong>Username</strong></th>
<th><strong>Designation</strong></th>
<th><strong>Emp Code</strong></th>
<th><strong>Email</strong></th>
<th><strong>Mobile</strong></th>
</tr>
</thead>
<tbody>
<?php
$count=1;
while($row = mysqli_fetch_array($search_result)): 
{
?>
<tr>
<td align="center"><?php echo $count; ?></td>
<td align="left"><?php echo $row["empname"]; ?></td>
<td align="left"><?php echo $row["username"]; ?></td>
<td align="left"><?php echo $row["empdest"]; ?></td>
<td align="center"><?php echo $row["empcode"]; ?></td>
<td align="center"><?php echo $row["email"]; ?></td>
<td align="center"><?php echo $row["mobile"]; ?></td>
<?php $count++; } ?>
<?php endwhile;?>
</tbody>
</table>
<br>
</div>
</center>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
</section>
<?php
require("../footer.php");
?>