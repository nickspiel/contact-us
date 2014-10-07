$(document).ready(function() {

// --------------------------- Contact Form

	$("#contact-form").validate({
		rules: {
			"first-name": {
				required: true,
				minlength: 2,
				maxlength: 200
			},
			"last-name": {
				required: true,
				minlength: 2,
				maxlength: 200
			},
			"email": {
			    required: true,
			    email: true,
			    minlength: 2,
			    maxlength: 200
			},
			"message": {
				required: true,
				minlength: 2,
				maxlength: 200
			}
		},
		messages: {
			"first-name": {
				required: "Please enter your first name",
				minlength: "First name must be at least 2 characters long",
				maxlength: "First name must not be longer than 200 characters",
			},
			"last-name": {
				required: "Please enter your last name",
				minlength: "Last name must be at least 2 characters long",
				maxlength: "Last name must not be longer than 200 characters",
			},
			"email": {
				required: "Please enter your email",
				email: "Email does not appear to be valid",
				minlength: "Email must be at least 2 characters long",
				maxlength: "Email must not be longer than 200 characters",
			},
			"message": {
				required: "Please enter a message",
				minlength: "Message must be at least 2 characters long",
				maxlength: "Message must not be longer than 200 characters",
			}
		},
		submitHandler: function(form) {
			request = $.ajax({
				type: $(form).attr('method'),
				url: $(form).attr('action'),
				data: $(form).serialize(),
				dataType : 'json',
				cache: false
			});
			request.done(function (response) {
				if (!response.error) {
					swal({
						title: "Success!",
						text: response.message,
						type: "success",
						confirmButtonText: "Good news!"
					});
				} else {
					swal({
						title: "Error!",
						text: response.message,
						type: "error",
						confirmButtonText: "Sure, I will try again."
					});
				}
			});
			return false; // Prevent form submission
		}
	});
});