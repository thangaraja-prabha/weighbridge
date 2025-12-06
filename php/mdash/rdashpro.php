<?php
require('../db.php');
include("../auth.php"); //include auth.php file on all secure pages 
?>
<?php
require("../cheader.php");
?>
<p><br></p><p><br></p>
<center>
<div class="row">
<div class="col-md-12">
<table>
<form action="index.php" method="post">
<tr>
<td>Consolidate Attenance Dashboard Of <b><?php $submittedby=$_REQUEST['user'];
echo strtoupper ($submittedby);
?></b>	For The Year Of <?php date_default_timezone_set('Asia/Kolkata');
$year = date('Y', time()); echo $year; ?></td></tr>		
</form>

  </div>
    </div>
  </p>
<?php 
date_default_timezone_set('Asia/Kolkata');
$year = date('Y', time());
//$year=date('Y',strtotime($year));
$month = date('M', time());
$Startdate=date('Y-m-01 00:00:00',strtotime($month));
$Enddate=date('Y-m-31 23:59:59',strtotime($month));
//echo $Startdate;
//echo "<br>";
//echo $Enddate;
//echo "<br>";
if(isset($_POST['search']))
{
//$submittedby = $_SESSION["username"];
	$year=date('Y', time());
	$submittedby=$_POST['user'];
//	$st=$_POST['Startdate'];
//	$ed=$_POST['Enddate'];
		//date_default_timezone_set('Asia/Kolkata');
// $nowdt = date("Y-M-01 00:00:00");
// echo $nowdt; 
//  echo "<br>"; 
//$txtStartDate=$_REQUEST['txtStartDate'];

// echo $Startdate; 
//  echo "<br>"; 
 //$txtEndDate=$_REQUEST['txtEndDate'];

//	 echo $Enddate;
//  echo "<br>"; 	 
// echo $year; 	
}

//$nowdt = date("Y-M-01 00:00:00");
//echo $nowdt;
// echo $year; 
//  echo $month; 
echo '</table>';

?>
<br>
</center>
<center>
<div style='overflow: auto;'>
<div class="row">
<div class="col-md-12">
<table border="1" style='width:40;float:center;margin-center:15%'>
<thead align="center" bgcolor="#bfbfbf">
<tr>
<th align="center" colspan=14><strong> CONSOLIDATE ATTENANCE REPROT FOR THE YEAR OF  <?php echo $date = date('Y', time()); ?></strong></th>
</tr>
<tr>
<th><strong> ATTENANCE PRODUCT CATEGORYWISE </strong></th>
<?php 
include "../db.php";  // Using database connection file here
$anaytb_query="Select * from months" ;
$aresult = mysqli_query($con,$anaytb_query);
while($row = mysqli_fetch_assoc($aresult)) { ?>
<?php
//$anaytbrows = mysqli_fetch_array($aresult)[0];
//$product=$row["product"];
$month=$row["month"];
//echo "<table border='1' style='width:40;float:center;margin-center:15%'>";
//echo "<tbody>";
//echo "<tr>";
//echo "<thead align='center' bgcolor='#bfbfbf'>";
echo "<td>";
//echo $row["product"];
echo $row["month"];
//echo "|";
echo "</td>";
//echo "</thead>";
//echo "</tr>";
//echo "</tbody>";
//echo "</table>";
?>
<?php } ?>
<?php 
$i_query="Select * from products" ;
$iresult = mysqli_query($con,$i_query);
while($row = mysqli_fetch_assoc($iresult)) { ?>
<?php
//$anaytbrows = mysqli_fetch_array($aresult)[0];
$product=$row["product"];
//echo "<table border='1' style='width:40;float:center;margin-center:15%'>";
//echo "<tbody>";
//echo "<tr>";
//echo "<thead align='center' bgcolor='#bfbfbf'>";
//echo "<td>";
//echo $row["product"];
$row["product"];
//echo "</td>";
//echo "</thead>";
//echo "</tr>";
//echo "</tbody>";
//echo "</table>";
?>
<?php } ?>
</tr>
</thead>
<tbody>
<?php
date_default_timezone_set('Asia/Kolkata');
$date = date('Y-m-d', time());
//$submittedby = $_SESSION["username"];
	$submittedby=$_REQUEST['user'];
//$submittedby = $_SESSION['username'];
//echo "$submittedby";
//$recordss = mysqli_query($con, "SELECT * From users where username='".$submittedby."' ");  // Use select query here
//								while($row = mysqli_fetch_array($recordss))
//								{		
//$submittedby=$row['submittedby'];
//								}
//$type='exp';
//$submittedby='22F6D3D2';
$sel_query="Select * from punch where submittedby='".$submittedby."' GROUP BY product";
$result = mysqli_query($con,$sel_query);
        $no_of_records_per_page = 100;
        $offset = 0 * $no_of_records_per_page;
        $total_pages_sql = "SELECT COUNT(*) FROM punch where submittedby='".$submittedby."' GROUP BY product ";
        $result = mysqli_query($con,$total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);

        $sql = "SELECT * FROM punch where submittedby='".$submittedby."'  GROUP BY product ORDER BY id asc LIMIT $offset, $no_of_records_per_page";
		$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_assoc($result)) { ?>
<?php
date_default_timezone_set('Asia/Kolkata');
$nowdt = date("Y-01-01 00:00:00");
//$txtStartDate=$_REQUEST['txtStartDate'];
 $Startdate1=date('Y-01-01 00:00:00',strtotime($nowdt));
  $Startdate2=date('Y-02-01 00:00:00',strtotime($nowdt));
   $Startdate3=date('Y-03-01 00:00:00',strtotime($nowdt));
    $Startdate4=date('Y-04-01 00:00:00',strtotime($nowdt));
	 $Startdate5=date('Y-05-01 00:00:00',strtotime($nowdt));
	  $Startdate6=date('Y-06-01 00:00:00',strtotime($nowdt));
	   $Startdate7=date('Y-07-01 00:00:00',strtotime($nowdt));
	    $Startdate8=date('Y-08-01 00:00:00',strtotime($nowdt));
		 $Startdate9=date('Y-09-01 00:00:00',strtotime($nowdt));
		  $Startdate10=date('Y-10-01 00:00:00',strtotime($nowdt));
		   $Startdate11=date('Y-11-01 00:00:00',strtotime($nowdt));
		    $Startdate12=date('Y-12-01 00:00:00',strtotime($nowdt));
			$Startdate13=date('Y-01-01 00:00:00',strtotime($nowdt));
// echo $Startdate1; 
 // echo "<br>"; 
 //$txtEndDate=$_REQUEST['txtEndDate'];
 $Enddate1=date('Y-01-31 23:59:59',strtotime($nowdt));
  $Enddate2=date('Y-02-29 23:59:59',strtotime($nowdt));
   $Enddate3=date('Y-03-31 23:59:59',strtotime($nowdt));
    $Enddate4=date('Y-04-31 23:59:59',strtotime($nowdt));
	 $Enddate5=date('Y-05-31 23:59:59',strtotime($nowdt));
	  $Enddate6=date('Y-06-31 23:59:59',strtotime($nowdt));
	   $Enddate7=date('Y-07-31 23:59:59',strtotime($nowdt));
	    $Enddate8=date('Y-08-31 23:59:59',strtotime($nowdt));
		 $Enddate9=date('Y-09-31 23:59:59',strtotime($nowdt));
		  $Enddate10=date('Y-10-31 23:59:59',strtotime($nowdt));
		   $Enddate11=date('Y-11-31 23:59:59',strtotime($nowdt));
		    $Enddate12=date('Y-12-31 23:59:59',strtotime($nowdt));
			 $Enddate13=date('Y-12-31 23:59:59',strtotime($nowdt));
$date = date('Y-m-d', time());
$submittedby=$_REQUEST['user'];
//$submittedby = $_SESSION['username'];
$recordss = mysqli_query($con, "SELECT * From punch where submittedby='".$submittedby."' ");  // Use select query here
								while($data = mysqli_fetch_array($recordss))
								{
						//			echo $data['submittedby'];  // displaying data in option menu
								}
$product=$row["product"];
//$type=$row["type"];
//$submittedby='22F6D3D2';
//$product="Rice";
////$customer="IREPS";
//$cnt="1";
$sqlcount1="Select count(product) from punch where submittedby='".$submittedby."' AND product='".$product."' AND datetime Between '".$Startdate1."'  and '".$Enddate1."'  ";
$sqlresult1 = mysqli_query($con,$sqlcount1);
$sqlcountrows1 = mysqli_fetch_array($sqlresult1)[0];
$s1result = mysqli_query($con,$sqlcount1);
$s1total_rows = mysqli_fetch_array($s1result)[0];

$sqlcount2="Select count(product) from punch where submittedby='".$submittedby."' AND product='".$product."' AND datetime Between '".$Startdate2."'  and '".$Enddate2."'  ";
$sqlresult2 = mysqli_query($con,$sqlcount2);
$sqlcountrows2 = mysqli_fetch_array($sqlresult2)[0];
$s2result = mysqli_query($con,$sqlcount2);
$s2total_rows = mysqli_fetch_array($s2result)[0];

$sqlcount3="Select count(product) from punch where submittedby='".$submittedby."' AND  product='".$product."' AND datetime Between '".$Startdate3."'  and '".$Enddate3."' ";
$sqlresult3 = mysqli_query($con,$sqlcount3);
$sqlcountrows3 = mysqli_fetch_array($sqlresult3)[0];
$s3result = mysqli_query($con,$sqlcount3);
$s3total_rows = mysqli_fetch_array($s3result)[0];

$sqlcount4="Select count(product) from punch where submittedby='".$submittedby."' AND  product='".$product."' AND datetime Between '".$Startdate4."'  and '".$Enddate4."' ";
$sqlresult4 = mysqli_query($con,$sqlcount4);
$sqlcountrows4 = mysqli_fetch_array($sqlresult4)[0];
$s4result = mysqli_query($con,$sqlcount4);
$s4total_rows = mysqli_fetch_array($s4result)[0];

$sqlcount5="Select count(product) from punch where submittedby='".$submittedby."' AND  product='".$product."' AND datetime Between '".$Startdate5."'  and '".$Enddate5."'   ";
$sqlresult5 = mysqli_query($con,$sqlcount5);
$sqlcountrows5 = mysqli_fetch_array($sqlresult5)[0];
$s5result = mysqli_query($con,$sqlcount5);
$s5total_rows = mysqli_fetch_array($s5result)[0];

$sqlcount6="Select count(product) from punch where submittedby='".$submittedby."' AND  product='".$product."' AND datetime Between '".$Startdate6."'  and '".$Enddate6."'  ";
$sqlresult6 = mysqli_query($con,$sqlcount6);
$sqlcountrows6 = mysqli_fetch_array($sqlresult6)[0];
$s6result = mysqli_query($con,$sqlcount6);
$s6total_rows = mysqli_fetch_array($s6result)[0];

$sqlcount7="Select count(product) from punch where submittedby='".$submittedby."' AND  product='".$product."' AND datetime Between '".$Startdate7."'  and '".$Enddate7."'   ";
$sqlresult7 = mysqli_query($con,$sqlcount7);
$sqlcountrows7 = mysqli_fetch_array($sqlresult7)[0];
$s7result = mysqli_query($con,$sqlcount7);
$s7total_rows = mysqli_fetch_array($s7result)[0];

$sqlcount8="Select count(product) from punch where submittedby='".$submittedby."' AND  product='".$product."' AND datetime Between '".$Startdate8."'  and '".$Enddate8."'  ";
$sqlresult8 = mysqli_query($con,$sqlcount8);
$sqlcountrows8= mysqli_fetch_array($sqlresult8)[0];
$s8result = mysqli_query($con,$sqlcount8);
$s8total_rows = mysqli_fetch_array($s8result)[0];

$sqlcount9="Select count(product) from punch where submittedby='".$submittedby."' AND  product='".$product."' AND datetime Between '".$Startdate9."'  and '".$Enddate9."'  ";
$sqlresult9 = mysqli_query($con,$sqlcount9);
$sqlcountrows9 = mysqli_fetch_array($sqlresult9)[0];
$s9result = mysqli_query($con,$sqlcount9);
$s9total_rows = mysqli_fetch_array($s9result)[0];

$sqlcount10="Select count(product) from punch where submittedby='".$submittedby."' AND  product='".$product."' AND datetime Between '".$Startdate10."'  and '".$Enddate10."'   ";
$sqlresult10 = mysqli_query($con,$sqlcount10);
$sqlcountrows10 = mysqli_fetch_array($sqlresult10)[0];
$s10result = mysqli_query($con,$sqlcount10);
$s10total_rows = mysqli_fetch_array($s10result)[0];

$sqlcount11="Select count(product) from punch where submittedby='".$submittedby."' AND  product='".$product."' AND datetime Between '".$Startdate11."'  and '".$Enddate11."'  ";
$sqlresult11 = mysqli_query($con,$sqlcount11);
$sqlcountrows11 = mysqli_fetch_array($sqlresult11)[0];
$s11result = mysqli_query($con,$sqlcount11);
$s11total_rows = mysqli_fetch_array($s11result)[0];

$sqlcount12="Select count(product) from punch where submittedby='".$submittedby."' AND  product='".$product."' AND datetime Between '".$Startdate12."'  and '".$Enddate12."'   ";
$sqlresult12 = mysqli_query($con,$sqlcount12);
$sqlcountrows12 = mysqli_fetch_array($sqlresult12)[0];
$s12result = mysqli_query($con,$sqlcount12);
$s12total_rows = mysqli_fetch_array($s12result)[0];
 
$sqlcount13="Select count(product) from punch where submittedby='".$submittedby."' AND product='".$product."' AND (datetime Between '".$Startdate13."'  and '".$Enddate13."')    ";
$sqlresult13 = mysqli_query($con,$sqlcount13);
$sqlcountrows13 = mysqli_fetch_array($sqlresult13)[0];
$s13result = mysqli_query($con,$sqlcount13);
$s13total_rows = mysqli_fetch_array($s13result)[0];

$sqlcount13a="Select count(product) from punch where submittedby='".$submittedby."' AND datetime Between '".$Startdate13."'  and '".$Enddate13."'    ";
$sqlresult13a = mysqli_query($con,$sqlcount13a);
$sqlcountrows13a = mysqli_fetch_array($sqlresult13a)[0];
$s13aresult = mysqli_query($con,$sqlcount13a);
$s13atotal_rows = mysqli_fetch_array($s13aresult)[0];

?>
<tr>
<td align="left" bgcolor="#bfbfbf"><?php echo $row["product"]; ?></td>
<td align="center" <?php $bgColor; ?> ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate1; ?>&eddate=<?php echo $Enddate1; ?> " target="_blank"><?php echo $s1total_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate2; ?>&eddate=<?php echo $Enddate2; ?>" target="_blank"><?php echo $s2total_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate3; ?>&eddate=<?php echo $Enddate3; ?>" target="_blank"><?php echo $s3total_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate4; ?>&eddate=<?php echo $Enddate4; ?>" target="_blank"><?php echo $s4total_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate5; ?>&eddate=<?php echo $Enddate5; ?>" target="_blank"><?php echo $s5total_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate6; ?>&eddate=<?php echo $Enddate6; ?>" target="_blank"><?php echo $s6total_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate7; ?>&eddate=<?php echo $Enddate7; ?>" target="_blank"><?php echo $s7total_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate8; ?>&eddate=<?php echo $Enddate8; ?>" target="_blank"><?php echo $s8total_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate9; ?>&eddate=<?php echo $Enddate9; ?>" target="_blank"><?php echo $s9total_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate10; ?>&eddate=<?php echo $Enddate10; ?>" target="_blank"><?php echo $s10total_rows; ?></a></td>
<td align="center" <?php $bgColor; ?> ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate11; ?>&eddate=<?php echo $Enddate11; ?>" target="_blank"><?php echo $s11total_rows; ?></a></td>
<td align="center" bgcolor="#bfbfbf" ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate12; ?>&eddate=<?php echo $Enddate12; ?>" target="_blank"><?php echo $s12total_rows; ?></a></td>
<td align="center" bgcolor="#44FF33" ><a href="preport.php?submittedby=<?php echo $row["submittedby"]; ?>&product=<?php echo $row["product"]; ?>&stdate=<?php echo $Startdate13; ?>&eddate=<?php echo $Enddate13; ?>" target="_blank"><?php echo $s13total_rows; ?></a></td>
<?php $s13atotal_rows; ?>
</tr>	
<?php } ?>
</tbody>
<?php
require('../db.php');
//include("auth.php"); 
$submittedby=$_REQUEST['user'];
//$submittedby = $_SESSION['username'];
//$recordsss = mysqli_query($con, "SELECT * From users where username='".$submittedby."' ");  // Use select query here
//								while($row = mysqli_fetch_array($recordsss))
								{
							//		echo $row['submittedby'];  // displaying data in option menu								
//$submittedby=$row['submittedby'];
//$type='exp';

date_default_timezone_set('Asia/Kolkata');
$nowdt = date("Y-01-01 00:00:00");
//$txtStartDate=$_REQUEST['txtStartDate'];
 $Startdate1=date('Y-01-01 00:00:00',strtotime($nowdt));
  $Startdate2=date('Y-02-01 00:00:00',strtotime($nowdt));
   $Startdate3=date('Y-03-01 00:00:00',strtotime($nowdt));
    $Startdate4=date('Y-04-01 00:00:00',strtotime($nowdt));
	 $Startdate5=date('Y-05-01 00:00:00',strtotime($nowdt));
	  $Startdate6=date('Y-06-01 00:00:00',strtotime($nowdt));
	   $Startdate7=date('Y-07-01 00:00:00',strtotime($nowdt));
	    $Startdate8=date('Y-08-01 00:00:00',strtotime($nowdt));
		 $Startdate9=date('Y-09-01 00:00:00',strtotime($nowdt));
		  $Startdate10=date('Y-10-01 00:00:00',strtotime($nowdt));
		   $Startdate11=date('Y-11-01 00:00:00',strtotime($nowdt));
		    $Startdate12=date('Y-12-01 00:00:00',strtotime($nowdt));
			$Startdate13=date('Y-01-01 00:00:00',strtotime($nowdt));
// echo $Startdate1; 
 // echo "<br>"; 
 //$txtEndDate=$_REQUEST['txtEndDate'];
 $Enddate1=date('Y-01-31 23:59:59',strtotime($nowdt));
  $Enddate2=date('Y-02-31 23:59:59',strtotime($nowdt));
   $Enddate3=date('Y-03-31 23:59:59',strtotime($nowdt));
    $Enddate4=date('Y-04-31 23:59:59',strtotime($nowdt));
	 $Enddate5=date('Y-05-31 23:59:59',strtotime($nowdt));
	  $Enddate6=date('Y-06-31 23:59:59',strtotime($nowdt));
	   $Enddate7=date('Y-07-31 23:59:59',strtotime($nowdt));
	    $Enddate8=date('Y-08-31 23:59:59',strtotime($nowdt));
		 $Enddate9=date('Y-09-31 23:59:59',strtotime($nowdt));
		  $Enddate10=date('Y-10-31 23:59:59',strtotime($nowdt));
		   $Enddate11=date('Y-11-31 23:59:59',strtotime($nowdt));
		    $Enddate12=date('Y-12-31 23:59:59',strtotime($nowdt));
			 $Enddate13=date('Y-12-31 23:59:59',strtotime($nowdt));
			 
$sqlcount1a="Select count(product) from punch where submittedby='".$submittedby."' AND  datetime Between '".$Startdate1."'  and '".$Enddate1."'  ";
$sqlresult1a = mysqli_query($con,$sqlcount1a);
$sqlcountrows1a = mysqli_fetch_array($sqlresult1a)[0];
$s1aresult = mysqli_query($con,$sqlcount1a);
$s1atotal_rows = mysqli_fetch_array($s1aresult)[0];

$sqlcount2a="Select count(product) from punch where submittedby='".$submittedby."' AND  datetime Between '".$Startdate2."'  and '".$Enddate2."'  ";
$sqlresult2a = mysqli_query($con,$sqlcount2a);
$sqlcountrows2a = mysqli_fetch_array($sqlresult2a)[0];
$s2aresult = mysqli_query($con,$sqlcount2a);
$s2atotal_rows = mysqli_fetch_array($s2aresult)[0];

$sqlcount3a="Select count(product) from punch where submittedby='".$submittedby."' AND  datetime Between '".$Startdate3."'  and '".$Enddate3."' ";
$sqlresult3a = mysqli_query($con,$sqlcount3a);
$sqlcountrows3a = mysqli_fetch_array($sqlresult3a)[0];
$s3aresult = mysqli_query($con,$sqlcount3a);
$s3atotal_rows = mysqli_fetch_array($s3aresult)[0];

$sqlcount4a="Select count(product) from punch where submittedby='".$submittedby."' AND  datetime Between '".$Startdate4."'  and '".$Enddate4."' ";
$sqlresult4a = mysqli_query($con,$sqlcount4a);
$sqlcountrows4a = mysqli_fetch_array($sqlresult4a)[0];
$s4aresult = mysqli_query($con,$sqlcount4a);
$s4atotal_rows = mysqli_fetch_array($s4aresult)[0];

$sqlcount5a="Select count(product) from punch where submittedby='".$submittedby."' AND  datetime Between '".$Startdate5."'  and '".$Enddate5."'   ";
$sqlresult5a = mysqli_query($con,$sqlcount5a);
$sqlcountrows5a = mysqli_fetch_array($sqlresult5a)[0];
$s5aresult = mysqli_query($con,$sqlcount5a);
$s5atotal_rows = mysqli_fetch_array($s5aresult)[0];

$sqlcount6a="Select count(product) from punch where submittedby='".$submittedby."' AND  datetime Between '".$Startdate6."'  and '".$Enddate6."'  ";
$sqlresult6a = mysqli_query($con,$sqlcount6a);
$sqlcountrows6a = mysqli_fetch_array($sqlresult6a)[0];
$s6aresult = mysqli_query($con,$sqlcount6a);
$s6atotal_rows = mysqli_fetch_array($s6aresult)[0];

$sqlcount7a="Select count(product) from punch where submittedby='".$submittedby."' AND  datetime Between '".$Startdate7."'  and '".$Enddate7."'   ";
$sqlresult7a = mysqli_query($con,$sqlcount7a);
$sqlcountrows7a = mysqli_fetch_array($sqlresult7a)[0];
$s7aresult = mysqli_query($con,$sqlcount7a);
$s7atotal_rows = mysqli_fetch_array($s7aresult)[0];

$sqlcount8a="Select count(product) from punch where submittedby='".$submittedby."' AND  datetime Between '".$Startdate8."'  and '".$Enddate8."'  ";
$sqlresult8a = mysqli_query($con,$sqlcount8a);
$sqlcountrows8a= mysqli_fetch_array($sqlresult8a)[0];
$s8aresult = mysqli_query($con,$sqlcount8a);
$s8atotal_rows = mysqli_fetch_array($s8aresult)[0];

$sqlcount9a="Select count(product) from punch where submittedby='".$submittedby."' AND  datetime Between '".$Startdate9."'  and '".$Enddate9."'  ";
$sqlresult9a = mysqli_query($con,$sqlcount9a);
$sqlcountrows9a = mysqli_fetch_array($sqlresult9a)[0];
$s9aresult = mysqli_query($con,$sqlcount9a);
$s9atotal_rows = mysqli_fetch_array($s9aresult)[0];

$sqlcount10a="Select count(product) from punch where submittedby='".$submittedby."' AND  datetime Between '".$Startdate10."'  and '".$Enddate10."'   ";
$sqlresult10a = mysqli_query($con,$sqlcount10a);
$sqlcountrows10a = mysqli_fetch_array($sqlresult10a)[0];
$s10aresult = mysqli_query($con,$sqlcount10a);
$s10atotal_rows = mysqli_fetch_array($s10aresult)[0];

$sqlcount11a="Select count(product) from punch where submittedby='".$submittedby."' AND datetime Between '".$Startdate11."'  and '".$Enddate11."'  ";
$sqlresult11a = mysqli_query($con,$sqlcount11a);
$sqlcountrows11a = mysqli_fetch_array($sqlresult11a)[0];
$s11aresult = mysqli_query($con,$sqlcount11a);
$s11atotal_rows = mysqli_fetch_array($s11aresult)[0];

$sqlcount12a="Select count(product) from punch where submittedby='".$submittedby."' AND datetime Between '".$Startdate12."'  and '".$Enddate12."'   ";
$sqlresult12a = mysqli_query($con,$sqlcount12a);
$sqlcountrows12a = mysqli_fetch_array($sqlresult12a)[0];
$s12aresult = mysqli_query($con,$sqlcount12a);
$s12atotal_rows = mysqli_fetch_array($s12aresult)[0];
 
$sqlcount13a="Select count(product) from punch where submittedby='".$submittedby."' AND datetime Between '".$Startdate13."'  and '".$Enddate13."'    ";
$sqlresult13a = mysqli_query($con,$sqlcount13a);
$sqlcountrows13a = mysqli_fetch_array($sqlresult13a)[0];
$s13aresult = mysqli_query($con,$sqlcount13a);
$s13atotal_rows = mysqli_fetch_array($s13aresult)[0];
?>
<tr>
<th style="background-color:#bfbfbf;" ><strong> TOTAL COUNTS </strong></th>
<td align="center"; bgcolor="#FFFF00"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate1; ?>&eddate=<?php echo $Enddate1; ?>" target="_blank"><?php echo $s1atotal_rows; ?></a></td>
<td align="center"; bgcolor="#FFFF00"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate2; ?>&eddate=<?php echo $Enddate2; ?>" target="_blank"><?php echo $s2atotal_rows; ?></a></td>
<td align="center"; bgcolor="#FFFF00"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate3; ?>&eddate=<?php echo $Enddate3; ?>" target="_blank"><?php echo $s3atotal_rows; ?></a></td>
<td align="center"; bgcolor="#FFFF00"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate4; ?>&eddate=<?php echo $Enddate4; ?>" target="_blank"><?php echo $s4atotal_rows; ?></a></td>
<td align="center"; bgcolor="#FFFF00"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate5; ?>&eddate=<?php echo $Enddate5; ?>" target="_blank"><?php echo $s5atotal_rows; ?></a></td>
<td align="center"; bgcolor="#FFFF00"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate6; ?>&eddate=<?php echo $Enddate6; ?>" target="_blank"><?php echo $s6atotal_rows; ?></a></td>
<td align="center"; bgcolor="#FFFF00"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate7; ?>&eddate=<?php echo $Enddate7; ?>" target="_blank"><?php echo $s7atotal_rows; ?></a></td>
<td align="center"; bgcolor="#FFFF00"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate8; ?>&eddate=<?php echo $Enddate8; ?>" target="_blank"><?php echo $s8atotal_rows; ?></a></td>
<td align="center"; bgcolor="#FFFF00"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate9; ?>&eddate=<?php echo $Enddate9; ?>" target="_blank"><?php echo $s9atotal_rows; ?></a></td>
<td align="center"; bgcolor="#FFFF00"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate10; ?>&eddate=<?php echo $Enddate10; ?>" target="_blank"><?php echo $s10atotal_rows; ?></a></td>
<td align="center"; bgcolor="#FFFF00"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate11; ?>&eddate=<?php echo $Enddate11; ?>" target="_blank"><?php echo $s11atotal_rows; ?></a></td>
<td align="center"; bgcolor="#FFFF00"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate12; ?>&eddate=<?php echo $Enddate12; ?>" target="_blank"><?php echo $s12atotal_rows; ?></a></td>
<td align="center"; bgcolor="#44FF33"><a href="pmreport.php?submittedby=<?php echo $submittedby; ?>&stdate=<?php echo $Startdate13; ?>&eddate=<?php echo $Enddate13; ?>" target="_blank"><?php echo $s13atotal_rows; ?></a></td>
</tr>
<?php } ?>
</table>
<p><br></p>
</div>
</div>
</div>
</div>
<?php
require("../footer.php");
?>