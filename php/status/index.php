<?php
require('../db.php');
include("../auth.php");
?>
<?php
require("../cheader.php");
?>
<p><br><br><br></p>
<center>
<div style='overflow: auto;'>          
<table>
<tr>
					<th>S.No</th>
					<th><strong>Gate Pass</strong></th>
					<th><strong>Vendor</strong></th>
					<th><strong>Type</strong></th>
					<th><strong>Issued Date </strong></th>
					<th><strong>Remarks </strong></th>
					<th><strong>Approval </strong></th>
					<th><strong>Stores </strong></th>
					<th><strong>Security </strong></th>
					<th><strong>Vendor Due </strong></th>
					<th><strong>Stores Ack </strong></th>
					<th><strong>Approver Ack </strong></th>
					<th><strong>Receiver Ack </strong></th>
					<th><strong>Preview </strong></th>
					</tr>
<?php
require('../db.php');

    $query = "SELECT * FROM `swmgplog` where not stat='Completed' ORDER BY id DESC";
	$result = mysqli_query($con,$query);				 		
$count=1;
				while($row = mysqli_fetch_assoc($result))
				{
				?>
                <tr>
				<td><?php echo $count; ?></td>
				<td align="left"><?php echo $row["id"]; ?></td>
				<td align="left"><?php echo $row["cname"]; ?></td>
				<td align="left"><?php echo $row["type"]; ?></td>
				<td align="left"><?php echo $row["stdate"]; ?></td>
				<td align="left"><?php echo $row["remarks"]; ?></td>
				<td align="center" <?php $bg = $row["stat"]; if ($bg == "L1") { $bgColorv1 = ' style="background-color:#FF0000;" '; } else { $bgColorv1 = ' style="background-color:#E9E6E5 ;" ';} echo $bgColorv1; ?> ></td>
				<td align="center" <?php $bg = $row["stat"]; if ($bg == "L2") { $bgColorv1 = ' style="background-color:#FF0000;" '; } else { $bgColorv1 = ' style="background-color:#E9E6E5 ;" ';} echo $bgColorv1; ?> ></td>
				<td align="center" <?php $bg = $row["stat"]; if ($bg == "L3") { $bgColorv1 = ' style="background-color:#FF0000;" '; } else { $bgColorv1 = ' style="background-color:#E9E6E5 ;" ';} echo $bgColorv1; ?> ></td>
				<td align="center" <?php $bg = $row["stat"]; if ($bg == "L4") { $bgColorv1 = ' style="background-color:#FF0000;" '; } else { $bgColorv1 = ' style="background-color:#E9E6E5 ;" ';} echo $bgColorv1; ?> ></td>
				<td align="center" <?php $bg = $row["stat"]; if ($bg == "L5") { $bgColorv1 = ' style="background-color:#FF0000;" '; } else { $bgColorv1 = ' style="background-color:#E9E6E5 ;" ';} echo $bgColorv1; ?> ></td>
				<td align="center" <?php $bg = $row["stat"]; if ($bg == "L6") { $bgColorv1 = ' style="background-color:#FF0000;" '; } else { $bgColorv1 = ' style="background-color:#E9E6E5 ;" ';} echo $bgColorv1; ?> ></td>
				<td align="center" <?php $bg = $row["stat"]; if ($bg == "L7") { $bgColorv1 = ' style="background-color:#FF0000;" '; } else { $bgColorv1 = ' style="background-color:#E9E6E5 ;" ';} echo $bgColorv1; ?> ></td>
				<td align="center" <?php $bg = $row["stat"]; if ($bg == "Completed") { $bgColorv1 = ' style="background-color:#00ff00;" '; } else { $bgColorv1 = ' style="background-color:#FF0000 ;" ';} echo $bgColorv1; ?>><a href=" <?php $po = $row['type']; if ($po == "RETURNABLE MATERIAL GATE PASS") { echo "../reports/rgpass.php"; } else { echo "../reports/nrgpass.php";}  $po ?>?id=<?php echo $row["id"]; ?>" target="_blank"><i class="fa fa-eye"></i></a></td>
</tr>
				<?php $count++; } ?>
</table>
</div>  
</center> 

<p><br><br><br></p>

<?php
require("../footer.php");
?>