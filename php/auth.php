<?php

// header('Cache-Control: no cache'); //no cache
// session_cache_limiter('private_no_expire'); // works
//session_cache_limiter('public'); // works too

session_start();
if(!isset($_SESSION["username"])){
header("Location: ../");
exit(); }
?>
