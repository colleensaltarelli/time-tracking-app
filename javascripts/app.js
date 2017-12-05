console.log("I AM LOADED!");

function displayClockIn(){
    $('#clock-in-time').click(function(){
       let time = moment().format('YYYY-MM-DDThh:mm:ss');
       $('#clock-in-time-holder').val(time);  
    });
};
    
function displayClockOut(){
    $('#clock-out-time').click(function(){
       let time = moment().format('YYYY-MM-DDThh:mm:ss');
       $('#clock-out-time-holder').val(time);  
    });
};

//function to watch for click event and run functions
function watchSubmit() {
    displayClockIn();
    displayClockOut();
}
  
$(watchSubmit);