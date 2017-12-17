//Admin page render functionality

function renderAdmin(data) {
	return `            <tr class="table-heading-row">
	<th>First Name</th>
	<th>Last Name</th>
	<th>Timesheet</th>
	<th>Account</th>
</tr>` + data.reduce((output, entry) => {
		return output + `
			<tr>
				<td>${entry.firstName}</td>
				<td>${entry.lastName}</td>
				<td><button type="button" data-id="${entry._id}" class="admin-timesheet-edit-button">Edit</button></td>
				<td><button type="button" data-id="${entry._id}" class="admin-account-edit-button">Edit</button></td>
			</tr>	
		`;
	   }, '');
}

function displayAdmin(data) {
	$('#employee-table').html(renderAdmin(data));	
}

function watchAdmin() {
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
			window.location.replace('/login')
			console.log('Something went wrong');
			console.log(error);
 		 }
	});
}

function editUserAccount() {
	$('#employee-table').on('click', '.admin-account-edit-button', event => {
	event.preventDefault();
	const userID= $(event.currentTarget).data('id');
	console.log(userID);
    const authToken=localStorage.getItem("authToken");    
		$.ajax({
			method: "GET",
			url: `/api/users/is-admin`,
			contentType: "application/json; charset=utf-8",
			dataType : "json",
			success: function(data) {
				localStorage.setItem('userID', userID);	
				window.location.replace(`/app/account/`)
			},
			beforeSend: function(xhr) { 
				xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);            
			},
			error: function(xhr, status, error) {
				console.log('Something went wrong');
				console.log(xhr, status, error);
			}
		});
	});
}

function watchAdminSubmit() {
	watchAdmin();
	editUserAccount();
}

$(watchAdminSubmit);