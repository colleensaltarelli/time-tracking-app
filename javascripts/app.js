//User signup and login

function watchSignUp() {
	$('#signup-form').submit( event => {
		event.preventDefault();
		const newUser={
			firstName: $('#signup-firstname').val(),
			lastName: $('#signup-lastname').val(),
			email: $('#signup-email').val(),
			password: $('#signup-password').val()
		}
		let emailSignUp = $('#signup-email');
		localStorage.setItem("email", emailSignUp.val());
		$.ajax({
			method: "POST",
			url: '/api/users/signup',
			data: JSON.stringify(newUser),
			contentType: "application/json; charset=utf-8",
			dataType : "json",
			success: function(data) {
				localStorage.setItem('userId', data._id);
				loginAfterUserCreated();
			},
			error: function(data) {
				console.log("Error: API could not create a new user.");
				alert(data.responseJSON.location + " error: " + data.responseJSON.message);
			}
		});

	})
}

function renderNewUserLogin() {
	return `{
		"email": "${$('#signup-email').val()}",
		"password": "${$('#signup-password').val()}"
	}`;
}

function loginAfterUserCreated() {
	$.ajax({
			method: "POST",
			url: '/api/auth/login/',
			data: renderNewUserLogin(),
			contentType: "application/json; charset=utf-8",
			dataType : "json",
			success: function(data) {
				localStorage.setItem('authToken', data.authToken);	
				window.location.replace('/app/timesheet')
			},
			error: function(xhr, status, error) {
					  alert('Something went wrong');
			}
		});
	}

function watchLogIn() {
	$('#login-form').submit( event => {
		event.preventDefault();
		const user={
			email: $('#login-email').val(),
			password: $('#login-password').val()
		}
		$.ajax({
			method: "POST",
			url: '/api/auth/login',
			data: JSON.stringify(user),
			contentType: "application/json; charset=utf-8",
			dataType : "json",
			success: function(data) {
				// set the token in local storage
				localStorage.setItem("authToken", data.authToken);
				// redirect user to /timesheet
				window.location.replace('/app/timesheet')
			},
			error: function() {
				  //alert(err.Message);
				  // need 
			}
		});

	})
}

function watchLogOut() {
  //clicking log out icon will remove user authentication token
  //and load login page
  $('#log-out-button').on('click', event => {
	event.preventDefault();
	console.log('click log out button');
	const authToken=localStorage.getItem("authToken"); 
	$.ajax({
		url: '/api/users/logout',
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		beforeSend: function(xhr) { 
            xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);            
		},
		success: function() {
			localStorage.removeItem("authToken");
			window.location.replace('/login')
		},
		error: function() {
			  //alert(err.Message);
			  // need 
		}
	});
  })
}

function watchAppSubmit() {
	watchSignUp();
	watchLogIn();
	watchLogOut();
}

$(watchAppSubmit);