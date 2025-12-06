<?php
require('../db.php');
require("../cheader.php");
$status = "";
$id=$sessionId;
$query = "DELETE FROM wlog WHERE id=$id"; 
$result = mysqli_query($con,$query) or die ( mysqli_error());
$status = "Deleted Successfully.</br></br>";
//header("refresh:2;url=browse.php"); 
?>
<div style='overflow: auto;'> 
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        *********************************************************************************************************************************************************** -->
    <!--main content start-->
    <section id="main-content">
      <section class="wrapper" align="center">
        <h1><a align="center"> </a></h1>
        <div class="row mt">
          <div class="col-lg-12">
            <div class="content-panel">
              <section id="unseen">
</center>
<p><br><br><br><br><br><br><br><br></p>
<?php echo $status ?>
<p><br><br><br><br><br><br><br><br></p>
<p><br><br><br><br><br><br><br><br></p>
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
