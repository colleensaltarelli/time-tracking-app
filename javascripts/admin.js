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

function watchAdminSubmit() {
	watchAdmin();
}

$(watchAdminSubmit);