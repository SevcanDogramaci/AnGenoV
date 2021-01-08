import Inputs from "./Inputs"
import Calling from "./Calling"
import Outputs from "./Outputs"
import { ControlGroup } from "@blueprintjs/core";

const CallingPage = () => {
    return (
        <div style={{display:"flex", flexDirection:"row", marginTop:"2.5%",
                    alignItems:"flex-start", justifyContent:"center"}}>
            <ControlGroup fill={true}>
                <Inputs/>
            </ControlGroup>
            <ControlGroup fill={true}>
                <Calling/>
            </ControlGroup>
            <ControlGroup fill={true}>
                <Outputs/>
            </ControlGroup>
        </div>
    );
}

export default CallingPage;