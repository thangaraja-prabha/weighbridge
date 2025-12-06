<?php
require "../db.php";
require "../cheader.php";
?>
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        *********************************************************************************************************************************************************** -->
    <!--main content start-->
    <section id="main-content">
      <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Advanced Form Components</h3>
        <div class="row mt">
          <!--  DATE PICKERS -->
          <div class="col-lg-12">
            <div class="form-panel">
              <form class="form-horizontal  style-form" method="post" action="">
                <div class="form-group">
                  <label class="control-label col-md-3"> Start Date Time </label>
                  <div class="col-md-3 col-xs-6">
                    <input class="form-control form-control-inline input-medium default-date-picker" size="16" type="text" name="stdate" id="stdate"  required value="">
                  </div>
                  <div class="col-md-4">
                    <div class="input-group bootstrap-timepicker">
                      <input type="text" name="stime" id="stime" class="form-control timepicker-24" required value="">
                      <span class="input-group-btn">
                        <button class="btn btn-theme04" type="button"><i class="fa fa-clock-o"></i></button>
                        </span>
                    </div>
                  </div>
                </div>
                 <div class="form-group">
                  <label class="control-label col-md-3"> End Date Time </label>
                  <div class="col-md-3 col-xs-6">
                    <input class="form-control form-control-inline input-medium default-date-picker" size="16" type="text" name="eddate" id="eddate"  required value="">
                  </div>
                  <div class="col-md-4">
                    <div class="input-group bootstrap-timepicker">
                      <input type="text" name="etime" id="etime" class="form-control timepicker-24" required value="">
                      <span class="input-group-btn">
                        <button class="btn btn-theme04" type="button"><i class="fa fa-clock-o"></i></button>
                        </span>
                    </div>
                  </div>
                </div>
				</div>
                <div class="form-group">
                  <div class="col-lg-offset-2 col-lg-10">
                    <button class="btn btn-theme" type="submit">Submit</button>
                  </div>
                </div>
				</form>
<?php
$stdate=$_REQUEST['stdate'];
$stime=$_REQUEST['stime'];
//$S = echo $stdate "." $stime; ;
$a= $stdate ." " .$stime ;
echo $a;
echo "<br>";
$eddate=$_REQUEST['eddate'];
$etime=$_REQUEST['etime'];
//$S = echo $stdate "." $stime; ;
$b= $eddate ." " .$etime ;
echo $b;
//echo $stdate ." " .$stime ;
//echo "<br>";

//$start = strtotime('12-09-2019 12:01:00');
  //    $end = strtotime('13-09-2019 19:16:00');

 //   $diff2 = abs(strtotime($end)- strtotime($start));
//	$a = abs(strtotime($start));
//		$b = abs(strtotime($end));
 //echo $a;
  echo "<br>";
 //echo $b;
   echo "<br>";
//echo $diff2/60/60;
  echo "<br>";
//  echo $diff2/60/60;
 //  exit;
echo "<br>";  
 //  $hours = floor($diff2/(60*60));
//   $minutes = floor(($diff2)*10 / (60*60));
 //  $seconds = floor(($diff2) *100 / (60*60));

 //  printf("%d hours, %d minutes, %d seconds\n", $hours, $minutes, $seconds);


//get Date diff as intervals 
$d1 = new DateTime($a);
$d2 = new DateTime($b);
//$d1 = new DateTime("2019-05-19 01:23:45");
//$d2 = new DateTime("2019-05-18 01:21:4");
$interval = $d1->diff($d2);
echo $diffInSeconds = $interval->s; //45
  echo "<br>";
echo $diffInMinutes = $interval->i; //23
  echo "<br>";
echo $diffInHours   = $interval->h; //8
  echo "<br>";
echo $diffInDays    = $interval->d; //21
  echo "<br>";
echo $diffInMonths  = $interval->m; //4
  echo "<br>";
echo $diffInYears   = $interval->y; //1
  echo "<br>";


//or get Date difference as total difference
$d1 = strtotime("2018-01-10 00:00:00");
$d2 = strtotime("2019-05-18 01:23:45");
$totalSecondsDiff = abs($d1-$d2); //42600225
$totalMinutesDiff = $totalSecondsDiff/60; //710003.75
$totalHoursDiff   = $totalSecondsDiff/60/60;//11833.39
$totalDaysDiff    = $totalSecondsDiff/60/60/24; //493.05
$totalMonthsDiff  = $totalSecondsDiff/60/60/24/30; //16.43
$totalYearsDiff   = $totalSecondsDiff/60/60/24/365; //1.35


//$hours = intval(($end - $start)/3600);
  //    echo $hours.' hours'; //in hours

      //If you want it in minutes, you can divide the difference by 60 instead
 //     $mins = (int)(($end - $start) / 60 );
 //     echo $mins.' minutues'.'<br>';
//	   $sec = (int)(($end - $start) );
 //     echo $sec.' seconds'.'<br>';
	  
?>
            </div>
            <!-- /form-panel -->
          </div>
          <!-- /col-lg-12 -->
        </div>
        </section>
        </section>
		
<?php require "../footer.php"; ?>		