# clock:in

A time tracking solution, whether it’s from your desktop, smartphone or tablet, it’s never been so easy to track your employees time. View the app here: https://desolate-lake-73130.herokuapp.com/


## Introduction:

clock:in allows employers to manage their employees clock in and clock out times in one place, on any type of device. Employees each have their own account for which they can log in, edit their account and do the basic functionality of clocking in at the beginning of their shift and clocking out at the end.  Employers can then log into the admin account and either edit an employees account or timesheet.  Timesheets can be edited if an employee forgets to clock out or a time change needs to be made.

## Screenshots:

Homepage

![homepage](https://raw.githubusercontent.com/colleensaltarelli/time-tracking-app/master/images/homepage.png "homepage")

Signup

![homepage](https://raw.githubusercontent.com/colleensaltarelli/time-tracking-app/master/images/signup.png "Signup")

Login

![homepage](https://raw.githubusercontent.com/colleensaltarelli/time-tracking-app/master/images/login.png "login")

Timesheet

![homepage](https://raw.githubusercontent.com/colleensaltarelli/time-tracking-app/master/images/timeclock.png "timesheet")

Account Info

![account](https://raw.githubusercontent.com/colleensaltarelli/time-tracking-app/master/images/accountinfo.png "account")

Admin Dashboard

![Admin](https://raw.githubusercontent.com/colleensaltarelli/time-tracking-app/master/images/admin.png "Admin")

Admin Timesheet

![admin timesheet](https://raw.githubusercontent.com/colleensaltarelli/time-tracking-app/master/images/admintimesheet.png "admin timesheet")


## Technical: 

clock:in relies on:
Node.js, 
Express, 
Passport.js, 
Mongodb/Mongoose/Mlab, 
Mocha/Chai,
Heroku,
TravisCI,
JavaScript, 
jQuery, 
EJS,
HTML, 
CSS. 

## Authentication:
clock:in utilizes passport.js and JWT to authenticate requests to the server.

## Deployment/Testing:
The Heroku/Travis CI is used for deployment and integration testing. All CRUD endpoints are tested, and the app is deployed upon pushing to the master branch.