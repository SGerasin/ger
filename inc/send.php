<?php
error_reporting (E_ALL ^ E_NOTICE);
$post = (!empty($_POST)) ? true : false;
if($post) {
	
	$submit = stripslashes($_POST['submit']);
	
	
	switch ($submit) {
	
	case 'subscribe': 
	$to = 'mail@mail.mail';	 // insert your email for subscribe form sending data
	$subject = 'User subscribed via FeastLanding';
	$email = trim($_POST['email']);	
	$message = 'You have an new subscriber with email:<br>'.$email;
	$Reply = $email;
	$from = $email;
	break;
	
	case 'contacts':
	$to = 'mail@mail.mail';	// insert your email for contacts form sending data
	$subject = stripslashes($_POST['name']) ." via FeastLanding";
	$name = stripslashes($_POST['name']);
	$email = trim($_POST['email']);	
	$message = trim($_POST['message']);		
	$message = "<br>$message <br><br>";
	$message.="---<br>Best regards,<br><strong>$name</strong>";		
	$Reply= $email;
	$from= $name;	
	break;	
		
	}
	
	// Let's send the email.
		
	$headers = "from: $from <$Reply>\nReply-To: $Reply \nContent-type: text/html";
	
	$mail = mail($to, $subject, $message, $headers);	

	if($mail) {
		echo $submit;
		}
}
?>