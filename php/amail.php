<p><br><br><br><br><br></p>
<?php
        include "../db.php";  // Using database connection file here
 //       include "../auth.php";  // Using database connection file here
//	$submittedby = $_SESSION['username'];


$id = $_REQUEST['id'];
$remarks = $_REQUEST['remarks'];
$type = $_REQUEST['type'];
$rby = $_SESSION["username"];

$sql1=mysqli_query($con,"select * from swmgplog  Where id='". $id ."' ");
	while($res1=mysqli_fetch_assoc($sql1))
	{
		$enumail=$res1['numail'];	
		$remarks=$res1['remarks'];
			$rby=$res1['rby'];
        }	


$enumail = $_REQUEST['numail'];
//$numail = 'Suresh';
	$sql=mysqli_query($con,"select * from users  Where username='". $enumail ."' ");
	while($res=mysqli_fetch_assoc($sql))
	{
	$to=$res['email'];
        }	

// $to = 'trajonline@gmail.com';
$subject = 'Approval Request Notification';
$fmail = 'Admin';
	$sql=mysqli_query($con,"select email from users  Where username='". $fmail ."' ");
	while($res=mysqli_fetch_assoc($sql))
	{
	$from=$res['email'];
        }	
        //$from = 'trajonline@gmail.com';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 
// Create email headers
$headers .= 'From: '.$from."\r\n".
    'Reply-To: '.$to."\r\n" .
    'X-Mailer: PHP/' . phpversion();
 
// Compose a simple HTML email message
date_default_timezone_set("Asia/Kolkata");
 $message = '';
 $message .= '<html><body>';
 $message .= '<p><h2>[EXTERNAL] Gate Pass No # '.$id.' - Submitted For Approval.</h2></p>';
 $message .= '<p style="color:#f40;font-size:18px;"> This mail originated outside the Company.  </p>';
 $message .= '<p style="color:#080;font-size:18px;"> Dear Sir, </p>';
 $message .= '<p style="color:#080;font-size:18px;"> Type: '.$type.' </p>';
 $message .= '<p style="color:#080;font-size:18px;"> Description: '.$remarks.' </p>';
 $message .= '<p style="color:#080;font-size:18px;"> Material Gate PAss No: '.$id.' has been Submitted for Approval. Pls visit Sherwin e-Gate Pass System, log in to the application and do the needful.</p>';
 $message .= '<p style="color:#080;font-size:18px;"> Thank You, </p>';
 $message .= '<p style="color:#080;font-size:18px;"> '.$rby.' </p>';
 $message .= '<p style="color:#080;font-size:18px;"> Regards. </p>';
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