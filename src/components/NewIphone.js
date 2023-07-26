import React from 'react';
import { Button } from "@mantine/core";
import { IphoneLayout, ButtonHolder } from './StyledComponents';

const NewIphone = () => {
  return (
      <IphoneLayout>
        <img src="./phoneCover.png" className="iphone"></img>
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