import {fireEvent, render, RenderResult, screen, waitFor} from "@testing-library/react";
import React from "react";
import Dropdown from "../../../../components/shared/dropdown/Dropdown";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowLeft, faChevronDown} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown, faArrowLeft)

describe("Dropdown", () => {
  it("renders default value", async () => {
    library.add(faChevronDown)
    const dropdownOptions = {
      "15 minuten": 15
    }
    const onValueChange = jest.fn();
    render(<Dropdown options={dropdownOptions} onValueChange={onValueChange} defaultValue={"15 minuten"}/>)

    const dropdownButton = screen.getByText(/15 minuten/i)

    expect(dropdownButton).toBeInTheDocument()
  })

  it("renders dropdown options", async () => {
    library.add(faChevronDown)
    const options = {
      "15 minuten": 15,
      "30 minuten": 30,
      "45 minuten": 45
    }
    const onValueChange = jest.fn();
    const dom = render(<Dropdown options={options} onValueChange={onValueChange}/>)

    await openDropdown(dom)
    const dropdownOptions = screen.getAllByRole("menuitem")

    expect(dropdownOptions.length).toBe(3)
    const optionsList = Object.entries(options)
    dropdownOptions.forEach((option, index) => {
      expect(option).toHaveTextContent(optionsList[index][0])
    })
  })

  it("calls onValueChange prop function with correct value", async () => {
    library.add(faChevronDown)
    const options = {
      "15 minuten": 15,
      "30 minuten": 30,
      "45 minuten": 45
    }
    const onValueChange = jest.fn();
    const dom = render(<Dropdown options={options} onValueChange={onValueChange}/>)

    await openDropdown(dom);
    selectDropdownOption("30 minuten")

    expect(onValueChange).toBeCalledWith(30)
  })

  it("shows selected label on dropdown button", async () => {
    library.add(faChevronDown)
    const options = {
      "15 minuten": 15,
      "30 minuten": 30,
      "45 minuten": 45
    }
    const onValueChange = jest.fn();
    const dom = render(<Dropdown options={options} onValueChange={onValueChange}/>)

    const dropdownButton = await openDropdown(dom);
    selectDropdownOption("30 minuten")

    expect(dropdownButton).toHaveTextContent("30 minuten")
  })
})

function selectDropdownOption(optionText: string) {
  fireEvent.click(screen.getByText(optionText))
}

async function openDropdown(dom: RenderResult): Promise<Element> {
  const dropdownButton = dom.container.querySelector('#open-options')!;
  fireEvent.click(dropdownButton)
  await waitFor(() => screen.getByRole("menu"))
  return dropdownButton
}
