<p><br><br><br><br><br></p>
<?php
        include "db.php";  // Using database connection file here
 //       include "../auth.php";  // Using database connection file here

$enumail = $_SESSION['username'];
$numail = 'Admin';
	$sql=mysqli_query($con,"select email from users  Where username='". $numail ."' ");
	while($res=mysqli_fetch_assoc($sql))
	{
	$to=$res['email'];
        }	

//$to = 'info@swgps.in';
$subject = 'User Login Notification';
//$from = 'info@swgps.in';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 
// Create email headers
$headers .= 'From: '.$to."\r\n".
    'Reply-To: '.$to."\r\n" .
    'X-Mailer: PHP/' . phpversion();
 
// Compose a simple HTML email message
date_default_timezone_set("Asia/Kolkata");
 $message = '';
 $message .= '<html><body>';
 $message .= '<p><h2>[EXTERNAL] Mr/Mrs '.$enumail.' - Logged in right now.</h2></p>';
 $message .= '<p style="color:#f40;font-size:18px;"> This mail originated outside the Company.  </p>';
 $message .= '<p style="color:#080;font-size:18px;"> Hi, </p>';
 $message .= '<p style="color:#080;font-size:18px;"> Mr/Mrs: '.$enumail.' has been logged in to GATE PASS APPLICATION.</p>';
 $message .= '<p style="color:#080;font-size:18px;"> Thank You, </p>';
 $message .= '<p style="color:#080;font-size:18px;"> Regards. </p>';
  $message .= '<p style="color:#080;font-size:18px;"> Admin </p>';
 $message .= '<p style="color:#f40;">Note: This is a system generated mail. </p>';
 $message .= '</body></html>';

// Sending email
if(mail($to, $subject, $message, $headers))
{
 $msg = 'Mail Send Successfully';
  } else {

  $msg = 'Mail not send';
   }

?>