import React from "react";
import {render} from "@testing-library/react";
import AppRouter from "../../routes/AppRouter";

describe("Renders", () => {
    it("Should render react-router", () => {
        render(<AppRouter />);
        expect(AppRouter).toBeDefined();
    })
})