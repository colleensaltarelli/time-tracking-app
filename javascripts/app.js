console.log("I AM LOADED!");

//handle login
function watchLogIn() {
    //on-click event handler, if login is valid, set email value to email
}

function renderLoginInfo() {
    //return the value of email and password set to email and password
}

function sendLogIn() {
    //ajax post request to /api/auth/login/ with value of renderLoginInfo
}

//handle signup
function watchSignUp() {    
    //on-click event handler, if sign up is valid, createNewUser
}

function renderNewUser() {
    //return the value of email, password, firstName and lastName and set values
}

function createNewUser() {
    //ajax post request to /api/users/ with value of renderNewUser
}

function renderNewUserLogin() {
    //return the value of email and password set to email and password
}

function loginAfterUserCreated() {
    //ajax post request to /api/users/login with value of renderNewUserLogin
}

function watchSignUpSubmit() {
    //vailidate sign up info
}

function watchLogInSubmit() {
    //vailidate login info
}

function handleLogin() {
	watchSignUp();
	watchLogIn();
	watchLogInSubmit();
	watchSignUpSubmit();
}

$(handleLogin);