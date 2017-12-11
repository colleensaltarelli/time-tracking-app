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
			beforeSend: function() { 
				//Authorization?
			},
			error: function() {
				  //alert(err.Message);
				  // need 
			}
		});

	})
}

//Admin page render functionality

function renderAdmin(data) {
	return data.reduce((output, entry) => {
		return output + `
			<tr>
				<td>${entry.firstName}</td>
				<td>${entry.lastName}</td>
				<td><button type="button" class="admin-timesheet-edit-button">Edit</button></td>
				<td><button type="button" class="admin-account-edit-button">Edit</button></td>
			</tr>	
		`;
	   }, '');
}

function displayAdmin(data) {
	$('#employee-table').html(renderAdmin(data));	
	console.log('display data', data)
}

function getEmployees() {
	const authToken=localStorage.getItem("authToken");    
	$.ajax({
		method: "GET",
		url: `/api/users/all-users`,
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		success: displayAdmin,
		beforeSend: function(xhr) { 
            xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);            
		},
		error: function(xhr, status, error) {
			// console.log('Something went wrong');
			// console.log(xhr);
 		 }
	});
}

function watchAppSubmit() {
	watchSignUp();
	watchLogIn();
	getEmployees();
}

$(watchAppSubmit);