<?php ob_start(); 
require "db.php";
require "cheader.php";
?>
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        *********************************************************************************************************************************************************** -->
    <!--main content start-->
    <section id="main-content">
      <section class="wrapper">
        <h1><a align="center">WEIGHT <?php echo '555105' ?> <?php echo "Kg"; ?></a></h1>
        <div class="row mt">
          <div class="col-lg-12">
            <div class="content-panel">
              <section id="unseen">
<center>
<div style='overflow: auto;'>          
<table class="table table-bordered table-striped table-condensed">
<body>
<form name="frmf">
<table>
<tr><td>Device ID</td><td><?php if(isset($_GET['v5'])) { echo $_GET['v5']; }?></td></tr>
<tr><td>Gross (Kg)</td><td><?php if(isset($_GET['v1'])) { echo $_GET['v1']; }?></td></tr>
<tr><td>Net (Kg)</td><td><?php if(isset($_GET['v2'])) { echo $_GET['v2']; }?></td></tr>
<tr><td>Tare (Kg)</td><td><?php echo ($_GET['v2'] - $_GET['v1'] ) ?></td></tr>
<tr><td>Peak (Kg)</td><td><?php if(isset($_GET['v4'])) { echo $_GET['v4']; }?></td></tr>
<tr><td>Status</td><td><?php if(isset($_GET['v3'])) { echo $_GET['v3']; }?></td></tr>
<tr><td>Low</td><td><?php echo '20' ?></td></tr>
<tr><td>High</td><td><?php echo '2220' ?></td></tr>
</table>
</form>
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
<?php $my_var = ob_get_clean(); ?>

<?php
if($my_var){
	$myfile=fopen("index.php","w");
	fwrite($myfile,$my_var);
	fclose($myfile);
	}
?>
			<div id="viewHere"></div>
						<script type="text/javascript">
				$(function() {
					startRefresh();
				});
				function startRefresh() {
					setTimeout(startRefresh,2000);
					$.get('../wb/bw.php', function(data) {
						$('#viewHere').html(data);
					});
				}
			</script>