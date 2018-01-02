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

function showClockHolder() {
	$('#clock-holder').removeClass("hidden");
}

function hideClockHolder() {
	$('#clock-holder').addClass("hidden");
}

function renderTimeEntries(data) {
	return `                    
	<tr>
	<th>clock in</th>
	<th>clock out</th>
	</tr>` + data.reduce((output, entry) => {
		return output + `
			<tr class="timesheet-table-entry">
				<td class="timesheet-time">${formatTime(entry.startTime)}</td> 
				<td class="timesheet-time">${formatTime(entry.endTime)}</td>
			</tr>
		`;
	}, '');
}

function displayTimeEntries(data) {
    $('#timesheet-table').html(renderTimeEntries(data.reverse()));	
}

function renderAdminTimeEntries(data) {
	return `                    
	<tr>
	<th>clock in</th>
	<th>clock out</th>
	</tr>` + 
	data.reduce((output, entry) => {
		return output + `
			<tr class="timesheet-table-entry">
				<td class="timesheet-time"><input class="timesheet-time-field" id="start-time-entry" data-id:${entry._id} type="datetime-local" value="${formatAdminTime(entry.startTime)}"></td> 
				<td class="timesheet-time"><input class="timesheet-time-field" id="end-time-entry" data-id:${entry._id} type="datetime-local" value="${formatAdminTime(entry.endTime)}"></td>
				<td><button id="save-timesheet-button" type="submit" class="btn" data-id:${entry._id} value="Update">update</button></td>
				<td><button id="delete-timesheet-button" type="submit" class="btn" data-id:${entry._id} value="Delete">delete</button></td>
			</tr>
		`;
	}, 
	'');
}

function displayAdminTimeEntries(data) {
    $('#timesheet-table').html(renderAdminTimeEntries(data.reverse()));	
}

function formatTime(time) {
	return moment(time).format("M/D/YYYY hh:mm a");
}

function formatAdminTime(time) {
	return moment(time).format("YYYY-MM-DDThh:mm");
}

function newClockIn() {
    const authToken=localStorage.getItem("authToken");    
	$.ajax({
		method: "POST",
		url: '/api/time/clockin',
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		success: function(data) {
			setDataId(data);

			getEntries(data);
		},
		beforeSend: function(xhr) { 
            xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);            
		},
		error: function(xhr, status, error) {
			console.log('Something went wrong');
			console.log(error);
		}
	});
}

function newClockOut() {
    const authToken=localStorage.getItem("authToken");
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
		beforeSend: function(xhr) { 
            xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);            
		},
		error: function(xhr, status, error) {
			console.log('Something went wrong');
			console.log(error);
		}
	});
}

function watchTimesheet() {
	const authToken=localStorage.getItem("authToken");
	const adminId=localStorage.getItem("adminId");   
	const userId=localStorage.getItem("userId");   
	const requestId=adminId ? adminId : "";	
	$.ajax({
		method: "GET",
		url: `/api/time/${requestId}`,
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		beforeSend: function(xhr) { 
            xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);            
		},
		success: function(data) {
			console.log(data);
			if (data.message === 'admin') {
				console.log('admin');
				getAdminEntries();
			}
			else {
				console.log('user');
				getEntries();
				showClockHolder();				
			}
		},
		error: function(xhr, status, error) {
			console.log('Something went wrong');
			console.log(error);
		}
	});
}

function getEntries() {
	const authToken=localStorage.getItem("authToken");
	$.ajax({
		method: "GET",
		url: `/api/time/entries`,
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		beforeSend: function(xhr) { 
            xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);            
		},
		success: function(data) {
			displayTimeEntries(data);
		},
		error: function(xhr, status, error) {
			console.log('Something went wrong');
			console.log(error);
		}
	});
}

function getAdminEntries() {
	const authToken=localStorage.getItem("authToken");
	const adminId=localStorage.getItem("adminId");   
	const userId=localStorage.getItem("userId");   
	const requestId=adminId ? adminId : userId;	
	$.ajax({
		method: "GET",
		url: `/api/time/entries/${requestId}`,
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		beforeSend: function(xhr) { 
            xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);            
		},
		success: function(data) {
			displayAdminTimeEntries(data);
		},
		error: function(xhr, status, error) {
			console.log('Something went wrong');
			console.log(error);
		}
	});
}

function updateTimeEntries() {
	$('#timesheet-time-entries').on('click', '#save-timesheet-button', event => {
		event.preventDefault();
		console.log('click save button');
		const authToken=localStorage.getItem("authToken"); 
		const adminId=localStorage.getItem("adminId");   
		const timeEntries={
			startTime: $('#start-time-entry').val(),
			endTime: $('#end-time-entry').val(),
		}
		const requestId= adminId ? adminId : '';
		$.ajax({
			method: "PUT",
			url: `/api/time/${requestId}`,
			contentType: "application/json; charset=utf-8",
			dataType : "json",
			data: JSON.stringify(timeEntries),
			beforeSend: function(xhr) { 
				xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
			},
			success: function(data) {
				displayAdminTimeEntries(data);
			},
			error: function(xhr, status, error) {
				console.log('Something went wrong');
				console.log(xhr, status, error);
			}
		});
	});
}

function watchTimeSubmit() {
	watchNewClockIn();
	watchNewClockOut();
	watchTimesheet();
	updateTimeEntries();
}

$(watchTimeSubmit);