import React from "react";
import { act, render, fireEvent } from "@testing-library/react";

import GroupInviteButton from "../../../../components/group-screen/group-invite-button/GroupInviteButton"
import {createMemoryHistory} from "history";
import {Router} from "react-router-dom";
import {Group} from "../../../../models/Group";

const group = new Group("", "", null, [],[])

describe("Onclick shareGroupInviteToWhatsapp button", () => {
    it("Should open WhatsApp with a pre-written invite message", () => {
        const history = createMemoryHistory();
        history.push("/test", {group});

        const {getByTestId} = render(
          <Router history={history}>
              <GroupInviteButton/>
          </Router>
        );
        const button: HTMLButtonElement = getByTestId("whatsapp-invite-button") as HTMLButtonElement;
        const url: string = "http://localhost/";

        act(() => {
            fireEvent.click(button);
        });

        expect(window.location.href).toBe(url)
    });
});

describe("Onclick shareGroupInviteToTwitter button", () => {
    it("Should open Twitter with a pre-written invite message", () => {
        const history = createMemoryHistory();
        history.push("/test", {group});

        const {getByTestId} = render(
          <Router history={history}>
              <GroupInviteButton/>
          </Router>
        );

        const button: HTMLButtonElement = getByTestId("twitter-invite-button") as HTMLButtonElement;
        const url: string = "http://localhost/";

        act(() => {
            fireEvent.click(button);
        });

        expect(window.location.href).toBe(url)
    });
});

