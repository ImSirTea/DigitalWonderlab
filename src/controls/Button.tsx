import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { FunctionComponent } from "react";

export const Button: FunctionComponent<MuiButtonProps> = (props) => {
  return <MuiButton {...props} />;
};

export default Button;