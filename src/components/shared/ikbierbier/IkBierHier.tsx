import React from "react";
import icon from "../../../assets/img/bier.png"

class IkBierHier extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <div className={"flex flex-col items-center"}>
                <img alt={""} src={icon} width={240} />
                <h1 className={"text-2xl"}>Ik bier hier!</h1>
            </div>
        );
    }
}

export default IkBierHier;