<?php
require_once('../userlogoutlog.php');
//session_start();
if(session_destroy()) // Destroying All Sessions
{
header("Location: ../"); // Redirecting To Home Page

}
?>