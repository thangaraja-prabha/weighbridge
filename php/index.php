<?php
include "iheader.php";
?>
<?php
// Initialize the session

header('Cache-Control: no cache'); //no cache
session_cache_limiter('private_no_expire'); // works
//session_cache_limiter('public'); // works too

session_start();
 
// Include config file
require "db.php";
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
$rights = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "ENTER USERNAME";
    } else{
        $username = trim($_POST["username"]);
    }
    
    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "ENTER PASSWORD";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate credentials
    if(empty($username_err) && empty($password_err)){
        // Prepare a select statement
        $sql = "SELECT id, username, password, rights FROM users WHERE username = ?";
        
        if($stmt = mysqli_prepare($con, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = $username;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);
                
                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password, $rights);
                    if(mysqli_stmt_fetch($stmt)){
                        if(password_verify($password, $hashed_password)){
                            // Password is correct, so start a new session
               //             session_start();									
			//			header('location: welcome.html'); 
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;   
                            $_SESSION['role'] = $rights;
                         
			//				echo "$rights";
			//				exit;
							
			//				echo $username; 

	//Checking is user existing in the database or not
        $query = "SELECT * FROM `users` WHERE username='$username' and rights='$rights'  ";
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
		
		if($result->num_rows==1 && $_SESSION['role']=="Managers"){
			header("location:dashboard/");
			require_once('userloginlog.php');
            require_once('umail.php');
            require_once('aamail.php');
                            
		}
		else if($result->num_rows==1 && $_SESSION['role']=="Users") {
			header("location:dashboard/");
		    require_once('userloginlog.php');
			require_once('umail.php');
            require_once('aamail.php');                                                        
		}
		else if($result->num_rows==1 && $_SESSION['role']=="Admin"){
			header("location:dashboard/");
            require_once('aamail.php');
            //		    require_once('userloginlog.php');
//		    			require_once('umail.php');
		}

                           // header('location: welcome.html');
                        } else{
                            // Display an error message if password is not valid
                            $password_err = "PASSWORD INCORRECT";
                        }
                    }
                } else{
                    // Display an error message if username doesn't exist
                    $username_err = "NO ACCOUNT FOUND";
                }
            } else{
                echo "OOPS! TRY LATER";
            }
        }
        
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
  <!-- **********************************************************************************************************************************************************
      MAIN CONTENT
      *********************************************************************************************************************************************************** -->
  <div id="login-page">
    <div class="container">
      <form class="form-login" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <h2 class="form-login-heading">sign in now</h2>
        <div class="login-wrap">
          <input type="text" name="username" class="form-control" placeholder="User ID" autofocus><?php echo $username_err; ?>
          <br>
          <input type="password" name="password"  class="form-control" placeholder="Password"><?php echo $password_err; ?>
          <label class="checkbox">
            <span class="pull-right">
            <a data-toggle="modal" href=""></a>
            </span>
            </label>
          <button class="btn btn-theme btn-block" type="submit" value="login" ><i class="fa fa-lock"></i> SIGN IN</button>
          <hr>
        </div>
		  
        <!-- modal -->
      </form>
          </div>
        </div>	
		<p><br><br><br></p>  <p><br><br><br></p>
		<p><br><br><br></p>  <p><br><br><br></p>
		<p><br><br><br></p>  <p><br><br><br></p>
  <!-- js placed at the end of the document so the pages load faster -->
  <script src="lib/jquery/jquery.min.js"></script>
  <script src="lib/bootstrap/js/bootstrap.min.js"></script>
  <!--BACKSTRETCH-->
  <!-- You can use an image of whatever size. This script will stretch to fit in any screen size.-->
  <script type="text/javascript" src="lib/jquery.backstretch.min.js"></script>
  <script>
    $.backstretch("img/login-bg.jpg", {
      speed: 500
    });
  </script>
		<?php
require "footer.php";
?>