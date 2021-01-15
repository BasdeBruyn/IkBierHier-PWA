import {AuthAction, AuthActionType, SetJwtTokenAction, SetUserAction} from "../actions/AuthActions";
import {User} from "../models/User";

export interface AuthState {
    jwt: string | null;
    user: User | null
}

const initialState: AuthState = {
    jwt: null,
    user: null
};

export function authReducer(state: AuthState = initialState, action: AuthAction): AuthState {
    switch(action.type) {
        case AuthActionType.SET_JWT_TOKEN:
            const setJwtTokenAction = action as SetJwtTokenAction
            return {jwt: setJwtTokenAction.payload, user: state.user};
        case AuthActionType.DELETE_JWT_TOKEN:
            return {jwt: null, user: state.user}
        case AuthActionType.SET_USER:
            const setUserAction = action as SetUserAction
            return {user: setUserAction.payload, jwt: state.jwt};
        case AuthActionType.DELETE_USER:
            return {user: null, jwt: state.jwt}
        default:
            return state;
    }
}