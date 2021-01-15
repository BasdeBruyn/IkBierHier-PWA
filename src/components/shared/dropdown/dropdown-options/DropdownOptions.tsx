import React from "react";

interface DropdownOptionsProps {
  setSelectedOption: any,
  dropdownOptions: any
}

const optionsClass = [
  "origin-top-right",
  "absolute",
  "right-0",
  "shadow-lg",
  "bg-yellow",
  "border-t-0",
  "border-black",
  "border-2"
].join(' ');

const optionClass = [
  "block",
  "px-4",
  "py-2",
  "hover:bg-yellow-400"
].join(' ');

class DropdownOptions extends React.Component<DropdownOptionsProps, any> {
  render() {
    return (
      <div
        className={optionsClass}>
        <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {
            Object.keys(this.props.dropdownOptions).map((label: string) => (
              <p key={label}
                 className={optionClass}
                 role="menuitem"
                 onClick={() => this.props.setSelectedOption(label)}>
                {label}
              </p>
            ))
          }
        </div>
      </div>
    );
  }
}

export default DropdownOptions;