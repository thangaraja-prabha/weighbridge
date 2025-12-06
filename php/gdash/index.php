<?php
require('../db.php');
//include("../auth.php");
require("../cheader.php");
?>
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        *********************************************************************************************************************************************************** -->
    <!--main content start-->
    <section id="main-content">
      <section class="wrapper">
        <div class="row">
          <div class="col-lg-9 main-chart">
            <div class="border-head">
              <h3>USER VISITS</h3>
            </div>
			<div class="custom-bar-chart">
              <ul class="y-axis">
                <li><span>10</span></li>
                <li><span>8</span></li>
                <li><span>6</span></li>
                <li><span>4</span></li>
                <li><span>2</span></li>
                <li><span>0</span></li>
              </ul>
              <div class="bar">
                <div class="title">JAN</div>
                <div class="value tooltips" data-original-title="8.500" data-toggle="tooltip" data-placement="top">35%</div>
              </div>
            </div>
            </div>
            </div>
            <!--custom chart end-->
        <!-- page end-->
      </section>
    </section>
    <!-- /MAIN CONTENT -->
    <!--main content end-->
<?php
require("../footer.php");
?>