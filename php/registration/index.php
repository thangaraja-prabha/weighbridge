<?php
// Include config file
require_once "../db.php";
 
// Define variables and initialize with empty values
$username = $password = $confirm_password = "";
$email_err = $username_err = $password_err = $confirm_password_err = "";

		$status = ""; 
		$empname = "";
		$empdest = "";
		$empcode = "";
		$email = "";
		$mobile = "";
		$dob = "";
		$doj = "";
		$imagetitle = "";
		$type = ""; 
		$rights = ""; 
		
date_default_timezone_set('Asia/Kolkata');
$created_at = date("Y-m-d H:i:s");
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Validate username
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter a username.";
    } else{
        // Prepare a select statement
        $sql = "SELECT id FROM users WHERE username = ?";
        
        if($stmt = mysqli_prepare($con, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = trim($_POST["username"]);
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);
                
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $username_err = "This username is already taken.";
                } else{
                    $username = trim($_POST["username"]);
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
                // Close statement
        mysqli_stmt_close($stmt);
        }

    }
    // Validate email
    if(empty(trim($_POST["email"]))){
        $email_err = "Please enter a email.";
    } else{
        // Prepare a select statement
        $sql = "SELECT id FROM users WHERE email = ?";
        if($stmt = mysqli_prepare($con, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $email);
            
            // Set parameters
            $email = trim($_POST["email"]);
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);
                
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $email_err = "This email is already registered.";
                } else{
                    $email = trim($_POST["email"]);
                }
            } else{
                echo "Oops! Please try again later.";
            }
    }
        // Close statement
        mysqli_stmt_close($stmt);
    }
 
    
    // Validate password
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter a password.";     
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "Password must have atleast 6 characters.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Please confirm password.";     
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = "Password did not match.";
        }
    }
}   
    // Check input errors before inserting in database
    if(empty($email_err) && empty($username_err) && empty($password_err) && empty($confirm_password_err)){
        
        // Prepare an insert statement
        
		$sql = "INSERT INTO users (username, password, rights, type, empname, empdest, empcode, email, mobile) VALUES (?,?,?,?,?,?,?,?,?)";
         
        if($stmt = mysqli_prepare($con, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "sssssssss", $param_username, $param_password, $_POST['rights'], $_POST['type'], $_POST['empname'], $_POST['empdest'], $_POST['empcode'], $_POST['email'], $_POST['mobile']);
            
            // Set parameters
            $param_username = $username;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Redirect to login page
                $status = "Registered Successfully.";
			//	echo '<p style="color:#FF0000;">'.$status.'</p>';
				header( "refresh:3;url=../employees/" );
            } else{
               // echo "Something went wrong. Please try again later.";
				$status= "Something went wrong. Please try again later.";
            }
        }        
        // Close statement
    //    mysqli_stmt_close($stmt);

    // Close connection
    mysqli_close($con);
}
?>
<?php
require('../db.php');
//include("../auth.php");
?>
<?php
require("../cheader.php");
?>
<p><br></p>

<body>
<style type="text/css">
        .wrapper1{ width: 300px; padding: 20px; align: center;}
</style>
<center>
    <div class="wrapper1">
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
 			<p><h3><strong>CREATE USERS</strong></h3></p>
            <div class="form-group <?php echo (!empty($email_err)) ? 'has-error' : ''; ?>">
                <label>Email</label>
                <input type="text" name="email" class="form-control" value="<?php echo $email; ?>">
                <span class="help-block"><?php echo $email_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Username</label>
                <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>    
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password
                <input type="password" name="password" class="form-control" value="<?php echo $password; ?>">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                <label>Confirm Password</label>
                <input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>">
                <span class="help-block"><?php echo $confirm_password_err; ?></span>
            </div>
			<div class="form-group">
                <label>Priviliages</label>
				<select class="form-control" name="rights" required >
					<option disabled selected>-- Select-- </option>
					<?php
						include "../db.php";  // Using database connection file here
						$records = mysqli_query($con, "SELECT rights From urights where not rights='Administrator' AND not rights='Admins' ");  // Use select query here 

						while($data = mysqli_fetch_array($records))
						{
							echo "<option value='". $data['rights'] ."'>" .$data['rights'] ."</option>";  // displaying data in option menu
						}	
					?>  
				</select>
				<?php mysqli_close($con);  // close connection ?>
                <span class="help-block"></span>
            </div>
			<input type="hidden" name="type" class="form-control" value="Maintenance">
            <div class="form-group <?php echo (!empty($status)) ? 'has-error' : ''; ?>">
                <label>Employee Name</label>
                <input type="text" name="empname" class="form-control" value="<?php echo $empname; ?>">
                <span class="help-block"><?php echo $empname; ?></span>
            </div>   
            <div class="form-group <?php echo (!empty($status)) ? 'has-error' : ''; ?>">
                <label>Employee Designation</label>
                <input type="text" name="empdest" class="form-control" value="<?php echo $empdest; ?>">
                <span class="help-block"><?php echo $empdest; ?></span>
            </div>   
            <div class="form-group <?php echo (!empty($status)) ? 'has-error' : ''; ?>">
                <label>Employee Code</label>
                <input type="text" name="empcode" class="form-control" value="<?php echo $empcode; ?>">
                <span class="help-block"><?php echo $empcode; ?></span>
            </div>   
            <div class="form-group <?php echo (!empty($status)) ? 'has-error' : ''; ?>">
                <label>Contact Number</label>
                <input type="text" name="mobile" class="form-control" value="<?php echo $mobile; ?>">
                <span class="help-block"><?php echo $mobile; ?></span>
            </div>   
			<div class="form-group">
                <input type="submit" class="btn btn-primary" value="Submit">
            </div>
        </form>
    </div> 
</center>	
</body>
<p>
<br><br><br><br><br><br><br>
</p>
<?php
require("../footer.php");
?>