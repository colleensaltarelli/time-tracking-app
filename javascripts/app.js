function watchNewClockIn() {
	$('#clock-in-time').on('click', event => {
        event.preventDefault();
        const time = $(event.currentTarget).data('time')
		newClockIn(time);
	});
}

function watchNewClockOut() {
	$('#clock-out-time').on('click', event => {
        event.preventDefault();
        const time = $(event.currentTarget).data('time')
		newClockOut(time);
	});
}

function renderTime(data) {
    console.log(data._id)
    $('#clock-out-time').attr('data-id', data._id);
}

function newClockIn(inOrOut) {
	$.ajax({
		method: "POST",
		url: `/api/time/new/${inOrOut}`,
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		success: renderTime,
		beforeSend: function() { 
            //Authorization?
		},
		error: function() {
  			//alert(err.Message);
		}
	});
}

function newClockOut(inOrOut) {
	$.ajax({
		method: "POST",
		url: `/api/time/new/${inOrOut}`,
		contentType: "application/json; charset=utf-8",
		dataType : "json",
		success: renderTime,
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
    watchNewClockIn();
    watchNewClockOut();
}
  
$(watchSubmit);