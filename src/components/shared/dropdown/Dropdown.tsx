import React from "react";
import DropdownButton from "./dropdown-button/DropdownButton";
import DropdownOptions from "./dropdown-options/DropdownOptions";

interface DropdownProps {
  defaultValue?: any
  options: any
  onValueChange: any
}

interface DropdownState {
  showOptions: boolean,
  selectedOption: any
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.setSelectedOption = this.setSelectedOption.bind(this);
    this.state = {
      showOptions: false,
      selectedOption: props.defaultValue
    }
  }

  toggleOptions() {
    this.setState({showOptions: !this.state.showOptions});
  }

  setSelectedOption(label: any) {
    this.setState({selectedOption: label});
    this.props.onValueChange(this.props.options[label]);
    this.toggleOptions();
  }

  render() {
    return (
      <div className="relative inline-block text-left">
        <DropdownButton toggleOptions={this.toggleOptions} selectedOption={this.state.selectedOption}/>
        {this.state.showOptions && (
          <DropdownOptions setSelectedOption={this.setSelectedOption} dropdownOptions={this.props.options}/>
        )}
      </div>
    );
  }
}

export default Dropdown;