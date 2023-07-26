import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const CardInfoName = styled(Typography)`
	// Add something here for the initial typography name
`;

export const CenteredWrapper = styled('div')`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`;

export const ButtonHolder = styled('div')`
  margin-top: -250px;
  margin-left: 90px;
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 64px;
  
  align-items: center;
  padding-left: 20px;
  padding-right: 12px;
  padding-top: 2rem;
  margin-bottom: 0px;
  margin-right: 100px;
`;

export const IphoneLayout = styled('div')`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items:center;
`;

export const StyledCustomerCard = styled('div')`
  border-radius: 12px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  width: 44vh;
  margin-left: 20px;
  height: 47vh;
  margin-top: 20vh;
`;

export const CardInfoTextField = styled(TextField)`
	margin-top: 10px;
	width: 200px;
	background-color: white; /* Set the background color to white */
	border-radius: 8px;
	border: 2px solid black;
	border-width: 2px; /* Set the border width to bold */
`;

export const LocationText = styled('p')`
  position: absolute;
  padding-top: 20.5rem;
  padding-right: 6.75rem;
  font-size: 11px;
  color: grey;
  font-family: Open Sans, Sans-Serif;
  font-style: normal;
  
`

