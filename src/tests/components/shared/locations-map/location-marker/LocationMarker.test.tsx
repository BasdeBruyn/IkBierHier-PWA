import React from "react";
import {render, fireEvent} from "@testing-library/react";
import LocationMarker from "../../../../../components/shared/locations-map/location-marker/LocationMarker";
import Location from "../../../../../models/Location";
import {User} from "../../../../../models/User";
import {Group} from "../../../../../models/Group";

const user: User = new User("id", "name");
const group: Group = new Group("uuid", "name", "description", [user], [user]);

const mockOnMarkerClicked = jest.fn();
jest.mock("react-map-gl", () => {
    return {
        Marker: (props: any) => (<>{props.children}</>)
    }
})

describe("Render LocationMarker", () => {
    it("Should render correctly", () => {
        const date: Date = new Date(Date.now() + 10);
        const location: Location = new Location(null, user, group, .0, .0, date);

        const {getByTestId} = render(<LocationMarker location={location} onMarkerClicked={mockOnMarkerClicked} />);

        expect(getByTestId("location-marker")).toBeTruthy();
    });

    it("Should render button correctly", () => {
        const date: Date = new Date(Date.now() + 10);
        const location: Location = new Location(null, user, group, .0, .0, date);

        const {getByTestId} = render(<LocationMarker location={location} onMarkerClicked={mockOnMarkerClicked} />);

        expect(getByTestId("location-marker-button")).toBeTruthy();
    });
});

describe("Click on button LocationMarker", () => {
    it("Should execute button function", () => {
        const date: Date = new Date(Date.now() + 10);
        const location: Location = new Location(null, user, group, .0, .0, date);

        const {getByTestId} = render(<LocationMarker location={location} onMarkerClicked={mockOnMarkerClicked} />);
        const button: HTMLButtonElement = getByTestId("location-marker-button") as HTMLButtonElement;

        fireEvent.click(button);

        expect(mockOnMarkerClicked).toBeCalled();
    });
});