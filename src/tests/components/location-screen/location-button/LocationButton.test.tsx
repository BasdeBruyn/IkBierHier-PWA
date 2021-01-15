import {fireEvent, render} from "@testing-library/react";
import React from "react";
import LocationButton from "../../../../components/location-screen/location-button/LocationButton";
import fetchMock from "jest-fetch-mock";
import {User} from "../../../../models/User";
import {Group} from "../../../../models/Group";
import Location from "../../../../models/Location";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowLeft, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {LocationActionType} from "../../../../actions/LocationActions";

fetchMock.enableMocks();
const mockStore = configureMockStore([thunk]);
library.add(faChevronDown, faArrowLeft)

beforeEach(() => {
    fetchMock.doMock()
})

const user = new User('id1', 'John') as any;
const group = new Group('uuid1', 'group1', null, [user], [user]);
const location = new Location(null, user, group, 12.13, 1.123, new Date());

describe("LocationButton", () => {
    describe("onClick", () => {
        it("should call the API with the correct Location", async () => {
            const history = createMemoryHistory();
            history.location.state = {group, user}
            const initialState = {
                locations: {
                    items: []
                }
            };
            const store = mockStore(initialState);
            mockGeolocation(12.13, 1.123)

            fetchMock.mockResponse(JSON.stringify(location));

            const {container} = render(
                <Provider store={store}>
                    <Router history={history}>
                        <LocationButton/>
                    </Router>
                </Provider>
            );

            const shareButton = container.querySelector('#share-location')!;
            fireEvent.click(shareButton)

            await waitForFetchMockToBeCalled()
            const fetchedLocation = JSON.parse(fetchMock.mock.calls[0][1]?.body as string)
            expect(fetchedLocation.group).toEqual(location.group)
            expect(fetchedLocation.user).toEqual(location.user)
            expect(fetchedLocation.uuid).toEqual(location.uuid)
            expect(fetchedLocation.latitude).toEqual(location.latitude)
            expect(fetchedLocation.longitude).toEqual(location.longitude)
        })
    })
})

describe("LocationButton delete", () => {
    it("Should not delete location on empty result in list", () => {
        const history = createMemoryHistory();
        history.location.state = {group, user}

        const store = mockStore({
            locations: {
                items: []
            }
        });

        const {getByTestId} = render(
            <Provider store={store}>
                <Router history={history}>
                    <LocationButton/>
                </Router>
            </Provider>
        );
        const button: HTMLButtonElement = getByTestId("location-delete-button") as HTMLButtonElement;

        fireEvent.click(button);

        expect(fetch).not.toBeCalled();
    });

    it("Should delete location on result in list", () => {
        const history = createMemoryHistory();
        history.location.state = {group, user}
        const date: Date = new Date();
        const location: Location = new Location(null, user, group, .0, .0, date);

        const store = mockStore({
            locations: {
                items: [location]
            }
        });

        const {getByTestId} = render(
            <Provider store={store}>
                <Router history={history}>
                    <LocationButton/>
                </Router>
            </Provider>
        );
        const button: HTMLButtonElement = getByTestId("location-delete-button") as HTMLButtonElement;

        store.dispatch({
            type: LocationActionType.GET_ALL_LOCATIONS,
            payload: [location]
        });

        fireEvent.click(button);

        expect(fetch).toBeCalled();
    });
});

function mockGeolocation(latitude: number, longitude: number) {
    const coords = {
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        latitude: latitude,
        longitude: longitude,
        speed: 0,
    };
    // @ts-ignore
    global.navigator.geolocation = {
        getCurrentPosition: jest.fn((resolve) => resolve({coords: coords, timestamp: 0})),
        watchPosition: jest.fn()
    }
}

async function waitForFetchMockToBeCalled() {
    for (let i = 0; i < 100; i++) {
        if (fetchMock.mock.calls.length > 0) {
            return;
        }
        await setTimeout(jest.fn(), 10)
    }
}