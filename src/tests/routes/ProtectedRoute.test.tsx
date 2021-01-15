import React from "react";
import {render} from "@testing-library/react";
import ProtectedRoute from "../../routes/ProtectedRoute";
import {BrowserRouter, Switch} from "react-router-dom";

describe("Renders", () => {
    it("Should render protected route", () => {
        render(
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute />
                </Switch>
            </BrowserRouter>
            );

        expect(ProtectedRoute).toBeTruthy();
    });
});