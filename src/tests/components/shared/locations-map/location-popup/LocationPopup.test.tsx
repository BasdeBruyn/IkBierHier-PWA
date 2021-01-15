import React from "react";
import {render} from "@testing-library/react";
import Location from "../../../../../models/Location";
import {User} from "../../../../../models/User";
import {Group} from "../../../../../models/Group";
import LocationPopup from "../../../../../components/shared/locations-map/location-popup/LocationPopup";

const user: User = new User("id", "name");
const group: Group = new Group("uuid", "name", "description", [user], [user]);

const mockOnClose = jest.fn();

jest.mock("react-map-gl", () => {
    return {
        Popup: (props: any) => (<>{props.children}</>)
    }
})

describe("Render LocationPopup", () => {
    it("Should render correctly", () => {
        const date: Date = new Date(Date.now() + 10);
        const location: Location = new Location(null, user, group, .0, .0, date);

        const {getByTestId} = render(<LocationPopup location={location} onClose={mockOnClose} />);

        expect(getByTestId("location-popup")).toBeTruthy();
    });

    it("Should render button correctly", () => {
        const date: Date = new Date(Date.now() + 10);
        const location: Location = new Location(null, user, group, .0, .0, date);

        const {getByTestId} = render(<LocationPopup location={location} onClose={mockOnClose} />);

        expect(getByTestId("location-popup-button")).toBeTruthy();
    });
});