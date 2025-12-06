<?php
require 'iheader.php';
?>
  <div id="login-page">
    <div class="container">
      <form class="form-login" method="post" target="_self">
        <h2 class="form-login-heading">FORGOT PASSWORD</h2>
               <div class="modal-body">
                <p>ENTER REGISTERED EMAIL ID</p>
                <input type="email" name="email" placeholder="Email" autocomplete="off" class="form-control placeholder-no-fix">
              </div>
              <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-default" type="button"><a href="index.php">Login</button>
                <button class="btn btn-theme" type="submit">Submit</button>
              </div>
			</form>
            </div>
		</div>

    <!-- (B) PROCESS PASSWORD RESET REQUEST -->
    <?php 
    if (isset($_POST['email'])) {
      // (B1) CONNECT TO DATABASE
      require "resetdb.php";

      // (B2) CHECK IF VALID USER
      $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `email`=?");
      $stmt->execute([$_POST['email']]);
      $user = $stmt->fetch(PDO::FETCH_ASSOC);
      $result = is_array($user)
              ? "" 
              : $_POST['email'] . " IS NOT REGISTERED." ;

      // (B3) CHECK PREVIOUS REQUEST (PREVENT SPAM)
      if ($result == "") {
        $stmt = $pdo->prepare("SELECT * FROM `password_reset` WHERE `id`=?");
        $stmt->execute([$user['id']]);
        $request = $stmt->fetch(PDO::FETCH_ASSOC);
        $now = strtotime("now");
        if (is_array($request)) {
          $expire = strtotime($request['reset_time']) + $prvalid;
          if ($now < $expire) { $result = "TRY AFTER SOMETIMES"; }
        }
      }

      // (B4) CHECKS OK - CREATE NEW RESET REQUEST
      if ($result == "") {
        // RANDOM HASH
        $hash = sha1($user['email'] . $now);
        
        // DATABASE ENTRY
        date_default_timezone_set('Asia/Kolkata');
        $stmt = $pdo->prepare("REPLACE INTO `password_reset` VALUES (?,?,?)");
        $stmt->execute([$user['id'], $hash, date("Y-m-d H:i:s")]);
        
        // SEND EMAIL - CHANGE TO YOUR OWN!
        $from = "System Admin <info@5sautomation.in>";
        $subject = "PASSWORD RESET REQUEST";
        $header = implode("\r\n", [
          "From: $from",
          "MIME-Version: 1.0",
          "Content-type: text/html; charset=utf-8"
        ]);
        $link = "http://5sautomation.in/pone/reset.php?i=".$user['id']."&h=".$hash;
         $message = "<a href='$link'>CLICK HERE FOR OTP</a>";
        if (!@mail($user['email'], $subject, $message, $header)) {
          $result = "Failed to send Email!";
        }
      }
      
      // (B5) RESULTS
      if ($result=="") { $result = "OTP SENT TO REGISTERED  EMAIL ID. PLS CHECK SPAM / JUNK FOLDER IF YOUR ARE NOT RECEIVED MAIL."; }
      echo "<div>$result</div>";
    }
    ?>
</div>
</body>
<p>
<br><br><br>
</p>
<p>
<br><br><br><br><br><br><br><br>
</p>
</div>
</div>
</div>

<?php
require 'footer.php';
?>