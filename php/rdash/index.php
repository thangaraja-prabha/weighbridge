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
<h3><i class="fa fa-angle-right"></i> DASHBOARD </h3>
<div class="row">
<div class="col-lg-12">
<div style='overflow: auto;'>
<h4><i class="fa fa-angle-right"></i> MAINTENANCE LOGS </h4>
<div style='overflow: auto;'>
<div class="row">
<div class="col-md-12">
<table class="table table-bordered table-striped table-condensed">
<thead align="center" bgcolor="#bfbfbf">
<tr>
<th align="center" colspan=14><strong> REPORT FOR THE YEAR OF  <?php date_default_timezone_set('Asia/Kolkata'); $year = date('Y', time());
//$year=date('Y',strtotime($year));
$month = date('M', time());
$Startdate=date('Y-m-01 00:00:00',strtotime($month));
$Enddate=date('Y-m-31 23:59:59',strtotime($month)); echo $date = date('Y', time()); ?></strong></th>
</tr>
<tr>
<th><strong> MAINTENANCE COUNT </strong></th>
<?php 
include "../db.php";  // Using database connection file here
$anaytb_query="Select * from months" ;
$aresult = mysqli_query($con,$anaytb_query);
while($row = mysqli_fetch_assoc($aresult)) { ?>
<?php
//$anaytbrows = mysqli_fetch_array($aresult)[0];
//$dept=$row["dept"];
$month=$row["month"];
//echo "<table border='1' style='width:40;float:center;margin-center:15%'>";
//echo "<tbody>";
//echo "<tr>";
//echo "<thead align='center' bgcolor='#bfbfbf'>";
echo "<td>";
//echo $row["dept"];
echo $row["month"];
//echo "|";
echo "</td>";
//echo "</thead>";
//echo "</tr>";
//echo "</tbody>";
//echo "</table>";
?>
<?php } ?>
<tbody>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
$submittedby = $_SESSION["username"];
//	$submittedby=$_REQUEST['user'];
//$submittedby = $_SESSION['username'];
//echo "$submittedby";
$recordss = mysqli_query($con, "SELECT * From depts");  // Use select query here
								while($row = mysqli_fetch_array($recordss))
								{		
//$submittedby=$row['submittedby'];
								}
$stat='Completed';
//$dept='';
//$submittedby='22F6D3D2';
$sel_query="Select * from mlog where stat='".$stat."'  GROUP BY stat";
$result = mysqli_query($con,$sel_query);
        $no_of_records_per_page = 100;
        $offset = 0 * $no_of_records_per_page;
        $total_pages_sql = "SELECT COUNT(*) FROM mlog where stat='".$stat."' GROUP BY stat ";
        $result = mysqli_query($con,$total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);
        $sql = "SELECT * FROM mlog where stat='".$stat."'  GROUP BY stat ORDER BY id DESC LIMIT $offset, $no_of_records_per_page";
		$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_assoc($result)) { ?>
<?php
date_default_timezone_set('Asia/Kolkata');
 $Startdate1=date('01-01-Y');
  $Startdate2=date('02-01-Y');
   $Startdate3=date('03-01-Y');
    $Startdate4=date('04-01-Y');
	 $Startdate5=date('05-01-Y');
	  $Startdate6=date('06-01-Y');
	   $Startdate7=date('07-01-Y');
	    $Startdate8=date('08-01-Y');
		 $Startdate9=date('09-01-Y');
		  $Startdate10=date('10-01-Y');
		   $Startdate11=date('11-01-Y');
		    $Startdate12=date('12-01-Y');
			$Startdate13=date('01-01-Y');
			// echo $Startdate1; 
 // echo "<br>"; 
 //$txtEndDate=$_REQUEST['txtEndDate'];
 $Enddate1=date('01-31-Y');
  $Enddate2=date('02-31-Y');
   $Enddate3=date('03-31-Y');
    $Enddate4=date('04-31-Y');
	 $Enddate5=date('05-31-Y');
	  $Enddate6=date('06-31-Y');
	   $Enddate7=date('07-31-Y');
	    $Enddate8=date('08-31-Y');
		 $Enddate9=date('09-31-Y');
		  $Enddate10=date('10-31-Y');
		   $Enddate11=date('11-31-Y');
		    $Enddate12=date('12-31-Y');
			 $Enddate13=date('12-31-Y');
$date = date('Y-m-d', time());
//$stat='Completed';
//$submittedby=$_REQUEST['user'];
//$dept='NON-RETURNABLE GATE PASS';
$submittedby = $_SESSION['username'];
$recordss = mysqli_query($con, "SELECT * From mlog where stat='".$stat."'  ");  // Use select query here
								while($data = mysqli_fetch_array($recordss))
								{
						//			echo $data['dept'];  // displaying data in option menu
								}
//$dept=$row["dept"];
//$dept=$row["dept"];
//$dept='22F6D3D2';
//$dept="Rice";
////$customer="IREPS";
//$cnt="1";
//$dept='NON-RETURNABLE GATE PASS';
//$stat='Completed';
$sqlcount1="Select count(dept) from mlog where stat='".$stat."'  AND  stdate Between '".$Startdate1."'  and '".$Enddate1."'  ";
$sqlresult1 = mysqli_query($con,$sqlcount1);
$sqlcountrows1 = mysqli_fetch_array($sqlresult1)[0];
$s1result = mysqli_query($con,$sqlcount1);
$s1total_rows = mysqli_fetch_array($s1result)[0];

$sqlcount2="Select count(dept) from mlog where stat='".$stat."'  AND   stdate Between '".$Startdate2."'  and '".$Enddate2."'  ";
$sqlresult2 = mysqli_query($con,$sqlcount2);
$sqlcountrows2 = mysqli_fetch_array($sqlresult2)[0];
$s2result = mysqli_query($con,$sqlcount2);
$s2total_rows = mysqli_fetch_array($s2result)[0];

$sqlcount3="Select count(dept) from mlog where stat='".$stat."'  AND    stdate Between '".$Startdate3."'  and '".$Enddate3."' ";
$sqlresult3 = mysqli_query($con,$sqlcount3);
$sqlcountrows3 = mysqli_fetch_array($sqlresult3)[0];
$s3result = mysqli_query($con,$sqlcount3);
$s3total_rows = mysqli_fetch_array($s3result)[0];

$sqlcount4="Select count(dept) from mlog where stat='".$stat."'  AND    stdate Between '".$Startdate4."'  and '".$Enddate4."' ";
$sqlresult4 = mysqli_query($con,$sqlcount4);
$sqlcountrows4 = mysqli_fetch_array($sqlresult4)[0];
$s4result = mysqli_query($con,$sqlcount4);
$s4total_rows = mysqli_fetch_array($s4result)[0];

$sqlcount5="Select count(dept) from mlog where stat='".$stat."'  AND    stdate Between '".$Startdate5."'  and '".$Enddate5."'   ";
$sqlresult5 = mysqli_query($con,$sqlcount5);
$sqlcountrows5 = mysqli_fetch_array($sqlresult5)[0];
$s5result = mysqli_query($con,$sqlcount5);
$s5total_rows = mysqli_fetch_array($s5result)[0];

$sqlcount6="Select count(dept) from mlog where stat='".$stat."'  AND    stdate Between '".$Startdate6."'  and '".$Enddate6."'  ";
$sqlresult6 = mysqli_query($con,$sqlcount6);
$sqlcountrows6 = mysqli_fetch_array($sqlresult6)[0];
$s6result = mysqli_query($con,$sqlcount6);
$s6total_rows = mysqli_fetch_array($s6result)[0];

$sqlcount7="Select count(dept) from mlog where stat='".$stat."'  AND    stdate Between '".$Startdate7."'  and '".$Enddate7."'   ";
$sqlresult7 = mysqli_query($con,$sqlcount7);
$sqlcountrows7 = mysqli_fetch_array($sqlresult7)[0];
$s7result = mysqli_query($con,$sqlcount7);
$s7total_rows = mysqli_fetch_array($s7result)[0];

$sqlcount8="Select count(dept) from mlog where stat='".$stat."'  AND    stdate Between '".$Startdate8."'  and '".$Enddate8."'  ";
$sqlresult8 = mysqli_query($con,$sqlcount8);
$sqlcountrows8= mysqli_fetch_array($sqlresult8)[0];
$s8result = mysqli_query($con,$sqlcount8);
$s8total_rows = mysqli_fetch_array($s8result)[0];

$sqlcount9="Select count(dept) from mlog where stat='".$stat."'  AND    stdate Between '".$Startdate9."'  and '".$Enddate9."'  ";
$sqlresult9 = mysqli_query($con,$sqlcount9);
$sqlcountrows9 = mysqli_fetch_array($sqlresult9)[0];
$s9result = mysqli_query($con,$sqlcount9);
$s9total_rows = mysqli_fetch_array($s9result)[0];

$sqlcount10="Select count(dept) from mlog where stat='".$stat."'  AND    stdate Between '".$Startdate10."'  and '".$Enddate10."'   ";
$sqlresult10 = mysqli_query($con,$sqlcount10);
$sqlcountrows10 = mysqli_fetch_array($sqlresult10)[0];
$s10result = mysqli_query($con,$sqlcount10);
$s10total_rows = mysqli_fetch_array($s10result)[0];

$sqlcount11="Select count(dept) from mlog where stat='".$stat."'  AND    stdate Between '".$Startdate11."'  and '".$Enddate11."'  ";
$sqlresult11 = mysqli_query($con,$sqlcount11);
$sqlcountrows11 = mysqli_fetch_array($sqlresult11)[0];
$s11result = mysqli_query($con,$sqlcount11);
$s11total_rows = mysqli_fetch_array($s11result)[0];

$sqlcount12="Select count(dept) from mlog where stat='".$stat."'  AND    stdate Between '".$Startdate12."'  and '".$Enddate12."'   ";
$sqlresult12 = mysqli_query($con,$sqlcount12);
$sqlcountrows12 = mysqli_fetch_array($sqlresult12)[0];
$s12result = mysqli_query($con,$sqlcount12);
$s12total_rows = mysqli_fetch_array($s12result)[0];
 
$sqlcount13="Select count(dept) from mlog where stat='".$stat."'  AND   stdate Between '".$Startdate13."'  and '".$Enddate13."'    ";
$sqlresult13 = mysqli_query($con,$sqlcount13);
$sqlcountrows13 = mysqli_fetch_array($sqlresult13)[0];
$s13result = mysqli_query($con,$sqlcount13);
$s13total_rows = mysqli_fetch_array($s13result)[0];

$sqlcount13a="Select count(dept) from mlog where stat='".$stat."'  AND  stdate Between '".$Startdate13."'  and '".$Enddate13."'    ";
$sqlresult13a = mysqli_query($con,$sqlcount13a);
$sqlcountrows13a = mysqli_fetch_array($sqlresult13a)[0];
$s13aresult = mysqli_query($con,$sqlcount13a);
$s13atotal_rows = mysqli_fetch_array($s13aresult)[0];

?>
<tr>
<td align="left" bgcolor="#bfbfbf"><b>COMPLETED</b></td>
<td align="center" <?php $bgColor; ?> ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate1; ?>&eddate=<?php echo $Enddate1; ?>" target="_blank"><?php echo $s1total_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf"><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate2; ?>&eddate=<?php echo $Enddate2; ?>" target="_blank"><?php echo $s2total_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate3; ?>&eddate=<?php echo $Enddate3; ?>" target="_blank"><?php echo $s3total_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate4; ?>&eddate=<?php echo $Enddate4; ?>" target="_blank"><?php echo $s4total_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate5; ?>&eddate=<?php echo $Enddate5; ?>" target="_blank"><?php echo $s5total_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate6; ?>&eddate=<?php echo $Enddate6; ?>" target="_blank"><?php echo $s6total_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate7; ?>&eddate=<?php echo $Enddate7; ?>" target="_blank"><?php echo $s7total_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate8; ?>&eddate=<?php echo $Enddate8; ?>" target="_blank"><?php echo $s8total_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate9; ?>&eddate=<?php echo $Enddate9; ?>" target="_blank"><?php echo $s9total_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate10; ?>&eddate=<?php echo $Enddate10; ?>" target="_blank"><?php echo $s10total_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate11; ?>&eddate=<?php echo $Enddate11; ?>" target="_blank"><?php echo $s11total_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate12; ?>&eddate=<?php echo $Enddate12; ?>" target="_blank"><?php echo $s12total_rows; ?></a></td>
<td align="center" bgcolor="#44FF33" ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate13; ?>&eddate=<?php echo $Enddate13; ?>" target="_blank"><?php echo $s13total_rows; ?></a></td>
<?php $s13atotal_rows; ?>
</tr>	
<?php } ?>
</tbody>
<?php
require('../db.php');
//include("auth.php"); 
//$submittedby=$_REQUEST['user'];
$submittedby = $_SESSION['username'];
//$recordsss = mysqli_query($con, "SELECT * From users where username='".$dept."' ");  // Use select query here
//								while($row = mysqli_fetch_array($recordsss))
								{
							//		echo $row['dept'];  // displaying data in option menu								
//$dept=$row['dept'];
//$dept='exp';
//$dept='RETURNABLE MATERIAL GATE PASS';
$stat='Pending';
date_default_timezone_set('Asia/Kolkata');
 $Startdate1=date('01-01-Y');
  $Startdate2=date('02-01-Y');
   $Startdate3=date('03-01-Y');
    $Startdate4=date('04-01-Y');
	 $Startdate5=date('05-01-Y');
	  $Startdate6=date('06-01-Y');
	   $Startdate7=date('07-01-Y');
	    $Startdate8=date('08-01-Y');
		 $Startdate9=date('09-01-Y');
		  $Startdate10=date('10-01-Y');
		   $Startdate11=date('11-01-Y');
		    $Startdate12=date('12-01-Y');
			$Startdate13=date('01-01-Y');
			// echo $Startdate1; 
 // echo "<br>"; 
 //$txtEndDate=$_REQUEST['txtEndDate'];
 $Enddate1=date('01-31-Y');
  $Enddate2=date('02-31-Y');
   $Enddate3=date('03-31-Y');
    $Enddate4=date('04-31-Y');
	 $Enddate5=date('05-31-Y');
	  $Enddate6=date('06-31-Y');
	   $Enddate7=date('07-31-Y');
	    $Enddate8=date('08-31-Y');
		 $Enddate9=date('09-31-Y');
		  $Enddate10=date('10-31-Y');
		   $Enddate11=date('11-31-Y');
		    $Enddate12=date('12-31-Y');
			 $Enddate13=date('12-31-Y');
			 
$sqlcount1a="Select count(dept) from mlog where stat='".$stat."'  AND   stdate Between '".$Startdate1."'  and '".$Enddate1."'  ";
$sqlresult1a = mysqli_query($con,$sqlcount1a);
$sqlcountrows1a = mysqli_fetch_array($sqlresult1a)[0];
$s1aresult = mysqli_query($con,$sqlcount1a);
$s1atotal_rows = mysqli_fetch_array($s1aresult)[0];

$sqlcount2a="Select count(dept) from mlog where stat='".$stat."'  AND   stdate Between '".$Startdate2."'  and '".$Enddate2."'  ";
$sqlresult2a = mysqli_query($con,$sqlcount2a);
$sqlcountrows2a = mysqli_fetch_array($sqlresult2a)[0];
$s2aresult = mysqli_query($con,$sqlcount2a);
$s2atotal_rows = mysqli_fetch_array($s2aresult)[0];

$sqlcount3a="Select count(dept) from mlog where stat='".$stat."'  AND   stdate Between '".$Startdate3."'  and '".$Enddate3."' ";
$sqlresult3a = mysqli_query($con,$sqlcount3a);
$sqlcountrows3a = mysqli_fetch_array($sqlresult3a)[0];
$s3aresult = mysqli_query($con,$sqlcount3a);
$s3atotal_rows = mysqli_fetch_array($s3aresult)[0];

$sqlcount4a="Select count(dept) from mlog where stat='".$stat."'  AND   stdate Between '".$Startdate4."'  and '".$Enddate4."' ";
$sqlresult4a = mysqli_query($con,$sqlcount4a);
$sqlcountrows4a = mysqli_fetch_array($sqlresult4a)[0];
$s4aresult = mysqli_query($con,$sqlcount4a);
$s4atotal_rows = mysqli_fetch_array($s4aresult)[0];

$sqlcount5a="Select count(dept) from mlog where stat='".$stat."'  AND   stdate Between '".$Startdate5."'  and '".$Enddate5."'   ";
$sqlresult5a = mysqli_query($con,$sqlcount5a);
$sqlcountrows5a = mysqli_fetch_array($sqlresult5a)[0];
$s5aresult = mysqli_query($con,$sqlcount5a);
$s5atotal_rows = mysqli_fetch_array($s5aresult)[0];

$sqlcount6a="Select count(dept) from mlog where stat='".$stat."'  AND   stdate Between '".$Startdate6."'  and '".$Enddate6."'  ";
$sqlresult6a = mysqli_query($con,$sqlcount6a);
$sqlcountrows6a = mysqli_fetch_array($sqlresult6a)[0];
$s6aresult = mysqli_query($con,$sqlcount6a);
$s6atotal_rows = mysqli_fetch_array($s6aresult)[0];

$sqlcount7a="Select count(dept) from mlog where stat='".$stat."'  AND   stdate Between '".$Startdate7."'  and '".$Enddate7."'   ";
$sqlresult7a = mysqli_query($con,$sqlcount7a);
$sqlcountrows7a = mysqli_fetch_array($sqlresult7a)[0];
$s7aresult = mysqli_query($con,$sqlcount7a);
$s7atotal_rows = mysqli_fetch_array($s7aresult)[0];

$sqlcount8a="Select count(dept) from mlog where stat='".$stat."'  AND   stdate Between '".$Startdate8."'  and '".$Enddate8."'  ";
$sqlresult8a = mysqli_query($con,$sqlcount8a);
$sqlcountrows8a= mysqli_fetch_array($sqlresult8a)[0];
$s8aresult = mysqli_query($con,$sqlcount8a);
$s8atotal_rows = mysqli_fetch_array($s8aresult)[0];

$sqlcount9a="Select count(dept) from mlog where stat='".$stat."'  AND   stdate Between '".$Startdate9."'  and '".$Enddate9."'  ";
$sqlresult9a = mysqli_query($con,$sqlcount9a);
$sqlcountrows9a = mysqli_fetch_array($sqlresult9a)[0];
$s9aresult = mysqli_query($con,$sqlcount9a);
$s9atotal_rows = mysqli_fetch_array($s9aresult)[0];

$sqlcount10a="Select count(dept) from mlog where stat='".$stat."'  AND   stdate Between '".$Startdate10."'  and '".$Enddate10."'   ";
$sqlresult10a = mysqli_query($con,$sqlcount10a);
$sqlcountrows10a = mysqli_fetch_array($sqlresult10a)[0];
$s10aresult = mysqli_query($con,$sqlcount10a);
$s10atotal_rows = mysqli_fetch_array($s10aresult)[0];

$sqlcount11a="Select count(dept) from mlog where stat='".$stat."'  AND  stdate Between '".$Startdate11."'  and '".$Enddate11."'  ";
$sqlresult11a = mysqli_query($con,$sqlcount11a);
$sqlcountrows11a = mysqli_fetch_array($sqlresult11a)[0];
$s11aresult = mysqli_query($con,$sqlcount11a);
$s11atotal_rows = mysqli_fetch_array($s11aresult)[0];

$sqlcount12a="Select count(dept) from mlog where stat='".$stat."'  AND  stdate Between '".$Startdate12."'  and '".$Enddate12."'   ";
$sqlresult12a = mysqli_query($con,$sqlcount12a);
$sqlcountrows12a = mysqli_fetch_array($sqlresult12a)[0];
$s12aresult = mysqli_query($con,$sqlcount12a);
$s12atotal_rows = mysqli_fetch_array($s12aresult)[0];
 
$sqlcount13a="Select count(dept) from mlog where stat='".$stat."'  AND  stdate Between '".$Startdate13."'  and '".$Enddate13."'    ";
$sqlresult13a = mysqli_query($con,$sqlcount13a);
$sqlcountrows13a = mysqli_fetch_array($sqlresult13a)[0];
$s13aresult = mysqli_query($con,$sqlcount13a);
$s13atotal_rows = mysqli_fetch_array($s13aresult)[0];
?>
<tr>
<th style="background-color:#bfbfbf;" ><strong> PENDING </strong></th>
<td align="center" <?php $bgColor; ?> ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate1; ?>&eddate=<?php echo $Enddate1; ?> " target="_blank"><?php echo $s1atotal_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf"><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate2; ?>&eddate=<?php echo $Enddate2; ?>" target="_blank"><?php echo $s2atotal_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate3; ?>&eddate=<?php echo $Enddate3; ?>" target="_blank"><?php echo $s3atotal_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate4; ?>&eddate=<?php echo $Enddate4; ?>" target="_blank"><?php echo $s4atotal_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate5; ?>&eddate=<?php echo $Enddate5; ?>" target="_blank"><?php echo $s5atotal_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate6; ?>&eddate=<?php echo $Enddate6; ?>" target="_blank"><?php echo $s6atotal_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate7; ?>&eddate=<?php echo $Enddate7; ?>" target="_blank"><?php echo $s7atotal_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate8; ?>&eddate=<?php echo $Enddate8; ?>" target="_blank"><?php echo $s8atotal_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate9; ?>&eddate=<?php echo $Enddate9; ?>" target="_blank"><?php echo $s9atotal_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate10; ?>&eddate=<?php echo $Enddate10; ?>" target="_blank"><?php echo $s10atotal_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate11; ?>&eddate=<?php echo $Enddate11; ?>" target="_blank"><?php echo $s11atotal_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate12; ?>&eddate=<?php echo $Enddate12; ?>" target="_blank"><?php echo $s12atotal_rows; ?></a></td>
<td align="center" bgcolor="#44FF33" ><a href="../report/report.php?stat=<?php echo $stat; ?>&stdate=<?php echo $Startdate13; ?>&eddate=<?php echo $Enddate13; ?>" target="_blank"><?php echo $s13atotal_rows; ?></a></td>
</tr>
<?php } ?>
<th colspan=15; style="background-color:#bfbfbf;" ><strong>  </strong></th>
</table>
<p><br><br><br><br><br><br><br><br><br><br><br></p>
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