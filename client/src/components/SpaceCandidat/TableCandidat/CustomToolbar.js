import React, { Component } from "react";
import Button from "@material-ui/core/Button";

let props = "";

export default class CustomToolbar extends Component {
  componentDidMount() {
    props = this.props;
  }
  changeBrouillon() {
    const index = props.selectedRows.data[0].index;
    const id = props.displayData[index].data[0];
    props.setBrouillon(id);
  }

  render() {
    return (
      <Button
        variant="contained"
        style={{ marginRight: "2em" }}
        href={"#candidature"}
        onClick={this.changeBrouillon}
      >
        Modifer{" "}
      </Button>
    );
  }
}
