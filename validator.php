<?php 

class Validator {

	// Setting up empty array to store errors
	public $errors = [];

	// Inject any errors into error array
	private function setError($variableName, $message) {
		$this->errors['error'] = true;
	    $this->errors['message'] = $message;
	}

	// Convert errors to JSON
	public function getErrors() {
		return json_encode($this->errors);
	}

	// Check for errors
	public function hasErrors() {
	   return (count($this->errors) > 0) ? true : false;
	}

	// Validating name
	public function validateString($variableName, $string, $min = 2, $max = 200) {
		if (strlen($string) < intval($min)) {
			// String is not long enough 
			$this->setError($variableName, ucfirst($variableName) . " must be at least " . $min . " characters in length");
		} else if (strlen($string) > intval($max)) {
			// Sting is too long
			$this->setError($variableName, ucfirst($variableName) . " must no be longer than " . $max . " charatcers in length");
		} else {
			return $string;
		}
	}

	// Validating name
	public function validateEmail($variableName, $email, $min = 7, $max = 200) {
		if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			// Email is not valid
			$this->setError($variableName, "The email supplied does not appear valid");
		} else if (strlen($email) < intval($min)) {
			// String is not long enough 
			$this->setError($variableName, "Email must be at least " . $min . " characters in length");
		} else if (strlen($email) > intval($max)) {
			// Sting is too long
			$this->setError($variableName, "Email must be no longer than " . $max . " charatcers in length");
		} else {
			return $email;
		}
	}
}