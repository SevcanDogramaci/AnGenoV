import Inputs from "./Inputs"
import Calling from "./Calling"
import Outputs from "./Outputs"
import { ControlGroup } from "@blueprintjs/core";
import {useState} from "react";

const CallingPage = () => {
    const [readOption, setReadOption] = useState(undefined);
    const [running, setRunning] = useState(undefined);

    const [logs, updateLogs] = useState("");

    return (
        <div style={{display:"flex", flexDirection:"row", marginTop:"2.5%",
                    alignItems:"flex-start", justifyContent:"space-between",  width:"75%"}}>
            <ControlGroup fill={true}>
                <Inputs updateReadOption={setReadOption}/>
            </ControlGroup>
            <ControlGroup fill={true}>
                <Calling readOption={readOption} updateRunning={setRunning} updateLogs={updateLogs}/>
            </ControlGroup>
            <ControlGroup fill={true}>
                <Outputs isRunning={running} logs={logs}/>
            </ControlGroup>
        </div>
    );
}

export default CallingPage;