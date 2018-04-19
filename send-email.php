<?php

	// Form Variables
	$sender_name = trim($_POST['name']);
	$sender_email = $_POST['email'];
	$sender_message = $_POST['message'];
	
	// Configuration Vaiables
	$receiving_email = 'username@domain.com'; // Replace this with your own email address
	$receiver_name = 'Your Name'; // replace with your name
	$email_subject = 'Email Sent from Hash Studio'; // replace with any default title

	// Require swiftMailer Library
	require_once('classes/swiftMailer/swift_required.php');

	// Create the transport
	$transport = Swift_SmtpTransport::newInstance('smtp.domain.com') // enter SMTP address
	  ->setPort(465) // enter SMTP port
	  ->setEncryption('ssl') // enter encryption mode
	  ->setUsername('username@domain.com') // enter SMTP username
	  ->setPassword('xxxxxx') // enter SMTP password
	  ;

	// Create the Mailer using your created Transport
	$mailer = Swift_Mailer::newInstance($transport);

	// Create a Message
	$message = Swift_Message::newInstance($email_subject)
	  ->setFrom(array($sender_email => $sender_name))
	  ->setTo(array($receiving_email, $receiving_email => $receiver_name))
	  ->setBody($sender_message)
	  ;

	// Send the Message
	$result = $mailer->send($message);

	// Success and Failure Message
	if ($result) {
		echo "Congratulations, We've received your email. We'll be in touch as soon as we possibly can!";
	} else {
		echo "Unfortunately, Something went wrong while sending the message, Please try again!";
	}


?>