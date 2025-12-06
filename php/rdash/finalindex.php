<?php
require('../db.php');
include("../auth.php"); //include auth.php file on all secure pages 
?>
<?php
require("../mheader.php");
?>
<p><br><br><br></p>
<p>
   <div class="col-sm-2 col-md-2">
<table>
<form action="index.php" method="post">
<tr><td colspan=2; bgcolor="#00FF00" align="center" ><strong>SELECT</strong></td><td></td><td><select required name="year">
            <option value="">YEAR</option>
			<option value="<?php date_default_timezone_set('Asia/Kolkata'); $year = date('Y', time()); echo ($year-2); ?>"><?php date_default_timezone_set('Asia/Kolkata'); $year = date('Y', time()); echo ($year-2); ?></option>
			<option value="<?php date_default_timezone_set('Asia/Kolkata'); $year = date('Y', time()); echo ($year-1); ?>"><?php date_default_timezone_set('Asia/Kolkata'); $year = date('Y', time()); echo ($year-1); ?></option>
			<option value="<?php date_default_timezone_set('Asia/Kolkata'); $year = date('Y', time()); echo ($year); ?>"><?php date_default_timezone_set('Asia/Kolkata'); $year = date('Y', time()); echo ($year); ?></option>
            </select> </td><td colspan=2; bgcolor="#00FF00" align="center"><input type="submit" name="search" value="SEARCH"></td></tr>
</form>
</table>
  </div>
  </p>
<?php 
	date_default_timezone_set('Asia/Kolkata');
$year = date('Y', time());
if(isset($_POST['search']))
{
	$year=$_POST['year'];
// echo $year; 	
}
// echo $year; 
?>
<center>
<div style='overflow: auto;'>
<div class="col-md-12">
<table border="1" style='width:100;float:left;margin-left:5%'>
<thead bgcolor="#bfbfbf">
<tr>
<td colspan=16; align="center"><strong> <?php echo $year; ?> PRODUCTWISE STATISTICS REPORT </strong></td>
</tr>
<tr>
<td align="center"> PRODUCTWISE </td>
<td colspan=3; align="center"> WEIGHING </td>
<td colspan=2; align="center"> AUTOMATION </td>
<td> CONTROL PANELS </td>
<td colspan=2; align="center"> SPARES </td>
</tr>
<tr>
<td align="center"> MONTHS </td>
<td align="center"> PWS </td>
<td align="center"> PFS </td>
<td align="center"> CWS/PLC</td>
<td align="center"> PROCESS</td>
<td align="center"> WEIGHING</td>
<td align="center"> ELEC/INST </td>
<td align="center"> WEIGHING</td>
<td align="center"> AUTOMATION</td>
</tr>
</tr>
</thead>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\" AND Month = 'jan' and Year ='$year'";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\" AND Month = 'jan' and Year ='$year'";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\" AND Month = 'jan' and Year ='$year'";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\" AND Month = 'jan' and Year ='$year'";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\" AND Month = 'jan' and Year ='$year'";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\" AND Month = 'jan' and Year ='$year'";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\" AND Month = 'jan' and Year ='$year'";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\" AND Month = 'jan' and Year ='$year'";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
 { ?>
<tr>
<td align="center">JANUARY</td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PWS"; ?>&month=<?php echo "Jan"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PFS"; ?>&month=<?php echo "Jan"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>&month=<?php echo "Jan"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "PROCESS AUTOMATION"; ?>&month=<?php echo "Jan"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING AUTOMATION"; ?>&month=<?php echo "Jan"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "CONTROL PANELS"; ?>&month=<?php echo "Jan"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING SPARES"; ?>&month=<?php echo "Jan"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "AUTOMATION SPARES"; ?>&month=<?php echo "Jan"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
<?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query;$s7_query;} ?>
</tbody>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\" AND Month = 'feb' and Year ='$year'";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\" AND Month = 'feb' and Year ='$year'";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\" AND Month = 'feb' and Year ='$year'";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\" AND Month = 'feb' and Year ='$year'";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\" AND Month = 'feb' and Year ='$year'";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\" AND Month = 'feb' and Year ='$year'";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\" AND Month = 'feb' and Year ='$year'";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\" AND Month = 'feb' and Year ='$year'";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
 { ?>
<tr>
<td align="center">FEBUARY</td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PWS"; ?>&month=<?php echo "Feb"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PFS"; ?>&month=<?php echo "Feb"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>&month=<?php echo "Feb"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "PROCESS AUTOMATION"; ?>&month=<?php echo "Feb"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING AUTOMATION"; ?>&month=<?php echo "Feb"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "CONTROL PANELS"; ?>&month=<?php echo "Feb"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING SPARES"; ?>&month=<?php echo "Feb"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "AUTOMATION SPARES"; ?>&month=<?php echo "Feb"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
 <?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query;$s7_query;} ?>
</tbody>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\" AND Month = 'mar' and Year ='$year'";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\" AND Month = 'mar' and Year ='$year'";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\" AND Month = 'mar' and Year ='$year'";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\" AND Month = 'mar' and Year ='$year'";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\" AND Month = 'mar' and Year ='$year'";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\" AND Month = 'mar' and Year ='$year'";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\" AND Month = 'mar' and Year ='$year'";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\" AND Month = 'mar' and Year ='$year'";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
 { ?>
<tr>
<td align="center">MARCH</td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PWS"; ?>&month=<?php echo "Mar"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PFS"; ?>&month=<?php echo "Mar"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>&month=<?php echo "Mar"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "PROCESS AUTOMATION"; ?>&month=<?php echo "Mar"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING AUTOMATION"; ?>&month=<?php echo "Mar"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "CONTROL PANELS"; ?>&month=<?php echo "Mar"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING SPARES"; ?>&month=<?php echo "Mar"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "AUTOMATION SPARES"; ?>&month=<?php echo "Mar"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
<?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query;$s7_query;} ?>
</tbody>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\" AND Month = 'apr' and Year ='$year'";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\" AND Month = 'apr' and Year ='$year'";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\" AND Month = 'apr' and Year ='$year'";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\" AND Month = 'apr' and Year ='$year'";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\" AND Month = 'apr' and Year ='$year'";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\" AND Month = 'apr' and Year ='$year'";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\" AND Month = 'apr' and Year ='$year'";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\" AND Month = 'apr' and Year ='$year'";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
 { ?>
<tr>
<td align="center">APRIL</td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PWS"; ?>&month=<?php echo "Apr"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PFS"; ?>&month=<?php echo "Apr"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>&month=<?php echo "Apr"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "PROCESS AUTOMATION"; ?>&month=<?php echo "Apr"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING AUTOMATION"; ?>&month=<?php echo "Apr"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "CONTROL PANELS"; ?>&month=<?php echo "Apr"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING SPARES"; ?>&month=<?php echo "Apr"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "AUTOMATION SPARES"; ?>&month=<?php echo "Apr"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
<?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query;$s7_query;} ?>
</tbody>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\" AND Month = 'may' and Year ='$year'";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\" AND Month = 'may' and Year ='$year'";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\" AND Month = 'may' and Year ='$year'";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\" AND Month = 'may' and Year ='$year'";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\" AND Month = 'may' and Year ='$year'";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\" AND Month = 'may' and Year ='$year'";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\" AND Month = 'may' and Year ='$year'";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\" AND Month = 'may' and Year ='$year'";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
 { ?>
<tr>
<td align="center">MAY</td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PWS"; ?>&month=<?php echo "May"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PFS"; ?>&month=<?php echo "May"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>&month=<?php echo "May"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "PROCESS AUTOMATION"; ?>&month=<?php echo "May"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING AUTOMATION"; ?>&month=<?php echo "May"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "CONTROL PANELS"; ?>&month=<?php echo "May"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING SPARES"; ?>&month=<?php echo "May"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "AUTOMATION SPARES"; ?>&month=<?php echo "May"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
<?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query;$s7_query;} ?>
</tbody>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\" AND Month = 'jun' and Year ='$year'";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\" AND Month = 'jun' and Year ='$year'";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\" AND Month = 'jun' and Year ='$year'";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\" AND Month = 'jun' and Year ='$year'";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\" AND Month = 'jun' and Year ='$year'";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\" AND Month = 'jun' and Year ='$year'";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\" AND Month = 'jun' and Year ='$year'";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\" AND Month = 'jun' and Year ='$year'";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
{ ?>
<tr>
<td align="center">JUNE</td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PWS"; ?>&month=<?php echo "Jun"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PFS"; ?>&month=<?php echo "Jun"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>&month=<?php echo "Jun"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "PROCESS AUTOMATION"; ?>&month=<?php echo "Jun"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING AUTOMATION"; ?>&month=<?php echo "Jun"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "CONTROL PANELS"; ?>&month=<?php echo "Jun"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING SPARES"; ?>&month=<?php echo "Jun"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "AUTOMATION SPARES"; ?>&month=<?php echo "Jun"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
 <?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query;$s7_query;} ?>
</tbody>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\" AND Month = 'jul' and Year ='$year'";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\" AND Month = 'jul' and Year ='$year'";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\" AND Month = 'jul' and Year ='$year'";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\" AND Month = 'jul' and Year ='$year'";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\" AND Month = 'jul' and Year ='$year'";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\" AND Month = 'jul' and Year ='$year'";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\" AND Month = 'jul' and Year ='$year'";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\" AND Month = 'jul' and Year ='$year'";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
 { ?>
<tr>
<td align="center">JULY</td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PWS"; ?>&month=<?php echo "Jul"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PFS"; ?>&month=<?php echo "Jul"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>&month=<?php echo "Jul"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "PROCESS AUTOMATION"; ?>&month=<?php echo "Jul"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING AUTOMATION"; ?>&month=<?php echo "Jul"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "CONTROL PANELS"; ?>&month=<?php echo "Jul"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING SPARES"; ?>&month=<?php echo "Jul"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "AUTOMATION SPARES"; ?>&month=<?php echo "Jul"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
<?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query;$s7_query;} ?>
</tbody>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\" AND Month = 'aug' and Year ='$year'";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\" AND Month = 'aug' and Year ='$year'";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\" AND Month = 'aug' and Year ='$year'";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\" AND Month = 'aug' and Year ='$year'";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\" AND Month = 'aug' and Year ='$year'";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\" AND Month = 'aug' and Year ='$year'";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\" AND Month = 'aug' and Year ='$year'";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\" AND Month = 'aug' and Year ='$year'";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
 { ?>
<tr>
<td align="center">AUGUST</td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PWS"; ?>&month=<?php echo "Aug"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PFS"; ?>&month=<?php echo "Aug"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>&month=<?php echo "Aug"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "PROCESS AUTOMATION"; ?>&month=<?php echo "Aug"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING AUTOMATION"; ?>&month=<?php echo "Aug"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "CONTROL PANELS"; ?>&month=<?php echo "Aug"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING SPARES"; ?>&month=<?php echo "Aug"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "AUTOMATION SPARES"; ?>&month=<?php echo "Aug"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
<?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query;$s7_query;} ?>
</tbody>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\" AND Month = 'sep' and Year ='$year'";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\" AND Month = 'sep' and Year ='$year'";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\" AND Month = 'sep' and Year ='$year'";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\" AND Month = 'sep' and Year ='$year'";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\" AND Month = 'sep' and Year ='$year'";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\" AND Month = 'sep' and Year ='$year'";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\" AND Month = 'sep' and Year ='$year'";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\" AND Month = 'sep' and Year ='$year'";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
 { ?>
<tr>
<td align="center">SEPTEMBER</td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PWS"; ?>&month=<?php echo "Sep"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PFS"; ?>&month=<?php echo "Sep"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>&month=<?php echo "Sep"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "PROCESS AUTOMATION"; ?>&month=<?php echo "Sep"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING AUTOMATION"; ?>&month=<?php echo "Sep"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "CONTROL PANELS"; ?>&month=<?php echo "Sep"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING SPARES"; ?>&month=<?php echo "Sep"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "AUTOMATION SPARES"; ?>&month=<?php echo "Sep"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
<?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query;$s7_query;} ?>
</tbody>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\" AND Month = 'oct' and Year ='$year'";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\" AND Month = 'oct' and Year ='$year'";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\" AND Month = 'oct' and Year ='$year'";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\" AND Month = 'oct' and Year ='$year'";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\" AND Month = 'oct' and Year ='$year'";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\" AND Month = 'oct' and Year ='$year'";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\" AND Month = 'oct' and Year ='$year'";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\" AND Month = 'oct' and Year ='$year'";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
 { ?>
<tr>
<td align="center">OCTOBER</td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PWS"; ?>&month=<?php echo "Oct"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PFS"; ?>&month=<?php echo "Oct"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>&month=<?php echo "Oct"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "PROCESS AUTOMATION"; ?>&month=<?php echo "Oct"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING AUTOMATION"; ?>&month=<?php echo "Oct"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "CONTROL PANELS"; ?>&month=<?php echo "Oct"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING SPARES"; ?>&month=<?php echo "Oct"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "AUTOMATION SPARES"; ?>&month=<?php echo "Oct"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
<?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query; $s7_query;} ?>
</tbody>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\" AND Month = 'nov' and Year ='$year'";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\" AND Month = 'nov' and Year ='$year'";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\" AND Month = 'nov' and Year ='$year'";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\" AND Month = 'nov' and Year ='$year'";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\" AND Month = 'nov' and Year ='$year'";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\" AND Month = 'nov' and Year ='$year'";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\" AND Month = 'nov' and Year ='$year'";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\" AND Month = 'nov' and Year ='$year'";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
 { ?>
<tr>
<td align="center">NOVEMBER</td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PWS"; ?>&month=<?php echo "Nov"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PFS"; ?>&month=<?php echo "Nov"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>&month=<?php echo "Nov"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "PROCESS AUTOMATION"; ?>&month=<?php echo "Nov"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING AUTOMATION"; ?>&month=<?php echo "Nov"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "CONTROL PANELS"; ?>&month=<?php echo "Nov"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING SPARES"; ?>&month=<?php echo "Nov"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "AUTOMATION SPARES"; ?>&month=<?php echo "Nov"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
<?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query;$s7_query;} ?>
</tbody>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\" AND Month = 'dec' and Year ='$year'";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\" AND Month = 'dec' and Year ='$year'";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\" AND Month = 'dec' and Year ='$year'";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\" AND Month = 'dec' and Year ='$year'";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\" AND Month = 'dec' and Year ='$year'";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\" AND Month = 'dec' and Year ='$year'";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\" AND Month = 'dec' and Year ='$year'";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\" AND Month = 'dec' and Year ='$year'";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
 { ?>
<tr>
<td align="center">DECEMBER</td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PWS"; ?>&month=<?php echo "Dec"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - PFS"; ?>&month=<?php echo "Dec"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>&month=<?php echo "Dec"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "PROCESS AUTOMATION"; ?>&month=<?php echo "Dec"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING AUTOMATION"; ?>&month=<?php echo "Dec"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "CONTROL PANELS"; ?>&month=<?php echo "Dec"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "WEIGHING SPARES"; ?>&month=<?php echo "Dec"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="newmr.php?product=<?php echo "AUTOMATION SPARES"; ?>&month=<?php echo "Dec"; ?>&year=<?php echo "$year"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
 <?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query;$s7_query;} ?>
</tbody>
<thead bgcolor="#bfbfbf">
<tr>
<td colspan=9; align="center"><strong> TOTAL DATABASE </strong></td>
</tr>
<tbody>
<?php
$s1_query="Select count(id) from activity where product=\"WEIGHING - PWS\"";
$s2_query="Select count(id) from activity where product=\"WEIGHING - PFS\"";
$s3y_query="Select count(id) from activity where product=\"WEIGHING - CWS/PLC\"";
$s3n_query="Select count(id) from activity where product=\"PROCESS AUTOMATION\"";
$s4_query="Select count(id) from activity where product=\"WEIGHING AUTOMATION\"";
$s5_query="Select count(id) from activity where product=\"CONTROL PANELS\"";
$s6_query="Select count(id) from activity where product=\"WEIGHING SPARES\"";
$s7_query="Select count(id) from activity where product=\"AUTOMATION SPARES\"";
$s1result = mysqli_query($con,$s1_query);
$s2result = mysqli_query($con,$s2_query);
$s3yresult = mysqli_query($con,$s3y_query);
$s3nresult = mysqli_query($con,$s3n_query);
$s4result = mysqli_query($con,$s4_query);
$s5result = mysqli_query($con,$s5_query);
$s6result = mysqli_query($con,$s6_query);
$s7result = mysqli_query($con,$s7_query);
$s1total_rows = mysqli_fetch_array($s1result)[0];
$s2total_rows = mysqli_fetch_array($s2result)[0];
$s3ytotal_rows = mysqli_fetch_array($s3yresult)[0];
$s3ntotal_rows = mysqli_fetch_array($s3nresult)[0];
$s4total_rows = mysqli_fetch_array($s4result)[0];
$s5total_rows = mysqli_fetch_array($s5result)[0];
$s6total_rows = mysqli_fetch_array($s6result)[0];
$s7total_rows = mysqli_fetch_array($s7result)[0];
 { ?>
<tr>
<td align="center">TOTAL</td>
<td align="center"><a href="tdb.php?product=<?php echo "WEIGHING - PWS"; ?>" target="_blank"><?php echo $s1total_rows; ?></td>
<td align="center"><a href="tdb.php?product=<?php echo "WEIGHING - PFS"; ?>" target="_blank"><?php echo $s2total_rows; ?></td>
<td align="center"><a href="tdb.php?product=<?php echo "WEIGHING - CWS/PLC"; ?>" target="_blank"><?php echo $s3ytotal_rows; ?></td>
<td align="center"><a href="tdb.php?product=<?php echo "PROCESS AUTOMATION"; ?>" target="_blank"><?php echo $s3ntotal_rows; ?></td>
<td align="center"><a href="tdb.php?product=<?php echo "WEIGHING AUTOMATION"; ?>" target="_blank"><?php echo $s4total_rows; ?></td>
<td align="center"><a href="tdb.php?product=<?php echo "CONTROL PANELS"; ?>" target="_blank"><?php echo $s5total_rows; ?></td>
<td align="center"><a href="tdb.php?product=<?php echo "WEIGHING SPARES"; ?>" target="_blank"><?php echo $s6total_rows; ?></td>
<td align="center"><a href="tdb.php?product=<?php echo "AUTOMATION SPARES"; ?>" target="_blank"><?php echo $s7total_rows; ?></td>
</tr>
<?php $s1_query; $s2_query; $s3y_query; $s3n_query; $s4_query; $s5_query;$s6_query;$s7_query; } ?>
</tbody>
<thead bgcolor="#bfbfbf">
<tr>
<td align="center"> MONTHS </td>
<td align="center"> PWS </td>
<td align="center"> PFS </td>
<td align="center"> CWS/PLC</td>
<td align="center"> PROCESS</td>
<td align="center"> WEIGHING</td>
<td align="center"> ELEC/INST </td>
<td align="center"> WEIGHING</td>
<td align="center"> AUTOMATION</td>
</tr>
</thead>
</table>
</div>
</div>
</div>
<br>
<?php
require("../footer.php");
?>