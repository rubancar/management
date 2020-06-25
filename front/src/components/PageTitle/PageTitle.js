import React from "react";
import { Button } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

export default function PageTitle(props) {
  var classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
          {props.title} { props.subtitle && <small style={{fontSize:"50%"}}>{props.subtitle}</small> }
      </Typography>
      {props.button && (
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="primary"
          onClick={props.handleButtonClick || (() => {})}
        >
          {props.button}
        </Button>
      )}
    </div>
  );
}
