import React, { useState, useContext, useEffect } from 'react';
import { 
    Checkbox, 
    Button,
} from "@blueprintjs/core";

import Service from "../../../services/Service";
import { CallingContext } from './CallingContext';
import SVCallerTool from './components/SVCallerTool';
import NewSVCallerTool from './components/NewSVCallerTool';

const { ipcRenderer } = require('electron');

const Calling = (props) => {
    const context = useContext(CallingContext);

    async function updateRunning(e) {
        console.log("Files for run >>", props.filesForCall);
        console.log("Running...");

        context.setRunning(true);

        console.log("Checked callers >> ", context.checkedCallers);

        Service.runSelectedTools(props.filesForCall, context.checkedCallers)
            .then(response => { 
                    console.log("Response >> ", response);
                    context.setResponseMessages(response);
                    context.setRunning(false);
                });
    }

    const handleSVCallerChecked = (e, name) => {
        let is_checked = e.target.checked;

        if (is_checked) 
            context.setCheckedCallers(context.checkedCallers.add(name));
        else 
            context.setCheckedCallers(context.checkedCallers.delete(name));

        console.log("CheckedCallers >>", context.checkedCallers);
    }

    const refreshPage = () => {
        ipcRenderer.invoke("read-config-file")
            .then((result) => {
                console.log(result);

                let tools = result["tools"];
                let filteredTools = {};

                Object.keys(tools)
                    .filter(tool =>  (tools[tool].readType == context.readOption))
                    .forEach(tool => filteredTools[tool] = tools[tool]);

                setSVCallerTools(filteredTools);
            })
    }

    const [SVCallerTools, setSVCallerTools] = useState(null);

    useEffect(() => { 
        refreshPage();
    }, [, context.readOption]);
    
    return (
        
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            {console.log("Read option >>", context.readOption)}
            
            <h3 className="bp3-heading">SV Calling</h3>
            <p>Choose the algorithms you want to run :</p>

            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <div>
                    { SVCallerTools && 
                        Object.keys(SVCallerTools).map((key, id) =>  {
                            return <Checkbox onChange={e => handleSVCallerChecked(e, key)} key={key} style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                                    <SVCallerTool name={key} tool={SVCallerTools[key]} onRefresh={refreshPage}/>
                                </Checkbox> }
                    )}
                </div>
            </div>

            <div style={{display:"flex", flexDirection:"row", alignSelf:"flex-end", width:"25%"}}>
                    <NewSVCallerTool onRefresh={refreshPage}/>
            </div>

            <div style={{width: "30%", marginTop: "10%"}}>
                <Button disabled={context.running} fill={true} icon="caret-right" onClick={e => updateRunning(e)}> Run </Button>
            </div>
        </div>
    );
}

export default Calling;