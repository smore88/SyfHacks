import React, { Component } from "react";
import ClientDataService from "../services/tutorial.service";
import { calculateDistance } from "../utils";

import NewIphone from "./NewIphone";

import { CardInfoName, CardInfoTextField, StyledCustomerCard, CenteredWrapper, IphoneLayout } from "./StyledComponents";
import { Typography } from "@mui/material";

import { Button } from "@mantine/core";
import zIndex from "@mui/material/styles/zIndex";


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
      submitted: false
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

  newApplicant() {
    this.setState({
      id: null,
      client_name: "",
      service_name: "",
      payment_num: "",
      card_loc_lat: "",
      card_loc_long: "",
      submitted: false
    });
  }

  /* <IphoneLayout>
            <img src="./phoneCover.png" className="iphone"></img>
            <Button className="yes-no">

            </Button>
          </IphoneLayout> */

  render() {
    return (
      // className="submit-form"
      <div>
        <CenteredWrapper>
          <NewIphone></NewIphone>
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
                placeholder="$1000.00"
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
                  placeholder="Lat"
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
                  placeholder="Long"
                  className="form-control"
                  id="card_loc_long"
                  required
                  value={this.state.card_loc_long}
                  onChange={this.onChangeCardLocLong}
                  name="card_loc_long"
                />
              </div>
              <Button onClick={this.saveApplicant} className="btn btn-success">
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