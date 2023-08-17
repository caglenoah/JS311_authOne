This project demonstrates basic authentication and supports the following routes:

GET /hello
no authentication needed, anyone can use this route and get a message back

POST /register
no authentication needed, anyone can use this route and register for our service

POST /login
no authentication needed, send username and password, returns a token
when the username is in the system, and the password hash matches the username
otherwise return a 400

GET /privateHello
requires authentication, and returns a special message that includes your full name
if you are not authenticated, then return a 400

Test in Postman
