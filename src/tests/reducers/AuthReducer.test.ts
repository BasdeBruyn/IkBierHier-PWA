import {authReducer, AuthState} from "../../reducers/AuthReducer";
import {AuthAction, AuthActionType} from "../../actions/AuthActions";
import {User} from "../../models/User";

const initialState: AuthState = {
    jwt: null,
    user: null
};

const jwt: string = "token";
const user: User = new User("id", "name");

describe("UserReducer SET_JWT_TOKEN", () => {
    it("Should update jwt token", () => {
        const action: AuthAction = {
            type: AuthActionType.SET_JWT_TOKEN,
            payload: jwt
        };

        const newState = authReducer(initialState, action);

        expect(newState.jwt).toBe(jwt);
    });
});

describe("UserReducer DELETE_JWT_TOKEN", () => {
    it("Should delete jwt token", () => {
        const setAction: AuthAction = {
            type: AuthActionType.SET_JWT_TOKEN,
            payload: jwt
        };

        const deleteAction: AuthAction = {
            type: AuthActionType.DELETE_JWT_TOKEN
        };

        const tempState = authReducer(initialState, setAction);
        const newState = authReducer(tempState, deleteAction);

        expect(newState.jwt).toBeNull();
    });
});

describe("UserReducer SET_USER", () => {
    it("Should update user", () => {
        const setAction: AuthAction = {
            type: AuthActionType.SET_USER,
            payload: user
        };

        const newState = authReducer(initialState, setAction);

        expect(newState.user).not.toBeNull();
    });
});

describe("UserReducer DELETE_USER", () => {
    it("Should delete user", () => {
        const setAction: AuthAction = {
            type: AuthActionType.SET_USER,
            payload: user
        };

        const deleteAction: AuthAction = {
            type: AuthActionType.DELETE_USER
        };

        const tempState = authReducer(initialState, setAction);
        const newState = authReducer(tempState, deleteAction);

        expect(newState.user).toBeNull();
    });
});

describe("UserReducer default", () => {
    it("Should return same state", () => {
        const action = {
            type: null
        };

        // @ts-ignore
        const state = authReducer({jwt:null, user:null}, action);

        expect(state).toEqual({jwt:null, user:null});
    });
});