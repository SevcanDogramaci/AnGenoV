import React, { useState } from 'react';
import { 
    Button, 
    Tooltip, 
    Position, 
    Icon,
    FileInput
} from "@blueprintjs/core";

import Service from '../../../services/Service';

const { ipcRenderer } = require('electron');

const MergePage = () => {

    const [filePaths, setFilePaths] = useState("");
    const [responseMessage, setResponseMessage] = useState(undefined);
    const [running, setRunning] = useState(false);

    const saveFilesToSelectedDirectory = (e) => {
        ipcRenderer.send('show-open-dialog', {"files": responseMessage.fileName});  
    }

    const viewFile = (e) => { ipcRenderer.send('view-file', responseMessage.fileName[0]); }

    const handleFileChange = (event) => {
        let paths = "";

        for(let i=0; i<event.target.files.length; i++){
            paths += event.target.files[i].path + "\n";       
        }
        setFilePaths(paths);
    }

    const runMergeTool = (event) => {
        setRunning(true);
        Service.runSurvivor(filePaths)
            .then(
                response => {
                    setRunning(false);
                    setResponseMessage(response);
                }
            )
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"2.5%", justifyContent:"center"}}>
            <h3 className="bp3-heading"> Merge SV</h3>
            <p style={{marginTop:"2%"}}>Load your SVs in VCF format</p>

            <div style={{display:"flex", flexDirection:"row",  alignItems:"center"}}> 
                <FileInput buttonText="Browse" style={{margin:"2%"}} text={filePaths}
                    onInputChange={handleFileChange} inputProps={{multiple: true}}
                    style={{width:"600px"}}/>
                <Tooltip content="At least 2 VCF files" position={Position.RIGHT} intent="warning">
                    <Icon icon="info-sign" intent="warning"/>
                </Tooltip> 
            </div>

            <Button text="Merge" disabled={running} onClick={runMergeTool} style={{marginTop:"4%"}}/>

            <div style={{display:"flex", flexDirection:"row", marginTop:"2%", width: "40%", justifyContent: "space-evenly"}}>
                <Button text="Save Output" onClick={saveFilesToSelectedDirectory}/>
                <Button text="View Output" onClick={viewFile}/>
            </div>
        </div>
    );
}

export default MergePage;