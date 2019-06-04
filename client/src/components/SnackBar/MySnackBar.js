import React, { Component } from "react";
import "./MySnackBar.css";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon
};

const myStyle = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

export default class MySnackBar extends Component {
  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        className="snackBar"
        open={this.props.open}
        autoHideDuration={2000}
        onClose={() => this.props.close()}
        message={
          <span id="client-snackbar" className={myStyle.message}>
            <IconButton className={clsx(myStyle.icon, variantIcon.success)} />
            {this.props.message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className="circleIcon"
            onClick={() => this.props.close()}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}
