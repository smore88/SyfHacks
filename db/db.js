const mysql = require("mysql2");
// Create a connection to the database

const connection = mysql.createConnection({
  host: "localhost", // Replace with your MySQL container hostname
  port: 3306, // Replace with the exposed port of your MySQL container
  user: "root", // Replace with your MySQL username
  password: "my-secret-pwd", // Replace with your MySQL password
  database: "syfhacks" // Replace with your MySQL database name
});
  

// Open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;