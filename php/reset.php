<?php
require 'iheader.php';
?>

<!-- About Starts -->
<div class="highlight-info">
<div class="overlay spacer">
<div class="container">
<div class="row text-center  wowload fadeInDownBig">
<p><br><br><br></p>

<?php 
  $result = "";
  if (isset($_GET['i']) && isset($_GET['h'])) {
    // (A) CONNECT TO DATABASE
    require "resetdb.php";
    
    // (B) CHECK IF VALID REQUEST
    $stmt = $pdo->prepare("SELECT * FROM `password_reset` WHERE `id`=?");
    $stmt->execute([$_GET['i']]);
    $request = $stmt->fetch(PDO::FETCH_ASSOC);
    if (is_array($request)) {
      if ($request['reset_hash'] != $_GET['h']) { $result = "INVALID REQUEST"; }
    } else { $result = "INVALID REQUEST"; }

    // (C) CHECK EXPIRED
    if ($result=="") {
      $now = strtotime("now");
      $expire = strtotime($request['reset_time']) + $prvalid;
      if ($now >= $expire) { $result = "REQUEST EXPIRED"; }
    }

    // (D) PROCEED otp RESET
    if ($result=="") {
      // RANDOM otp
      $chars = "0123456789";
      $otp = substr(str_shuffle($chars),0 ,6); // 6 characters
      
      // UPDATE DATABASE
      $stmt = $pdo->prepare("UPDATE `users` SET `otp`=? WHERE `id`=?");
      $stmt->execute([$otp, $_GET['i']]);
      $stmt = $pdo->prepare("DELETE FROM `password_reset` WHERE `id`=?");
      $stmt->execute([$_GET['i']]);
      
      // SHOW RESULTS (UPDATED otp)
      $result = "OTP:  $otp";
    }
  }

  // (E) INVALID REQUEST
  else { $result = "LINK EXPIRED"; }
  
  // (F) OUTPUT RESULTS
  echo "<div>$result</div>";
  ?>
<p><br><br></p>
<p><br><br></p>
<p><br><br></p>
</div>
</body>
	
<p>
<br><br><br><br><br><br><br><br>
</p>
</div>
</div>
</div>
</div>
<?php
require 'footer.php';
?>