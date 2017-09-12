import React from "react";
import classnames from "classnames";

class Button extends React.Component {
  render() {
    return <button>{this.props.name}</button>;
  }
}

export default Button;
