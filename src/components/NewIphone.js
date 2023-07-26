import React from 'react';
import { Button } from "@mantine/core";
import { IphoneLayout } from './StyledComponents';

const NewIphone = () => {
  return (
      <IphoneLayout>
        <img src="./phoneCover.png" className="iphone"></img>
          <Button className="yes-no">
            
          </Button>
      </IphoneLayout>
  );
};

export default NewIphone;