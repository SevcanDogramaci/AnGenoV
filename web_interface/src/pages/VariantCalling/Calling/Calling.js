import React, { useState } from 'react';
import { 
    Checkbox, 
    Button, 
} from "@blueprintjs/core";

import Service from "../../../services/Service";

const smallReadSVCallers = ["Tardis", "Delly", "Lumpy", "Manta", "Smoove"];
const longReadSVCallers = [ "Svim", "CuteSV", "Sniffles"];
const { ipcRenderer } = require('electron');

async function sleep() {
    await new Promise(resolve => setTimeout(resolve, 2500)); // to imitate running
}

const Calling = (props) => {
    const SVCallers = props.readOption == "Illumina" ? smallReadSVCallers : longReadSVCallers;
    const [checkedCallers, updateCheckedCallers] = useState([]);

    async function updateRunning(e) {
        console.log("Files for run >>", props.filesForCall);
        console.log("Running...");

        props.updateRunning(true);
        ipcRenderer.send('log-file-request');

        console.log("After ipcSend");

        Service.runDelly(props.filesForCall)
            .then(response => { 
                sleep().then(response => {
                    props.updateRunning(false);
                });
            })
    }

    const handleSVCallerChecked = (e, name) => {
        let is_checked = e.target.checked;

        if (is_checked) 
            checkedCallers.push(name);
        else 
            updateCheckedCallers(checkedCallers.filter(item => item !== name))

        console.log("CheckedCallers >>", checkedCallers);
        props.updateCallers(checkedCallers);
    }
    
    return (
        
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            {console.log("Read option >>", props.readOption)}
            
            <h3 className="bp3-heading">SV Calling</h3>
            <p>Choose the algorithms you want to run :</p>

            <div>
                { SVCallers.map((algorithm, id) =>  {
                    return id < SVCallers.length ? 
                        <Checkbox onChange={e => handleSVCallerChecked(e, algorithm)} key={id}>
                            {algorithm}
                        </Checkbox> 
                        : <></> }
                )}
            </div>

            <div style={{width: "30%", marginTop: "1%"}}>
                <Button fill={true} icon="caret-right" onClick={e => updateRunning(e)}> Run </Button>
            </div>
        </div>
    );
}

export default Calling;