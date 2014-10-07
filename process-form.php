<?php 

	/* 
		Database credentials:
		
		database: 'contact-us'
		table: 'leads'
		user: 'root'
		password: 'password'
	*/

	try {
		if (empty($_POST['first-name']) || empty($_POST['last-name'])) {
			// POST vars do not match required fields in fomr - user is probably messing about
			throw new PDOException('Invalid request');
		} else {
			// Including validation class
			include('validator.php');

			// New validator class
			$validator = new Validator();

			// Assigning POST vars to 
			$firstName = $validator->validateString('First Name', trim(ucfirst($_POST['first-name'])));
			$lastName = $validator->validateString('Last Name', trim(ucfirst($_POST['last-name'])));
			$email = $validator->validateEmail('Email', trim($_POST['email']));
			$message = $validator->validateString('Message', trim($_POST['message']), 10, 1000);

			if ($validator->hasErrors()) {
				// Validation has failed, return them
				echo $validator->getErrors();
			} else {
				// Validaiton passed connect to database
				$database = new PDO('mysql:host=localhost; dbname=contact-us; charset=utf8', 'root', 'password');
				$database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

				// Preprepare sql statment
				$statement = "INSERT INTO `leads`
					(`id`, `first_name`, `last_name`, `email`, `message`)
					VALUES (null, ?, ?, ?, ?)";

				// Prepare statement
				$statement = $database->prepare($statement);

				// Execute statement
				if(!$statement->execute(array($firstName, $lastName, $email, $message))) {
					// Throw exception execute method failed
					throw new PDOException('The execute method failed');
				}

				// Return JSON to display thank you message
				echo json_encode(array(
					'error' => false,
					'message' => 'Thank you ' . $firstName . ' for your enquiry has been received, we will be in touch shortly.',
				), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);
			}
		}
	} catch(PDOException $exception) {
		// Return JSon to display error message
		echo json_encode(array(
			'error' => true,
			'message' => $exception->getMessage()
		), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);
	}