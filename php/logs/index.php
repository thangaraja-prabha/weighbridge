<?php
//require("../db.php");
//include("../auth.php");
require("../db.php");
//include("../auth.php");
require("../cheader.php");
?>
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        *********************************************************************************************************************************************************** -->
    <!--main content start-->
    <section id="main-content">
      <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Portal Login Logout History</h3>
        <div class="row mt">
          <div class="col-lg-12">
            <div class="content-panel">
              <h4><i class="fa fa-angle-right"></i> User Logs </h4>
              <section id="unseen">
<center>
<div style='overflow: auto;'>
<table class="table table-bordered table-striped table-condensed">
<thead bgcolor="#bfbfbf">
<tr>
<tr><td colspan=5; align="center"> <strong>USER LOGS</strong></td></tr>
<th><strong>S.No</strong></th>
<th><strong>User</strong></th>
<th><strong>Login</strong></th>
<th><strong>Logout</strong></th>
</tr>
</thead>
<tbody>
<?php
$count=1;
$submittedby =$_SESSION['username'];
$sel_query="Select * from userlog where username='".$submittedby."' ORDER BY id DESC";
$result = mysqli_query($con,$sel_query);
        if (isset($_GET['pageno'])) {
            $pageno = $_GET['pageno'];
        } else {
            $pageno = 1;
        }
        $no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;

        $total_pages_sql = "SELECT COUNT(*) FROM userlog where username='".$submittedby."' ORDER BY id desc";
        $result = mysqli_query($con,$total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);

        $sql = "SELECT * FROM userlog where username='".$submittedby."' ORDER BY id desc LIMIT $offset, $no_of_records_per_page";
        $result = mysqli_query($con,$sql);
		$count=1;
while($row = mysqli_fetch_assoc($result)) { ?>
<tr>
<td align="center"><?php echo $count; ?></td>
<td align="left"><?php echo $row["username"]; ?></td>
<td align="left"><?php echo $row["login_trn"]; ?></td>
<td align="left"><?php echo $row["logout_trn"]; ?></td>
<?php $count++; } ?>
</tbody>
</table>
<br>
</div>
<br>
<div style='overflow: auto;'>
<table>
    <ul class="pagination">
        <td><a href="?pageno=1" class="btn btn-success">First</a></td>
        <td class="<?php if($pageno <= 1){ echo 'disabled'; } ?>">
            <a href="<?php if($pageno <= 1){ echo '#'; } else { echo "?pageno=".($pageno - 1); } ?>" class="btn btn-primary">Prev</a>
        </td>
        <td class="">
            <a href="<?php echo "?pageno=".($pageno); ?>" class="btn btn-warning"><?php echo "$pageno"; ?></a>
        </td>
        <td class="<?php if($pageno >= $total_pages){ echo 'disabled'; } ?>">
            <a href="<?php if($pageno >= $total_pages){ echo '#'; } else { echo "?pageno=".($pageno + 1); } ?>" class="btn btn-primary">Next</a>
        </td>
        <td><a href="?pageno=<?php echo $total_pages; ?>"class="btn btn-success">Last</a></td>
    </ul>
</table>
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
//require("../footer.php");
require("../footer.php");
?>
