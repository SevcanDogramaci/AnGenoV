import React from 'react';
import { Checkbox, Button, ControlGroup } from "@blueprintjs/core";
import Service from "./Service";
import { useState } from "react";

const smallReadSVCallers = ["Tardis", "Delly", "Lumpy", "Manta", "Smoove"]
const longReadSVCallers = [ "Svim", "CuteSV", "Sniffles"]


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Calling = (props) => {
    const SVCallers = props.readOption == "Illumina" ? smallReadSVCallers : longReadSVCallers;
    const [checkedCallers, updateCheckedCallers] = useState([]);

    async function sleep(e) {
        await new Promise(resolve => setTimeout(resolve, 2500)); // to imitate running
    }

    async function updateRunning(e) {
        console.log(props.filesForCall);
        console.log("Running...");
        props.updateRunning(true);
        let logs = "";

        checkedCallers.forEach(caller => {
            logs += caller +  " running...\n";
        });
        props.updateLogs(logs);
        Service.runDelly(props.filesForCall).then(response => {
            //props.updateLogs(response);
            sleep().then(r => {props.updateRunning(false);});
            })
    }

    const handleSVCallerChecked = (e, name) => {
        let is_checked = e.target.checked

        if (is_checked) 
            checkedCallers.push(name);
        else 
            updateCheckedCallers(checkedCallers.filter(item => item !== name))

        console.log(checkedCallers)
        props.updateCallers(checkedCallers);
    }
    
    return (
        
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            {console.log(props.readOption)}
            <h3 class="bp3-heading">SV Calling</h3>
            <p>Choose the algorithms you want to run :</p>

            <div>

            { SVCallers.map((algorithm, id) =>  {
                    return id < SVCallers.length ? 
                        <Checkbox onChange={e => handleSVCallerChecked(e, algorithm)} key={id}>{algorithm}</Checkbox> : <></>})}
                {/* <ControlGroup vertical={false}>
                    <Checkbox>Deneme</Checkbox>
                    <Button icon="plus" className="bp3-intent-primary" 
                        style={{borderRadius:"50%", marginLeft: "20%"}}/>
                </ControlGroup> */}
            </div>

            <div style={{width: "30%", marginTop: "1%"}}>
                <Button fill={true} icon="caret-right" onClick={e => updateRunning(e)}>
                Run
                </Button>
            </div>
        </div>
    );
}

export default Calling;