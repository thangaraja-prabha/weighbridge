<?php
require('db.php');
include("auth.php");

//    session_start();
    $sessionId = $_SESSION['id'] ?? '';
    $sessionRole = $_SESSION['role'] ?? '';
 //   echo "$sessionId $sessionRole";
    if ( !$sessionId && !$sessionRole ) {
        header( "location:login.php" );
        die();
    }

    ob_start();

    $id = $_REQUEST['id'] ?? 'dashboard';
    $action = $_REQUEST['action'] ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>WEIGHBRIDGE</title>


  <!-- Favicons -->
  <link href="../img/favicon.png" rel="icon">
  <link href="../img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Bootstrap core CSS -->
  <link href="../lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!--external css-->
  <link href="../lib/font-awesome/css/font-awesome.css" rel="stylesheet" />
  <link href="../lib/fancybox/jquery.fancybox.css" rel="stylesheet" />
  <!-- Custom styles for this template -->
  <link href="../css/style.css" rel="stylesheet">
  <link href="../css/style-responsive.css" rel="stylesheet">
  <script src="../lib/jquery/jquery.min.js"></script>
 <link rel="stylesheet" type="text/css" href="../lib/bootstrap-timepicker/compiled/timepicker.css" />
<link rel="stylesheet" type="text/css" href="../lib/bootstrap-datepicker/css/datepicker.css" /> 
</head>
<body>
  <section id="container">
    <!-- **********************************************************************************************************************************************************
        TOP BAR CONTENT & NOTIFICATIONS
        *********************************************************************************************************************************************************** -->
    <!--header start-->
    <header class="header black-bg">
      <div class="sidebar-toggle-box">
        <div class="fa fa-bars tooltips" data-placement="right" data-original-title=""></div>
      </div>
      <!--logo start-->
      <a href="" class="logo"><img src="../logo.jpg" class="img-circle" width="40"><b> WES <span> APP </span></b></a>
      <!--logo end-->
    </header>
    <!-- **********************************************************************************************************************************************************
        MAIN SIDEBAR MENU
        *********************************************************************************************************************************************************** -->
    <!--sidebar start-->
    <aside>
      <div id="sidebar" class="nav-collapse ">
        <!-- sidebar menu start-->
        <ul class="sidebar-menu" id="nav-accordion">
          <p class="centered">
          <h5 class="centered">WES</h5>
					<li><a href=""><b><b>Hi <?php echo strtoupper($_SESSION['username']); ?>  !!!</b></b></a></li>

				<!-- For All the users Admin / Administrator -->
				<?php if ('Managers' == $sessionRole) {?>
					<li><a href="../dashboard/"><b>DASHBOARD</b></a></li>
                    <li><a href="../search/"><b>SEARCH</a></b></li>
					<li class="dropdown">
					<a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><b>REPORTS </b><span class="caret"></span></a>
					<ul class="dropdown-menu" role="menu">
					<li><a href="../rdash/"><b>DASHBOARD REPORT</b></a></li>
					<li><a href="../cust/"><b>CUSTOM REPORT</b></a></li>
					<li><a href="../print/"><b>PRINT</b></a></li>
					<li><a href="../status/"><b>STATUS</b></a></li>
					<li><a href="../logs/"><b>LOGS</b></a></li>
					</ul>
					</li>
					<li class="dropdown">
					<a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><b>CONFIG </b><span class="caret"></span></a>
					<ul class="dropdown-menu" role="menu">
                    <li><a href="../registration/">CREATE USER</a></li>
                    <li><a href="../employees/">USERS</a></li>
                    <li><a href="../setting/">SETTING</b></a></li>
					 </ul>
					</li>
					<li><a href="../cpwd/"><b>CHANGE_PWD</b></a></li>
					<li><a href="../logout/"><b>LOGOUT</b></a></li>
				<?php }?>
					<!-- For All the users Engineer -->
				<?php if ('Users' == $sessionRole ) {?>
                    <li><a href="../dashboard/"><b>DASHBOARD</b></a></li>
					 <li><a href="../entry/"><b>ENTRY</b></a></li>
                    <li><a href="../search/"><b>SEARCH</a></b></li>
					<li class="dropdown">
					<a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><b>REPORTS </b><span class="caret"></span></a>
					<ul class="dropdown-menu" role="menu">
					<li><a href="../rdash/"><b>DASHBOARD</b></a></li>
					 <li><a href="../ddash/"><b>DEPARTMENT WISE</b></a></li>
					 <li><a href="../mdash/"><b>MACHINE WISE</b></a></li>
					 <li><a href="../sdash/"><b>SHIFT WISE</b></a></li>
					 <li><a href="../edash/"><b>ATTENDEE WISE</b></a></li>
					 <li><a href="../mcomp/"><b>COMPLETED</b></a></li>
					<li><a href="../mpend/"><b>PENDING</b></a></li>
					<li><a href="../cust/"><b>CUSTOM REPORT</b></a></li>
					<li><a href="../logs/"><b>LOGS</b></a></li>
                    <li><a href="../employees/"><b>USERS</b></a></li>
					</ul>
					</li>
					<li><a href="../cpwd/"><b>CHANGE_PWD</b></a></li>
					<li><a href="../logout/"><b>LOGOUT</b></a></li>
				<?php }?>
					<!-- For All the users Manager -->
				<?php if ('Admin' == $sessionRole) {?>
                    <li><a href="../dashboard/"><b>DASHBOARD</b></a></li>
					<li class="dropdown">
					<a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><b>INTERNAL WEIGHMENT </b><span class="caret"></span></a>
					<ul class="dropdown-menu" role="menu">
                    <li><a href="../weighin/"><b>FIRST WEIGHMENT</b></a></li>
                    <li><a href="../weighout/"><b>SECOND WEIGHMENT</b></a></li>
					</ul>
					</li>
					<li class="dropdown">
					<a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><b>EXTERNAL WEIGHMENT </b><span class="caret"></span></a>
					<ul class="dropdown-menu" role="menu">
                    <li><a href="../weighin/"><b>FIRST WEIGHMENT</b></a></li>
                    <li><a href="../weighout/"><b>SECOND  WEIGHMENT</b></a></li>
                    <li><a href="../sweigh/"><b>SINGLE WEIGHMENT</b></a></li>
					</ul>
					</li>
					<li class="dropdown">
					<a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><b>REPORTS </b><span class="caret"></span></a>
					<ul class="dropdown-menu" role="menu">
					<li><a href="../rdash/"><b>DASHBOARD REPORT</b></a></li>
					 <li><a href="../ddash/"><b>DEPARTMENT WISE</b></a></li>
					 <li><a href="../mdash/"><b>MACHINE WISE</b></a></li>
					 <li><a href="../sdash/"><b>SHIFT WISE</b></a></li>
					 <li><a href="../edash/"><b>ATTENDEE WISE</b></a></li>
					 <li><a href="../mcomp/"><b>COMPLETED</b></a></li>
					<li><a href="../mpend/"><b>PENDING</b></a></li>
					<li><a href="../cust/"><b>CUSTOM REPORT</b></a></li>
					<li><a href="../logs/"><b>LOGS</b></a></li>
                    <li><a href="../employees/"><b>USERS</b></a></li>
					</ul>
					</li>
					<li class="dropdown">
					<a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><b>CREATE </b><span class="caret"></span></a>
					<ul class="dropdown-menu" role="menu">
                    <li><a href="../dept/"><b>DEPARTMENT</b></a></li>
                    <li><a href="../mdetail/"><b>MACHINE DETAIL</b></a></li>
                    <li><a href="../nop/"><b>NATURE OF PROBLEM</b></a></li>
                    <li><a href="../shifts/"><b>SHIFTS</b></a></li>
                    <li><a href="../registration/"><b>USER</b></a></li>
					</ul>
					</li>
                    <li><a href="../search/"><b>SEARCH</a></b></li>
					<li><a href="../cpwd/"><b>CHANGE_PWD</b></a></li>
					<li><a href="../logout/"><b>LOGOUT</b></a></li>
				<?php }?>
				</ul>
        <!-- sidebar menu end-->
      </div>
    </aside>
    <!--sidebar end-->
<!-- #Header Ends -->