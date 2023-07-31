// Setting up the Express web server

// This line imports the Express framework, which has functions to build web apps in Node.js
/*
    Express: simplifies process of handling HTTP req, defining routes, writing middleware functions
    - define routes for HTTP methods(GET, POST, PUT, DELETE)
    - map URLs to specific route handlers -> easy to handle various client requests
*/
const express = require("express");

// This line imports the CORS (Cross-Origin Resource Sharing) middleware, 
// which enables cross-origin requests between the web server and client.
// Basically in the frontend when u make requests u need this to be able to request from different ports
const cors = require("cors");

// cerates an instance of express
const app = express();

// Specifies the allowed origin for cross-origin requests.
// In this case, requests from http://localhost:3306 are allowed.
var corsOptions = {
  origin: "http://localhost:8081"
};

// sets up your server to allow requests from a specific domain (http://localhost:8801) or 
// any domain depending on the configuration. It helps your server be more flexible and 
// accept requests from different websites, enabling your website to interact with resources on other servers.
app.use(cors(corsOptions));

// in a web app people send requests from the client to the server and get some info back.
// These requests are usually in JSON format, so this line adds a translator to the server so that
// the server can understand and process requests that in JSON format.
// So in "all routes"(for every part of your website where people can send requests) the translator
// will convert that JSON data into form that your server can understand. Then you use this translated
// data to save it to a database, process it, and send some response back.
app.use(express.json());

// say you have website that has a form(name, email, messages). When you submit the form, the data
// is sent to the server(POST) so it can be processed. This line of code below adds a helper so the Server
// knows how to read and understand that data send through the POST method
// Say I have an email field and I enter: shubham@gmail.com
// The data sent to the server is URL-Encoded: 'name=Shubham&email=Shubham%40gmail.com'
// So by using this line it is a helper that parses this URL-Encoded thing so that the server can use it and now
// u can store this in a database
app.use(express.urlencoded({ extended: true }));

// display this message when someone gets to the main page of the website
app.get("/", (req, res) => {
  res.json({ message: "Welcome to svmore test application." });
});

// import a seperate js file which is responsible for defining additional routes for out webserver
// these routes determine what happen when someone visits different URL's on our website.
// this path is relative to the server.js file
require("./server/routes/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
