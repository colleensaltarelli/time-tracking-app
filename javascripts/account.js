//User account page render edit and delete functionality

function renderAccountInfo(data) {
	return `
	<label for="firstName"></label>
    <input type="text" name="firstName" id="account-first-name" value=${data.firstName}>

    <label for="lastName"></label>
    <input type="text"  name="lastName" id="account-last-name" value=${data.lastName}>

    <label for="email"></label>
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
	const adminId=localStorage.getItem("adminId");   
	const userId=localStorage.getItem("userId");   
	const requestId=adminId ? adminId : userId;	
	$.ajax({
		method: "GET",
		url: `/api/users/account/${requestId}`,
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
		const authToken=localStorage.getItem("authToken"); 
		const adminId=localStorage.getItem("adminId");   
		const user={
			firstName: $('#account-first-name').val(),
			lastName: $('#account-last-name').val(),
			email: $('#account-email').val()
		}
		const requestId= adminId ? adminId : '';
		$.ajax({
			method: "PUT",
			url: `/api/users/${requestId}`,
			contentType: "application/json; charset=utf-8",
			dataType : "json",
			data: JSON.stringify(user),
			beforeSend: function(xhr) { 
				xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
			},
			success: function(data) {
				getAccountInfo(data);
				toastr.success('Account Updated');
			},
			error: function(xhr, status, error) {
				console.log('Something went wrong');
				console.log(xhr, status, error);
			}
		});
	});
}

function deleteUserCallback() {
	localStorage.removeItem("authToken");
	localStorage.removeItem("userId");
	localStorage.removeItem("adminId");
	localStorage.removeItem("email");
	window.location.replace('/login')
}

function deleteAdminCallback () {
	localStorage.removeItem("adminId");
	window.location.replace('/app/admin')
}

function deleteAccount() {
	$('#edit-user-form').on('click', '#delete-user-info-button', event => {
		event.preventDefault();
		const adminId=localStorage.getItem("adminId");   
		const authToken=localStorage.getItem("authToken"); 
		const requestId= adminId ? adminId : '';
		$.ajax({
			method: "DELETE",
			url: `/api/users/${requestId}`,
			contentType: "application/json; charset=utf-8",
			dataType : "json",
			beforeSend: function(xhr) { 
				xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
			},
			success: function(data) {
				if (data.message === 'admin') {
					deleteAdminCallback ();
					toastr.success('User Account Deleted');
				}
				else {
					deleteUserCallback();
					toastr.success('Account Deleted');
				}
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