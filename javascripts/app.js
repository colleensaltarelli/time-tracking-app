console.log("I AM LOADED!");

function displayClockIn(){
    $('#clock-in-time').click(function(){
       let time = moment().format('YYYY-MM-DDThh:mm:ss');
       $('#clock-in-time-holder').val(time);  
    });
}
    
function displayClockOut(){
    $('#clock-out-time').click(function(){
       let time = moment().format('YYYY-MM-DDThh:mm:ss');
       $('#clock-out-time-holder').val(time);  
    });
}

function watchNewClockIn() {
	$('#clockInOut').off().on('click', '#clock-in-time', event => {
		event.preventDefault();
		if($('#clockInOut').valid()) {
		ccreateNewClockIn();
		}
	});
}

function renderClockIn() {
    let time = moment().format('YYYY-MM-DDThh:mm:ss');
	return `{ 
				"startTime": "${$('#clock-in-time').val(time)}",
				"userRef": "${localStorage.getItem('userId')}"	
			}`
}

function createNewClockIn() {
	$.ajax({
		method: "POST",
		url: '/api/time/new/clockin',
		data: renderClockIn(),
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		success: function() {
            //show new entry in timesheet table
		},
		beforeSend: function() { 
            //Authorization?
		},
		error: function() {
  			//alert(err.Message);
		}
	});
}

function watchNewClockOut() {
	$('#clockInOut').off().on('click', '#clock-out-time', event => {
		event.preventDefault();
		if($('#clockInOut').valid()) {
		ccreateNewClockOut();
		}
	});
}

function renderClockOut() {
    let time = moment().format('YYYY-MM-DDThh:mm:ss');
	return `{ 
				"endTime": "${$('#clock-out-time').val(time)}",
				"userRef": "${localStorage.getItem('userId')}"	
			}`
}

function createNewClockOut() {
	$.ajax({
		method: "POST",
		url: '/api/time/new/clockout',
		data: renderClockIn(),
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		success: function() {
            //show new entry in timesheet table
		},
		beforeSend: function() { 
            //Authorization?
		},
		error: function() {
  			//alert(err.Message);
		}
	});
}

//function to watch for click event and run functions
function watchSubmit() {
    displayClockIn();
    displayClockOut();
    watchNewClockIn();
    watchNewClockOut();
}
  
$(watchSubmit);