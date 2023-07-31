// Whenever you make a request from your front end and you want to do some sort of (CRUD Task) with the mySQL
// db connection this will contain the code to interact with the db to perform operations
const sql = require("./db.js");

// Define a constructor for the object that initializes the fields from the Clients table in mySQL
const Client = function(Clients) {
    this.client_name = Clients.client_name;
    this.service_name = Clients.service_name;
    this.payment_num = Clients.payment_num;
    this.card_loc_lat = Clients.card_loc_lat;
    this.card_loc_long = Clients.card_loc_long;
    this.phone_loc_lat = Clients.phone_loc_lat;
    this.phone_loc_long = Clients.phone_loc_long;
    this.mileage = Clients.mileage;
};

// function responsible for creating a new applicant record in the database(newApplicant, result)
Client.create = (newClient, result) => {
    sql.query("INSERT INTO ClientData SET ?", newClient, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created client: ", { id: res.insertId, ...newClient }); 
        result(null, { id: res.insertId, ...newClient });
    });
};

// Applicant.getAll = (first_name, result) => {
//     let query = "SELECT * FROM applicants";
  
//     if(first_name) {
//       query += ` WHERE first_name LIKE '%${first_name}%'`;
//     }
  
//     sql.query(query, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
  
//       console.log("applicants: ", res);
//       result(null, res);
//     });
// };

module.exports = Client;