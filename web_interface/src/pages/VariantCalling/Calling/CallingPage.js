import React, { useState }  from 'react';
import { 
    ControlGroup 
} from "@blueprintjs/core";

import Inputs from "./Inputs"
import Calling from "./Calling"
import Outputs from "./Outputs"

const CallingPage = () => {
    const [readOption, setReadOption] = useState(undefined);
    const [running, setRunning] = useState(undefined);

    const [logs, updateLogs] = useState("");
    const [sampleFile, setSampleFile] = useState(undefined);
    const [referenceFile, setReferenceFile] = useState(undefined);
    const [checkedCallers, setCheckedCallers] = useState([]); 

    return (
        
        <div style={{display:"flex", flexDirection:"row", marginTop:"2.5%",
                    alignItems:"flex-start", justifyContent:"space-between",  width:"75%"}}>
                    
            <ControlGroup fill={true}>
                <Inputs updateReadOption={setReadOption} updateSampleFile={setSampleFile}
                        updateReferenceFile={setReferenceFile}/>
            </ControlGroup>

            <ControlGroup fill={true}>
                <Calling readOption={readOption} updateRunning={setRunning} 
                         updateLogs={updateLogs} updateCallers={setCheckedCallers}
                         filesForCall={{sample: sampleFile, ref: referenceFile}}/>
            </ControlGroup>

            <ControlGroup fill={true}>
                <Outputs isRunning={running} logs={logs} algorithms={checkedCallers}/>
            </ControlGroup>
        </div>
    );
}

export default CallingPage;