import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

interface DropdownButtonProps {
  toggleOptions: any
  selectedOption: string
}

const buttonClass = [
  "inline-flex",
  "justify-between",
  "w-34",
  "border-2",
  "border-black",
  "shadow-sm",
  "px-4",
  "py-2",
  "bg-yellow",
].join(' ');

class DropdownButton extends React.Component<DropdownButtonProps, any> {
  render() {
    return (
      <div>
        <button type="button"
                className={buttonClass}
                id="open-options"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={this.props.toggleOptions}>
          {this.props.selectedOption}
          <FontAwesomeIcon className="-mr-1 ml-2 mt-1 w-5" icon="chevron-down" />
        </button>
      </div>
    );
  }
}

export default DropdownButton;