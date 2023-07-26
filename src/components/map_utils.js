import React, { Component } from "react";
import ClientDataService from "../services/tutorial.service";
import { calculateDistance } from "../utils";

import NewIphone from "./NewIphone";

import { CardInfoName, CardInfoTextField, StyledCustomerCard, CenteredWrapper, IphoneLayout } from "./StyledComponents";
import { Typography } from "@mui/material";

import { Button } from "@mantine/core";
import zIndex from "@mui/material/styles/zIndex";

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import google from "https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly";

function MyComponent() {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"
	})
}

function initMap() {
	const map = new window.google.maps.Map(document.getElementById("map"), {
	  zoom: 8,
	  center: { lat: 40.731, lng: -73.997 },
	});
	const geocoder = new window.google.maps.Geocoder();
	const infowindow = new window.google.maps.InfoWindow();
  }


window.initMap = initMap;

function isInDesiredForm(str) {
	return !isNaN(str) && !isNaN(parseFloat(str));
}

function remove_excess(comps) {
	for (var i = 0; i < comps.length; i++) {
		var tokens = comps[i].split(" ");
		var behind = 0;
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
};

function reverse_geocode(lats, longs) {
	return new Promise((resolve, reject) => {
		const geocoder = new window.google.maps.Geocoder();
		const latlng = {
			lat: parseFloat(lats),
			lng: parseFloat(longs),
		};
		geocoder.geocode({location: latlng})
		.then((response) => {
			if (response.results[0]) {
				var addr = response.results[0].formatted_address;
				console.log(addr)
				var comps = remove_excess(addr.split(", "));
				console.log(comps)
				if (comps.length == 0) resolve("an undisclosed location");
				else if (comps.length == 1) resolve(comps[0]);
				else if (comps[comps.length - 1] == "USA") {
					resolve(comps[comps.length - 3] + ", " + comps[comps.length - 2].substr(0, 2));
				} else {
					if (comps.length >= 3) {
						resolve(comps[comps.length - 3] + ", " + comps[comps.length - 2] + ", " + comps[comps.length - 1]);
					} else {
						console.log("returning");
						resolve(comps[comps.length - 2] + ", " + comps[comps.length - 1]);
					}
				}
				
			} else {
				reject("sorry");
			}
		});
	});
	
	
};

export {remove_excess, reverse_geocode};