import store from "../store";
import {Invite} from "../models/Invite";

export class InviteService {

    baseUrl: string | undefined = process.env.REACT_APP_API_ADDRESS;

    public async createInvite(group_uuid: string) {
        const jwt: string = store.getState().auth.jwt as string;
        const inviteModel: Invite = new Invite(null, group_uuid, 0);
        const parameters = {
            method: 'POST',
            body: JSON.stringify(inviteModel),
            headers: {
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json'
            }
        };
        return fetch(this.baseUrl + '/invite', parameters);
    }

    public async getInvite(inviteUUID: string) {
        const jwt: string = store.getState().auth.jwt as string;
        return fetch(this.baseUrl + "/invite/" + inviteUUID, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
    }
}
