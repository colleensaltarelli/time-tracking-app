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
	}, '');
}

function displayTimeEntries(data) {
    $('#timesheet-table').html(renderTimeEntries(data));	
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
		error: function() {
  			//alert(err.Message);
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
		error: function() {
  			//alert(err.Message);
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
		success: displayTimeEntries,
		beforeSend: function(xhr) { 
            xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);            
		},
		error: function() {
  			//alert(err.Message);
		}
	});
}


function watchTimeSubmit() {
	watchNewClockIn();
	watchNewClockOut();
	getEntries();
}

$(watchTimeSubmit);