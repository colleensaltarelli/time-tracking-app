# clock:in

A time tracking solution, whether it’s from your desktop, smartphone or tablet, it’s never been so easy to track your employees time.

## Screenshots:

Homepage

![alt text](https://raw.githubusercontent.com/colleensaltarellitime-tracking-app/blob/master/images/homepage.png "homepage")

<!-- Results Panel

![alt text](https://raw.githubusercontent.com/colleensaltarelli/mixology.io/master/images/results-panel.png "results panel")

No Results Panel

![alt text](https://raw.githubusercontent.com/colleensaltarelli/mixology.io/master/images/no-results-panel.png "no results panel") -->


## Introduction:

clock:in allows employers to manage their employees clock in and clock out times in one place, on any type of device. Employees each have their own account for which they can log in, edit their account and do the basic functionality of clocking in at the beginning of their shift and clocking out at the end.  Employers can then log into the admin account and either edit an employees account or timesheet.  Timesheets can be edited if an employee forgets to clock out or a time change needs to be made.

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