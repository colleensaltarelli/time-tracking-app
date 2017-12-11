//User account page render edit and delete functionality

function renderAccountInfo(data) {
	return `
	<label for="firstName">First Name</label>
    <input type="text" name="firstName" value=${data.firstName}>

    <label for="lastName">Last Name</label>
    <input type="text" name="lastName" value=${data.lastName}>

    <label for="email">Email</label>
    <input type="text" name="email" value=${data.email}>

	<input id="save-user-info-button" type="submit" class="btn" value="Save">
	<input id="delete-user-info-button" type="submit" class="btn" value="Delete">
	`;
}

function displayAccountInfo(data) {
    $('#edit-user-form').html(renderAccountInfo(data));	
}

// console.log(localStorage.getItem("authToken"));

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
		error: function() {
			//alert(err.Message);
		}
	});
}

function updateAccountInfo() {
	$('#edit-user-form').on('click', '#save-user-info-button', event => {
		event.preventDefault();
		console.log('click save button');
		const authToken=localStorage.getItem("authToken"); 
		const user= $('#edit-user-form').serialize();
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
				displayAccountInfo(data);

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
	updateAccountInfo()
}

$(watchAccountSubmit);