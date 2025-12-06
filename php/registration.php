<?php
require('db.php');
require("iheader.php");
?>

<p><br><br><br></p>

<?php
// Keep your existing logic exactly – NOTHING CHANGED

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username    = $_POST['username'];
    $personName  = $_POST['personName'];
    $email       = $_POST['email'];
    $mobile      = $_POST['mobile'];
    $password    = $_POST['password'];
    $rights      = $_POST['rights'];
    $smsOpt      = $_POST['smsOpt'];

    // Your existing insert logic (unchanged)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO users (username, personName, email, mobile, password, rights, smsOpt)
              VALUES ('$username','$personName','$email','$mobile','$hashedPassword','$rights','$smsOpt')";

    if (mysqli_query($con, $query)) {
        echo "<script>alert('User registered successfully');</script>";
    } else {
        echo "<script>alert('Error while saving');</script>";
    }
}
?>

<body>
<style>
    .wrapper1 {
        width: 420px;
        padding: 20px;
    }
    table.form-table td {
        padding: 10px;
    }
</style>

<center>
<div class="wrapper1">

<form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">

<table class="form-table">

    <tr>
        <td><label for="username" class="form-label">Username</label></td>
        <td><input type="text" class="form-control" id="username" name="username" required></td>
    </tr>

    <tr>
        <td><label for="personName" class="form-label">Person Name</label></td>
        <td><input type="text" class="form-control" id="personName" name="personName" required></td>
    </tr>

    <tr>
        <td><label for="email" class="form-label">Email Address</label></td>
        <td><input type="email" class="form-control" id="email" name="email" required></td>
    </tr>

    <tr>
        <td><label for="mobile" class="form-label">Mobile Number</label></td>
        <td><input type="tel" class="form-control" id="mobile" name="mobile" required></td>
    </tr>

    <tr>
        <td><label for="password" class="form-label">Password</label></td>
        <td><input type="password" class="form-control" id="password" name="password" required></td>
    </tr>

    <tr>
        <td><label class="form-label" for="rights">Privileges</label></td>
        <td>
            <select id="rights" name="rights" class="form-control" required>
                <option value="">Select</option>
                <option value="1">Admin</option>
                <option value="2">Users</option>
            </select>
        </td>
    </tr>

    <tr>
        <td colspan="2">
            <input type="hidden" id="smsOpt" name="smsOpt">
        </td>
    </tr>

    <tr>
        <td colspan="2" align="center">
            <button type="submit" class="btn btn-primary">Register</button>
        </td>
    </tr>

</table>

</form>

</div>
</center>

</body>

<p><br><br><br><br><br><br><br></p>

<?php
require("footer.php");
?>
