# Travel_App
A web application where users can find popular travel destinations. It has a details page showing information about a particular travel destination and its location is shown on an interactive map.
Users can send a callback request to admin by providing their phone number and can also send message to the admin. 
It has a login/register page and only users with admin rights can create, update and delete posts, view callback requests and messages sent by other users.
User password is encrypted using JSON Web Tokens.
When the user logs in, json web token is generated for that user and is stored in cookies.
When a user tries to access the admin page, the server will check whether its json web token is available in cookies sent to server along with the api request.
If its available then user is given access to admin page otherwise the user is redirected to sigin/signup page.
Technologies used: HTML, CSS, Bootstrap, JavaScript, Node.js, ExpressJS, MongoDB, Mongoose, bcrypt, jsonwebtoken, ejs.
