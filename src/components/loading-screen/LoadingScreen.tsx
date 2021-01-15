import React from "react";
import IkBierHier from "../shared/ikbierbier/IkBierHier";

class LoadingScreen extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <div className={"mt-32 text-center"} data-testid="auth0-loading">
                <IkBierHier />
                <div className={"mt-6"}>Bezig met laden...</div>
            </div>
        )
    }
}

export default LoadingScreen;