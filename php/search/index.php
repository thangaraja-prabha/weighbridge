<?php
require('../db.php');
//include("../auth.php");
?>
<?php
require("../cheader.php");
?>
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        *********************************************************************************************************************************************************** -->
    <!--main content start-->
    <section id="main-content">
      <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Maintenance Logs</h3>
        <div class="row mt">
          <div class="col-lg-12">
            <div class="content-panel">
              <h4><i class="fa fa-angle-right"></i> Search </h4>
              <section id="unseen">
								<form action="../ssearch/" method="post">
<input type="text" name="valueToSearch" placeholder="Search" required>
<input type="submit" name="search" value="SUBMIT">
</form>
								</div>
							</div>
						</div>
</section>
<!-- /content-panel -->
</section>
<!-- /col-lg-4 -->
</section>
</div>
<?php
require("../footer.php");
?>