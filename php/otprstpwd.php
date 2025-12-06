<?php
include "iheader.php";
?>


<!-- About Starts -->
<div class="highlight-info">
<div class="overlay spacer">
<div class="container">
<div class="row text-center  wowload fadeInDownBig">
    
<?php
// Initialize the session

header('Cache-Control: no cache'); //no cache
session_cache_limiter('private_no_expire'); // works
//session_cache_limiter('public'); // works too

session_start();
 
// Include config file
require "db.php";
// Define variables and initialize with empty values
$username = $otp = "";
$username_err = $otp_err = "";
$rights = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "ENTER USERNAME";
    } else{
        $username = trim($_POST["username"]);
    }
    
    // Check if otp is empty
    if(empty(trim($_POST["otp"]))){
        $otp_err = "ENTER OTP";
    } else{
        $otp = trim($_POST["otp"]);
    }
    
    // Validate credentials
    if(empty($username_err) && empty($otp_err)){
        // Prepare a select statement
        $sql = "SELECT id, username, otp, rights FROM users WHERE username = ? AND otp = ?";
        
        if($stmt = mysqli_prepare($con, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ss", $username, $otp);
            
            // Set parameters
            //$param_username = $username;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);
                
                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $otp, $rights);
                    if(mysqli_stmt_fetch($stmt)){
                 //       if(password_verify($otp, $hashed_password)){
                            // Password is correct, so start a new session
               //             session_start();									
			//			header('location: welcome.html'); 
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;   
                        //    $_SESSION['role'] = $rights;
                   //      $_SESSION['role'] = 'Admins';
				//			$rights= 'Admins';
			//				exit;
							
//          echo $username; echo $otp; echo $rights; echo $id;
			//				echo "<br>";
			//			echo $_SESSION['role']; 
              //              exit;
	//Checking is user existing in the database or not
$recordsss = mysqli_query($con, "SELECT * From users where username ='".$username."' ");  // Use select query here
								while($row = mysqli_fetch_array($recordsss))
								{
							//		echo $row['apikey'];  // displaying data in option menu								
$id=$row['id'];
$username=$row['username'];
$otp=$row['otp'];
$_SESSION['role'] =$row['rights'];

$query = "SELECT * FROM `users` WHERE username='$username' and otp='$otp' and rights='$rights'  ";
		$result = mysqli_query($con,$query) or die(mysqli_error());
		$rows = mysqli_num_rows($result);
//        if($rows==1){
//			$_SESSION['username'] = $username;
//			header("Location: dashboard.php"); // Redirect user to index.php
//			require_once('userloginlog.php');
//        }	
//        if($result->num_rows==1 && $_SESSION['username']=="adminmohan"){
//			header("location:admin.php");
//			require_once('userloginlog.php');
//			}

//		$ssql = "SELECT * FROM users WHERE username='$username' AND rights='$rights'";
//		$stmt1=$con->prepare($ssql);

//		$stmt1->bind_param("ss", $username, $rights);
//		$stmt1->execute();
//		$result = $stmt1->get_result();
//		$row = $result->fetch_assoc();
		
//		session_regenerate_id();
//		$_SESSION['username'] = $row['username'];
//		$_SESSION['role'] = $row['rights'];
//		session_write_close();
								}		
		if($result->num_rows==1 && $_SESSION['role']=="Admin"){
			header("location:dashboard/");
            //require 'db.php';
                $otp=(rand(123456,987654));	
            //    echo "$otp";
                $submittedby = $_SESSION["username"];
                	$query="update users SET otp='$otp' where username='$submittedby'";
                	mysqli_query($con,$query) or die ( mysqli_error());	
//			require_once('userloginlog.php');
                            
		}
		else if($result->num_rows==1 && $_SESSION['role']=="Users") {
			header("location:dashboard/");
            //require 'db.php';
                $otp=(rand(123456,987654));	
            //    echo "$otp";
                $submittedby = $_SESSION["username"];
                	$query="update users SET otp='$otp' where username='$submittedby'";
                	mysqli_query($con,$query) or die ( mysqli_error());	
                            
		}
		else if($result->num_rows==1 && $_SESSION['role']=="Administrators"){
			header("location:dashboard/");
            //require 'db.php';
                $otp=(rand(123456,987654));	
            //    echo "$otp";
                $submittedby = $_SESSION["username"];
                	$query="update users SET otp='$otp' where username='$submittedby'";
                	mysqli_query($con,$query) or die ( mysqli_error());	
		}
		else if($result->num_rows==1 && $_SESSION['role']=="Admins"){
			header("location:dashboard/");
            //require 'db.php';
                $otp=(rand(123456,987654));	
            //    echo "$otp";
                $submittedby = $_SESSION["username"];
                	$query="update users SET otp='$otp' where username='$submittedby'";
                	mysqli_query($con,$query) or die ( mysqli_error());	
		}
		
//							exit;

                           // header('location: welcome.html');
                        } else{
                            // Display an error message if password is not valid
                            $otp_err = "OTP INCORRECT";
                        }
                    }
                } else{
                    // Display an error message if username doesn't exist
                    $username_err = "NO ACCOUNT FOUND";
                }
            } else{
                echo "OOPS! TRY LATER";
            }
//        }
                $otp_err = "OTP INCORRECT";        
        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    // Close connection
    mysqli_close($con);
}
?>
<?php
require('db.php');
//include("secure.php");
?>

	<!-- Header -->

	<header class="header">
		<div class="header_content d-flex flex-row align-items-center justify-content-start">
			
	</header>
<center>
			<!-- Credits -->
		<div class="credits">
			<p><br><div class="section_container">
				<div class="container">
					<div class="row">
						<div class="col">
						</div>
					</div>
				</div>
			</div></p>
		</div>
					</center>
<body>
<style type="text/css">
        .wrapper1{ width: 300px; padding: 20px; }
</style>

<center>
    <div class="wrapper1">
        <h5><strong>CHANGE PASSWORD</strong> </h5>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>USERNAME</label>
                <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>    
            <div class="form-group <?php echo (!empty($otp_err)) ? 'has-error' : ''; ?>">
                <label>OTP</label>
                <input type="text" name="otp" class="form-control">
                <span class="help-block"><?php echo $otp_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Login"> 
            </div>
			</form>
            </div>

</center>
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
</div>


<?php
require "footer.php";
?>