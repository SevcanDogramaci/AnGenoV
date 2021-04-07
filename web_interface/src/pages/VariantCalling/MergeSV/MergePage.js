import React, { useState, useEffect } from 'react';
import { 
    Button, 
    Tooltip, 
    Position, 
    Icon,
    FileInput
} from "@blueprintjs/core";
import { 
    Column, 
    Table, 
    Cell 
} from "@blueprintjs/table";
import Service from '../../../services/Service';
import ReactDOM from 'react-dom';

const { Set } = require('immutable')
const { ipcRenderer } = require('electron');

const MergePage = () => {
    const [files, setFileList] = useState(Set())
    
    const [filePaths, setFilePaths] = useState("");
    const [responseMessage, setResponseMessage] = useState(undefined);
    const [running, setRunning] = useState(false);


    const saveFilesToSelectedDirectory = (e) => {
        ipcRenderer.send('show-open-dialog', {"files": responseMessage.fileName});  
    }

    const viewFile = (e) => { ipcRenderer.send('view-file', responseMessage.fileName[0]); }

    function removeList(path) {
        const newList = files.filter((item) => item !== path);
     
        setFileList(newList);
        console.log(files);
    }


    const handleFileChange = (event) => {
        console.log("onInputChange", event.target.files)
        let pathList = [];

        for(let i=0; i<event.target.files.length; i++){
            pathList.push(event.target.files[i].path) ;
        }
        console.log(pathList);
        setFileList(files.union(pathList));
        event.target.value = "";
    }

    const runMergeTool = (event) => {
        let paths = "";
        for(let i=0; i<files.size; i++){
            paths += files.toArray()[i] + "\n"; 
        } 

        setRunning(true);
        Service.runSurvivor(paths)
            .then(
                response => {
                    setRunning(false);
                    setResponseMessage(response);
                }
            )
    }

    return (
        <div id ="div" style={{display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"2.5%", justifyContent:"center"}}>
            <h3 className="bp3-heading"> Merge SV</h3>
            <p style={{marginTop:"2%"}}>Load your SVs in VCF format</p>

            <div style={{display:"flex", flexDirection:"row",  alignItems:"center"}}> 
                <FileInput id="fileInput" buttonText="Browse" style={{margin:"2%"}} text={filePaths}
                    onInputChange={handleFileChange} inputProps={{multiple: true}}
                    style={{width:"600px"}}/>
                <Tooltip content="At least 2 VCF files" position={Position.RIGHT} intent="warning">
                    <Icon icon="info-sign" intent="warning"/>
                </Tooltip> 
            </div>
            <div style={{height:"25%", display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"1%", marginBottom:"5%", justifyContent:"flex-start"}}>
                {console.log(files.size)}
                {(files.size > 0) ?
                    <ul>
                    {files.map((item) => (
                      <li style={{marginTop: "3%"}} key={item}><div  style={{display:"flex"}}> <div style={{alignItems:"left", width:"100%"}}>{item}</div> 
                      <div style={{alignItems:"right-bottom", width:"10%"}}><Button intent="danger" icon="trash" text="" onClick={() => removeList(item)}/></div></div></li>
                    ))}
                  </ul> 
                  : <></>
                }
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