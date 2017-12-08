//User signup and login

//User timesheet, clock in and clock out functionality

function watchNewClockIn() {
	$('#clock-in-time').on('click', event => {
        event.preventDefault();
		newClockIn();
	});
}

function watchNewClockOut() {
	$('#clock-out-time').on('click', event => {
        event.preventDefault();
		newClockOut();
	});
}

function setDataId(data) {
	$('#clock-in-time').prop('disabled', 'disabled');
	$('#clock-out-time').attr('data-id', data._id);
}

function enableClockIn() {
	$('#clock-in-time').removeAttr("disabled");
}

function renderTimeEntries(data) {
	return data.reduce((output, entry) => {
		return output + `
			<tr class="timesheet-table-entry">
				<td>${entry.startTime}</td> 
				<td>${entry.endTime}</td>
			</tr>
		`;
	});
}

function displayTimeEntries(data) {
    $('#timesheet-table').html(renderTimeEntries(data));	
}

function newClockIn() {
	$.ajax({
		method: "POST",
		url: '/api/time/clockin',
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		success: function(data) {
			setDataId(data);
			getEntries(data);
		},
		beforeSend: function() { 
            //Authorization?
		},
		error: function() {
  			//alert(err.Message);
		}
	});
}

function newClockOut() {
	$.ajax({
		method: "POST",
		url: `/api/time/clockout`,
		data: JSON.stringify({ id: $('#clock-out-time').attr('data-id') }),
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		success: function(data) { 
			getEntries(data);
			enableClockIn(data);
		},
		beforeSend: function() { 
            //Authorization?
		},
		error: function() {
  			//alert(err.Message);
		}
	});
}

function getEntries() {
	$.ajax({
		method: "GET",
		url: `/api/time/entries`,
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		success: displayTimeEntries,
		beforeSend: function() { 
            //Authorization?
		},
		error: function() {
  			//alert(err.Message);
		}
	});
}

//User account page render edit and delete functionality

function renderAccountInfo(data) {
	return `
	<label for="firstName">First Name</label>
    <input type="text" name="firstName" value="${data.firstNAme}">

    <label for="lastName">Last Name</label>
    <input type="text" name="lastName" value="${data.lastNAme}">

    <label for="email">Email</label>
    <input type="text" name="email" value="${data.email}">

	<input id="save-user-info-button" type="submit" class="btn" value="Save">
	<input id="delete-user-info-button" type="submit" class="btn" value="Delete">
	`;
}

function displayAccountInfo(data) {
    $('#edit-user-form').html(renderAccountInfo(data));	
}

function getAccountInfo() {
	$.ajax({
		method: "GET",
		url: `/api/users/:id`,
		data: JSON.stringify({ id: $('#clock-out-time').attr('data-id') }),		
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		success: displayAccountInfo,
		beforeSend: function() { 
            //Authorization?
		},
		error: function() {
  			//alert(err.Message);
		}
	});
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
	});
}

function displayAdmin(data) {
    $('#employee-table').html(renderAdmin(data));	
}

function getEmployees() {
	$.ajax({
		method: "GET",
		url: `/api/users/`,
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		success: displayAdmin,
		beforeSend: function() { 
            //Authorization?
		},
		error: function() {
  			//alert(err.Message);
		}
	});
}

function watchSubmit() {
	watchNewClockIn();
	watchNewClockOut();
	getEntries();
	getEmployees();
	getAccountInfo();
}

$(watchSubmit);