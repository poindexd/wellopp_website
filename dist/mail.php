<?php
$myemail = "dan@maposaur.com";
$subject = $_POST['subject'];
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$headers = "From:Contact Form <$myemail>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";

if (mail($myemail, $subject, $message, $headers)){
	echo "Your message has been sent successfully!";
} else {
	echo "An error occurred.";	
}
?>