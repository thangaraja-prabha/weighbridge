<!DOCTYPE html>
<html>
    <head>
        <center>
            <h2>
                Reports Between Two times
            </h2>
    </head>
    <body>
        <form>
			<input type="time" name="txtStartTime">
			<input type="time" name="txtEndTime">
            <p>
                <input type="submit" name="diff" value="submit">
            </p>
     </form>
	 <?php
  	date_default_timezone_set('Asia/Kolkata');
$trn_date = date("Y-m-d H:i:s");
  echo "<br>";
$t = date("H:i");
$t1 =abs(strtotime($t));  
echo $t1;
    echo "<br>";
echo"$trn_date";
exit;
   $time1 = $_GET['txtStartTime'];
   echo "$time1";
   echo "<br>";

//   exit;
   $time2 = $_GET['txtEndTime']; 
   echo "$time2";
   echo "<br>";
   
   $diff2 = abs(strtotime($time2)- strtotime($time1));
   echo strtotime($time1);
   echo "<br>";
   echo strtotime($time2);
   echo "<br>";
//echo $diff2/60;	
   echo "<br>";
   echo $diff2/60/60; //hours
   echo "<br>";
   echo $diff2/60/60/60; //minutes
    echo "<br>";
   echo $diff2/60/60/60/60; //seconds
   //  exit;
echo "<br>";  
   $hours = floor($diff2/(60*60));
   $minutes = floor(($diff2)/ (60*60*60));
   $seconds = floor(($diff2) *10 / (60*60));
   echo "<br>";
   printf("%d hours, %d minutes, %d seconds\n", $hours, $minutes, $seconds);
echo "<br>";
printf($hours);
echo "<br>";
printf($minutes);
echo "<br>";
printf($seconds);
?>


        </center>
            </body>
        </html>