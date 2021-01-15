import fetchMock from "jest-fetch-mock";
import {AuthService} from "../../services/AuthService";

const authService: AuthService = new AuthService();

beforeEach(() => {
    fetchMock.doMock();
});

describe("AuthService signUp", () => {
    it("Should call fetch", () => {
        authService.signUp();
        expect(fetch).toBeCalled();
    });
});

describe("AuthService getUser", () => {
    it("Should call fetch", () => {
        authService.getUser();
        expect(fetch).toBeCalled();
    });
})

