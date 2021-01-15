// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {TextEncoder, TextDecoder} from "util";

if (global.TextEncoder === undefined) {
    global.TextEncoder = TextEncoder;

    // @ts-ignore
    global.TextDecoder = TextDecoder;
}

jest.mock('./store', () => {
    return {
        getState: () => {
            return {auth: {jwt: ''}}
        }
    }
})

require('jest-fetch-mock').enableMocks();
