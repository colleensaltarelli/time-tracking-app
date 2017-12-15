//User account page render edit and delete functionality

function renderAccountInfo(data) {
	return `
	<label for="firstName">First Name</label>
    <input type="text" name="firstName" id="account-first-name" value=${data.firstName}>

    <label for="lastName">Last Name</label>
    <input type="text" name="lastName" id="account-last-name" value=${data.lastName}>

    <label for="email">Email</label>
    <input type="text" name="email" id="account-email" value=${data.email}>

	<button id="save-user-info-button" type="submit" class="btn" value="Save">Save</button>
	<button id="delete-user-info-button" type="submit" class="btn" value="Delete">Delete</button>
	`;
}

function displayAccountInfo(data) {
    $('#edit-user-form').html(renderAccountInfo(data));	
}

function getAccountInfo() {
	const authToken=localStorage.getItem("authToken");    
	$.ajax({
		method: "GET",
		url: `/api/users/account`,
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		beforeSend: function(xhr) { 
			xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
		},
		success: function(data) {
			displayAccountInfo(data);

		},
		error: function(xhr, status, error) {
			console.log('Something went wrong');
			console.log(error);
		}
	});
}

function updateAccountInfo() {
	$('#edit-user-form').on('click', '#save-user-info-button', event => {
		event.preventDefault();
		console.log('click save button');
		const authToken=localStorage.getItem("authToken"); 
		const user={
			firstName: $('#account-first-name').val(),
			lastName: $('#account-last-name').val(),
			email: $('#account-email').val()
		}
		console.log(user);
		$.ajax({
			method: "PUT",
			url: `/api/users/`,
			contentType: "application/json; charset=utf-8",
			dataType : "json",
			data: JSON.stringify(user),
			beforeSend: function(xhr) { 
				xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
			},
			success: function(data) {
				getAccountInfo(data);

			},
			error: function(xhr, status, error) {
				console.log('Something went wrong');
				console.log(xhr, status, error);
			}
		});
	});
}

function deleteAccount() {
	$('#edit-user-form').on('click', '#delete-user-info-button', event => {
		event.preventDefault();
		console.log('click delete button');
		const authToken=localStorage.getItem("authToken"); 
		$.ajax({
			method: "DELETE",
			url: `/api/users/`,
			contentType: "application/json; charset=utf-8",
			dataType : "json",
			beforeSend: function(xhr) { 
				xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
			},
			success: function() {
				console.log('user deleted');
				window.location.replace('/login')

			},
			error: function(xhr, status, error) {
				console.log('Something went wrong');
				console.log(error);
			}
		});
	});
}

function watchAccountSubmit() {
	getAccountInfo();
	updateAccountInfo();
	deleteAccount();
}

$(watchAccountSubmit);