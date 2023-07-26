import React, { Component } from "react";
import ClientDataService from "../services/tutorial.service";
import { calculateDistance } from "../utils";

import NewIphone from "./NewIphone";

import { CardInfoName, CardInfoTextField, StyledCustomerCard, CenteredWrapper, IphoneLayout } from "./StyledComponents";
import { Typography } from "@mui/material";

import { Button } from "@mantine/core";
import zIndex from "@mui/material/styles/zIndex";

import { remove_excess, reverse_geocode } from "./map_utils";



export default class AddApplicant extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeService = this.onChangeService.bind(this);
    this.onChangePayment = this.onChangePayment.bind(this);
    this.onChangeCardLocLat = this.onChangeCardLocLat.bind(this);
    this.onChangeCardLocLong = this.onChangeCardLocLong.bind(this);
    this.onChangePhoneLocLat = this.onChangePhoneLocLat.bind(this);
    this.onChangePhoneLocLong = this.onChangePhoneLocLong.bind(this);
    this.onChangeMileage = this.onChangeMileage.bind(this);


    this.saveApplicant = this.saveApplicant.bind(this);
    this.newApplicant = this.newApplicant.bind(this);

    this.state = {
      id: null,
      client_name: "",
      service_name: "",
      payment_num: "",
      card_loc_lat: "",
      card_loc_long: "",
      phone_loc_lat: null,
      phone_loc_long: null,
      mileage: null,
      submitted: false,
      showNewIphone: false,
      location: ""
    };
  }

  onChangeFirstName(e) {
    this.setState({
      client_name: e.target.value
    });
  }

  onChangeService(e) {
    this.setState({
      service_name: e.target.value
    });
  }

  onChangePayment(e) {
    this.setState({
      payment_num: e.target.value
    })
  }

  onChangeCardLocLat(e) {
    this.setState({
      card_loc_lat: e.target.value
    })
  }

  onChangeCardLocLong(e) {
    this.setState({
      card_loc_long: e.target.value
    })
  }

  onChangePhoneLocLat(e) {
    this.setState({
      phone_loc_lat: e.target.value
    })
  }

  onChangePhoneLocLong(e) {
    this.setState({
      phone_loc_long: e.target.value
    })
  }

  onChangeMileage(e) {
    this.setState({
      mileage: e.target.value
    })
  }


  /////////// SAVE THE APPLICANT TO THE DB ////////////////////
  saveApplicant() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const distance = calculateDistance(
            this.state.card_loc_lat,
            this.state.card_loc_long,
            position.coords.latitude,
            position.coords.longitude
          );

          // Lat: -90 to 90
          // Long: -180 to 180

          const data = {
            client_name: this.state.client_name,
            service_name: this.state.service_name,
            payment_num: this.state.payment_num,
            card_loc_lat: this.state.card_loc_lat,
            card_loc_long: this.state.card_loc_long,
            phone_loc_lat: position.coords.latitude,
            phone_loc_long: position.coords.longitude,
            mileage: distance
          };
          ClientDataService.create(data)
            .then(response => {
              this.setState({
                id: response.data.id,
                client_name: response.data.client_name,
                service_name: response.data.service_name,
                payment_num: response.data.payment_num,
                card_loc_lat: response.data.card_loc_lat,
                card_loc_long: response.data.card_loc_long,
                phone_loc_lat: position.coords.latitude,
                phone_loc_long: position.coords.longitude,
                mileage: distance,
                submitted: true
              });
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  handleButtonClick = () => {
    this.saveApplicant();
    // get harsh function response and set the location as a string and then
    // 2 coords will be card_loc_lat, card_loc_long pass this as inputs to ur functions, save it
    // string str = this.location; something like this to pass ur string that u return to the location state
    
    
    var formloc = "";
    reverse_geocode(this.state.card_loc_lat, this.state.card_loc_long).then((formloc) => {
      this.location = formloc;
    })
    
    const { payment_num } = this.state;
    if (payment_num > 500) {
      this.setState({
        showNewIphone: true,
      });
    } else {
      this.setState({
        showNewIphone: false,
      });
    }

  };

  newApplicant() {
    this.setState({
      id: null,
      client_name: "",
      service_name: "",
      payment_num: "",
      card_loc_lat: "",
      card_loc_long: "",
      submitted: false,
      showNewIphone: false,
      location: ""
    });
  }

  

  /* <IphoneLayout>
            <img src="./phoneCover.png" className="iphone"></img>
            <Button className="yes-no">

            </Button>
          </IphoneLayout> */

  render() {
    const { payment_num, showNewIphone, location } = this.state;
    return (
      // className="submit-form"
      <div>
        <CenteredWrapper>
          {showNewIphone && <NewIphone location={this.location}></NewIphone>}
          <StyledCustomerCard>
            <h4>Customer Payment Info</h4>
            <div className="form-group">
              <label htmlFor="client_name" className="cardFonts">Client Name</label>
              <input
                placeholder="Cardholder Name"
                type="text"
                className="form-control"
                id="client_name"
                required
                value={this.state.client_name}
                onChange={this.onChangeFirstName}
                name="client_name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="service_name" className="cardFonts">Service</label>
              <input
                placeholder="Store"
                type="text"
                className="form-control"
                id="service_name"
                required
                value={this.state.service_name}
                onChange={this.onChangeService}
                name="service_name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="payment_num" className="cardFonts">Payment Amount</label>
              <input
                placeholder="e.g. $160.00"
                type="text"
                className="form-control"
                id="payment_num"
                required
                value={this.state.payment_num}
                onChange={this.onChangePayment}
                name="payment_num"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_loc_lat" className="cardFonts">Card Location</label>
              <div style={{ display: 'flex' }}>
                <input
                  style={{ marginRight: '10px'}}
                  placeholder="40.08"
                  type="text"
                  className="form-control"
                  id="card_loc_lat"
                  required
                  value={this.state.card_loc_lat}
                  onChange={this.onChangeCardLocLat}
                  name="card_loc_lat"
                />
                <input
                  type="text"
                  placeholder="-88.26"
                  className="form-control"
                  id="card_loc_long"
                  required
                  value={this.state.card_loc_long}
                  onChange={this.onChangeCardLocLong}
                  name="card_loc_long"
                />
              </div>
              <Button onClick={this.handleButtonClick} className="btn btn-success">
                Submit
              </Button>
            </div>
          </StyledCustomerCard>
        </CenteredWrapper>
        {/* )} */}
      </div>
    );
  }
}

/*

<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inconsolata&family=Open+Sans:wght@300&display=swap" rel="stylesheet">
        <style type="text/css">
        * {
            font-family: 'Inconsolata', Courier, monospace;
        }
        body {
            padding: 10px;
        }
        h2, h3 {
            margin-top: 0em;
            margin-bottom: 0.5em;
        }
        .text-overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 500px;
        }
        </style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0-alpha.1/handlebars.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly" defer></script>
    </head>
    <body >
        <form>
            <input id="latlng" type="text" value="40.0803187, -88.2605572" />
        </form>
        <script>
            var x = document.getElementById("latlng");
    
            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else { 
                    x.innerHTML = "Geolocation is not supported by this browser.";
                }
            }

            function isInDesiredForm(str) {
                return !isNaN(str) && !isNaN(parseFloat(str));
            }
    
            function showPosition(position) {
                x.value = position.coords.latitude + 
                ", " + position.coords.longitude;
            }

            function remove_excess(comps) {
                for (var i = 0; i < comps.length; i++) {
                    tokens = comps[i].split(" ");
                    behind = 0;
                    for (var j = 0; j < tokens.length - behind; j++) {
                        if (tokens[j].includes("+")) {
                            tokens.splice(j, 1);
                            behind += 1;
                        }
                        
                    }

                    behind = 0;
                    for (var j = 0; j < tokens.length - behind; j++) {
                        console.log(typeof(tokens[j]))
                        if (tokens[j].length == 5 && isInDesiredForm(tokens[j])) {
                            tokens.splice(j, 1);
                            behind += 1;
                        }
                    }

                    if (tokens.length == 0) comps.splice(i, 1)
                    else comps[i] = tokens.join(" ");
                }
                return comps;
            }

            function reverse_geocode() {
                const geocoder = new google.maps.Geocoder();
                const input = document.getElementById("latlng").value;
                const latlngStr = input.split(",", 2);
                const latlng = {
                    lat: parseFloat(latlngStr[0]),
                    lng: parseFloat(latlngStr[1]),
                };
                geocoder.geocode({location: latlng})
                .then((response) => {
                    if (response.results[0]) {
                        addr = response.results[0].formatted_address;
                        console.log(addr)
                        comps = remove_excess(addr.split(", "));
                        console.log(comps)
                        if (comps.length == 0) document.getElementById("formatted_address").innerHTML = "an undisclosed location";
                        else if (comps.length == 1) document.getElementById("formatted_address").innerHTML = comps[0];
                        else if (comps[comps.length - 1] == "USA") {
                            document.getElementById("formatted_address").innerHTML = comps[comps.length - 3] + ", " + comps[comps.length - 2].substr(0, 2);
                        } else {
                            if (comps.length >= 3) {
                                document.getElementById("formatted_address").innerHTML = comps[comps.length - 3] + ", " + comps[comps.length - 2] + ", " + comps[comps.length - 1];
                            } else document.getElementById("formatted_address").innerHTML = comps[comps.length - 2] + ", " + comps[comps.length - 1];
                        }
                        
                    } else {
                        document.getElementById("formatted_address").innerHTML = "sorry";
                    }
                });
                
            }
        </script>
        <input id="submit" type="button" value="get the location!" onclick="reverse_geocode()"/>
        <p id="formatted_address"></p>
    </body>
</html>


*/