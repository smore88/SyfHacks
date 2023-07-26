import React from 'react';
import { Button } from "@mantine/core";
import { IphoneLayout, ButtonHolder, LocationText } from './StyledComponents';
import { useState } from 'react';

const NewIphone = ({ location }) => {
  // const [location, setLocation] = useState("");
  
  // useEffect(() => {
  //   if ()

  // , [location]}

  return (
      <IphoneLayout>
        <img src="./phoneCover.png" className="iphone"></img>

        <LocationText>{location}</LocationText>
        <ButtonHolder>
          <button className="transparent-button">
            <img src="./greenX.png" alt="Green X" className="transparent-image" />
          </button>
          <button className="transparent-button">
            <img src="./redX.png" alt="Red X" className="transparent-image" />
          </button>
        </ButtonHolder>
      </IphoneLayout>
  );
};

export default NewIphone;