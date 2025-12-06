<?php
require('db.php');
require('auth.php');
//$log='';
$log = $_SESSION['username'];

$to = 'activityanalysisapplication@gmail.com';
$subject = 'Valspar User ACCESS Notification';
$from = 'activityanalysisapplication@gmail.com';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 
// Create email headers
$headers .= 'From: '.$from."\r\n".
    'Reply-To: '.$from."\r\n" .
    'X-Mailer: PHP/' . phpversion();
 
// Compose a simple HTML email message
date_default_timezone_set("Asia/Kolkata");
 $message = '';
 $message .= '<html><body>';
 $message .= '<p style="color:#f40;font-size:18px;">Hi !!!</p>';
 $message .= '<p style="color:#f40;font-size:18px;">Mr/Mrs '.$log.' </p>';
 $message .= '<p style="color:#080;font-size:16px;">Access Notification !!!</p>';
 $message .= '<p style="color:#080;font-size:16px;">It is for your information !!!</p>';
 $message .= '<p style="color:#f40;font-size:18px;">Regards</p>';
 $message .= '<p style="color:#080;font-size:18px;">Customer Care</p>';
 $message .= '<p style="color:#f40;font-size:18px;">System generated mail !!!</p>';
 $message .= '</body></html>';

 
// Sending email
if(mail($to, $subject, $message, $headers))

?>