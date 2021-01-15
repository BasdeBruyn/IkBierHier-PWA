import store from "../store";

export class AuthService {
    public signUp() {
        const apiUrl = process.env.REACT_APP_API_ADDRESS;
        const jwt: string = store.getState().auth.jwt as string;

        return fetch(apiUrl + '/user/signup', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
    }

    public getUser() {
        const apiUrl = process.env.REACT_APP_API_ADDRESS;
        const jwt: string = store.getState().auth.jwt as string;

        return fetch(apiUrl + '/user/get', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
    }
}