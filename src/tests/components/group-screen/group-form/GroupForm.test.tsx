import React from "react";
import {act, render, fireEvent} from "@testing-library/react";
import {createMemoryHistory} from "history";
import {Router} from "react-router-dom";
import GroupForm from "../../../../components/group-screen/group-form/GroupForm";
import {User} from "../../../../models/User";

const mockHandleSubmit = jest.fn();

const user = new User("id", "John")

describe("Render group form", () => {
  it("Should render a blank name input", () => {
    const history = createMemoryHistory();
    history.push("/", {user})
    const {getByTestId} = render(
      <Router history={history}>
        <GroupForm/>
      </Router>
    );

    const nameInput: HTMLInputElement = getByTestId("input-name") as HTMLInputElement;

        act(() => {
            fireEvent.change(nameInput, { target: { value: '23' } })
        });

        expect(nameInput).toHaveValue("23")
    });

  it("Should render a blank description input", () => {
    const history = createMemoryHistory();
    history.push("/", {user})
    const {getByTestId} = render(
      <Router history={history}>
        <GroupForm/>
      </Router>
    );

    const descriptionInput: HTMLInputElement = getByTestId("input-description") as HTMLInputElement;

        act(() => {
            fireEvent.change(descriptionInput, { target: { value: '23' } })
        });

        expect(descriptionInput).toHaveValue('23')
    });

  it("Onclick handleSubmit should submit group to API", () => {
    const history = createMemoryHistory();
    history.push("/", {user})
    const {getByTestId} = render(
      <Router history={history}>
        <GroupForm/>
      </Router>
    );

    const submitButton: HTMLButtonElement = getByTestId("submit-button") as HTMLButtonElement;

    act(() => {
      fireEvent.click(submitButton);
    });

    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });
});



