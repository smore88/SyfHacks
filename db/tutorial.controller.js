const Client = require("./serverToDbInteractions.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
// Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Client
    const client = new Client({
        client_name: req.body.client_name,
        service_name: req.body.service_name,
        payment_num: req.body.payment_num,
        card_loc_lat: req.body.card_loc_lat,
        card_loc_long: req.body.card_loc_long,
        phone_loc_lat: req.body.phone_loc_lat,
        phone_loc_long: req.body.phone_loc_long,
        mileage: req.body.mileage
    });

    // Save Client in the database
    Client.create(client, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the applicant."
            });
        else res.send(data);
    });
};

// Retrieve all Applicants from the database (with condition).
// exports.findAll = (req, res) => {
//     const title = req.query.title;
  
//     Applicant.getAll(title, (err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                 err.message || "Some error occurred while retrieving applicants."
//         });
//         else res.send(data);
//     });
// };
  