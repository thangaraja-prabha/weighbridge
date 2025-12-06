<?php
require('../db.php');
//include("../auth.php"); //include auth.php file on all secure pages 
require("../cheader.php");
?>
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        *********************************************************************************************************************************************************** -->
    <!--main content start-->
<section id="main-content">
<section class="wrapper">
<h3><i class="fa fa-angle-right"></i> REPORTS </h3>
<div class="row">
<div class="col-lg-12">
<div style='overflow: auto;'>
<h4><i class="fa fa-angle-right"></i> Custom Reports </h4>
<section id="unseen">
<table class="table table-bordered table-striped table-condensed">
<thead>
<tbody>
<tr>
<form action="../cust/cr.php" method="post" target="_blank" >
<tr>
<td><b>START DATE </b></td>
<td>
<input class="form-control form-control-inline input-medium default-date-picker" size="16" type="text" name="std" required value=""></td>
</tr>
<tr>
<td><b>END DATE </b></td>
<td><input class="form-control form-control-inline input-medium default-date-picker" size="16" type="text" name="edd" required value=""></td>
</tr>
<tr>
<td><b>Type </b></td>
<td>
<select name="dept" required >
    <option value required>-- Select --</option>
    <?php
        include "../db.php";  // Using database connection file here
        $records = mysqli_query($con, "SELECT dept From depts");  // Use select query here 

        while($data = mysqli_fetch_array($records))
        {
            echo "<option value='". $data['dept'] ."'>" .$data['dept'] ."</option>";  // displaying data in option menu
        }	
    ?>  
</select>
<?php mysqli_close($con);  // close connection ?>
</td>
</tr>
<tr>
<td><b>Status </b></td>
<td><label for="stat">
    <Select required name="stat">
								<option required value=""/> --- Select --- </option>
								<option value="Pending">Pending </option>
								<option value="Completed">Completed</option>
								<option value="Skipped">Skipped</option>
	</Select>
	</label>
</td>
</tr>
<tr>
<td colspan=2; align="center">
    <b><input type="submit" name="search" value="SEARCH">
</b></td>
</tr>
		 </form>
		 </table>
</center>
<br><br>			
<p><br></p><p><br></p>
<?php
//require("../footer.php");
require("../footer.php");
?>