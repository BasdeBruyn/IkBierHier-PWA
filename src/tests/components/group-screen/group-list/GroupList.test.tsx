import React from "react";
import { act, render, fireEvent,waitFor } from "@testing-library/react";
import GroupList from "../../../../components/group-screen/group-list/GroupList"
import {Group} from "../../../../models/Group";
import {User} from "../../../../models/User";
import fetchMock from "jest-fetch-mock";
import {createMemoryHistory} from "history";
import {Router} from "react-router-dom";

const user: User = new User("id", "name");
const groups: Group[] = [new Group("uuid", "name", "description", [user], [user])];

beforeEach(() => {
    fetchMock.doMock();
    fetchMock.mockResponse(JSON.stringify(groups))
});

describe("Render an empty search bar and groups in array", () => {
    it("Should render an empty search bar", () => {
        const history = createMemoryHistory();
        history.push("/test", {user: new User("test", "test")});

        const {getByTestId} = render(
            <Router history={history}>
                <GroupList/>
            </Router>
        );
        const searchBar: HTMLInputElement = getByTestId("search-bar") as HTMLInputElement;

        act(() => {
            fireEvent.change(searchBar, { target: { value: '23' } })
        });

        expect(searchBar).toHaveValue('23');
    });

    it("Should render a div of a group", async () => {
        const history = createMemoryHistory();
        history.push("/test", {user: new User("test", "test")});

        const {getByTestId} = render(
            <Router history={history}>
                <GroupList/>
            </Router>
        );

        const groupElement: HTMLDivElement = await waitFor(() =>  getByTestId("group-element") as HTMLDivElement);

        expect(groupElement).toBeInTheDocument();

    });
});

describe("Clicking buttons should open different pages", () => {
    it("Aanmaken should open GroupForm", () => {

        const history = createMemoryHistory();
        history.push("/test", {user: new User("test", "test")});

        const {getByTestId} = render(
            <Router history={history}>
                <GroupList/>
            </Router>
        );

        const createButton: HTMLButtonElement = getByTestId("create-button") as HTMLButtonElement;

        act(() => {
            fireEvent.click(createButton)
        });

        const url: string = "http://localhost/";
        expect(window.location.href).toBe(url)
    });

    it("Open should open group", async () => {

        const history = createMemoryHistory();
        history.push("/test", {user: new User("test", "test")});

        const {getByTestId} = render(
            <Router history={history}>
                <GroupList/>
            </Router>
        );

        const openButton: HTMLButtonElement = await waitFor(() =>  getByTestId("open-button") as HTMLButtonElement);

        act(() => {
            fireEvent.click(openButton)
        });

        const url: string = "http://localhost/";
        expect(window.location.href).toBe(url)

    });
});




