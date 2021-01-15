import {User} from "../models/User";

export enum AuthActionType {
    SET_JWT_TOKEN = "SET_JWT_TOKEN",
    DELETE_JWT_TOKEN = "DELETE_JWT_TOKEN",
    SET_USER = "SET_USER",
    DELETE_USER = "DELETE_USER"
}

export interface SetJwtTokenAction {
    type: AuthActionType;
    payload: string;
}

export interface DeleteJwtTokenAction {
    type: AuthActionType;
}

export interface SetUserAction {
    type: AuthActionType;
    payload: User;
}

export interface DeleteUserAction {
    type: AuthActionType;
}

export function setJwtToken(jwt: string): SetJwtTokenAction {
    return {
        type: AuthActionType.SET_JWT_TOKEN,
        payload: jwt
    };
}

export function deleteJwtToken(): DeleteJwtTokenAction {
    return {
        type: AuthActionType.DELETE_JWT_TOKEN
    };
}

export function setUser(user: User): SetUserAction {
    return {
        type: AuthActionType.SET_USER,
        payload: user
    };
}

export function deleteUser(): DeleteUserAction {
    return {
        type: AuthActionType.DELETE_USER
    };
}

export type AuthAction = SetJwtTokenAction | DeleteJwtTokenAction | SetUserAction | DeleteUserAction;