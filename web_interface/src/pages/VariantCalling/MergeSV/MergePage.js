import React, { useState, useEffect } from 'react';
import { 
    Button, 
    Tooltip, 
    Position, 
    Icon,
    FileInput,
    Popover,
    TextArea,
    Intent
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

const MergePage = (props) => {
    const [files, setFileList] = useState(Set())
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

   
    
    const [tool, setTool]  = useState("");
    const [params, setParams] = useState(tool.lastUsedParams);
    const [outName, setOutName] = useState(tool.outputName);
    

    const [tooglePopover, setTogglePopover] = useState(false);
    
    const updateToolConfig = (params, outName) => {

        const config = {
            "toolName": "Survivor",
            "params": params,
            "outName": outName
        }

        console.log("Config >> ", config);
        
        ipcRenderer.invoke("update-config-file", config)
            .then((result) => {
                console.log(result);
                setTogglePopover(false);
                refreshPage();
        })
    }

    const resetParamsToDefault = () => { updateToolConfig(null); }
    const saveParamsToConfig = () => { updateToolConfig(params, outName); }
    const closeWithoutSave = (event) => { setTogglePopover(true); setParams(tool.lastUsedParams); }
    const updateOutputName = (event) => { event.target.value !== "" ? setOutName(event.target.value) : setOutName(tool.outputName) }
    const updateParams = (event) => { event.target.value !== "" ? setParams(event.target.value) : setParams(tool.lastUsedParams) }

    const refreshPage = () => {
        ipcRenderer.invoke("read-config-file")
            .then((result) => {
                let r = result["tools"];
                setTool(r["Survivor"]);
            })
    }

    const [SVCallerTools, setSVCallerTools] = useState(null);

    useEffect(() => { 
        refreshPage();
    }, []);



    return (
        <div id ="div" style={{display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"2.5%", justifyContent:"center"}}>
            <h3 className="bp3-heading"> Merge SV</h3>
            <p style={{marginTop:"2%"}}>Load your SVs in VCF format</p>

            <div style={{display:"flex", flexDirection:"row",  alignItems:"center"}}> 
                <FileInput id="fileInput" buttonText="Browse" style={{margin:"2%"}}
                    onInputChange={handleFileChange} inputProps={{multiple: true}}
                    style={{width:"600px"}}/>
                <Tooltip content="At least 2 VCF files" position={Position.RIGHT} intent="warning">
                    <Icon icon="info-sign" intent="warning"/>
                </Tooltip> 

                <Popover position={'right-top'} isOpen={tooglePopover} usePortal={true} canEscapeKeyClose={true}>            
                <Button minimal={true} small={true} icon="settings" style={{marginLeft: 5}} onClick={closeWithoutSave}/>
                
                <div style={{display:"flex", flexDirection:"column", justifyContent: "center", padding: 10}}> 
                    <div style={{display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                        <p style={{fontWeight: "bold", margin:0 }}>{tool.name} Parameters</p>
                        <Button minimal={true} small={true} icon="small-cross" onClick={e => setTogglePopover(false)}/>
                    </div>

                    <div style={{display:"flex", flexDirection:"column", alignItems: "left", justifyContent: "center"}}>
                        <p style={{margin:5, fontSize:12, fontWeight:"bold"}}>Output Name: 
                            <input className="bp3-input" fill={true} small={true} defaultValue={tool.outputName} onChange={e => updateOutputName(e)}/>
                        </p>
                        <TextArea fill={true} small={true} growVertically={true} defaultValue={tool.lastUsedParams} onChange={e => updateParams(e)}/>
                    </div>

                    <div style={{display: "flex", alignItems: "center",  justifyContent: "center"}}>
                        <div>
                            <Button minimal={true} small={true} intent={Intent.SUCCESS} icon="saved" style={{margin: 5}} onClick={saveParamsToConfig}>Save</Button>
                            <Button minimal={true} small={true} intent={Intent.DANGER} icon="refresh" style={{margin: 5}} onClick={resetParamsToDefault}>Reset</Button>
                        </div>
                    </div>
                </div>
            </Popover>
            </div>
            <div style={{height:"25%", display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"1%", marginBottom:"5%", justifyContent:"flex-start"}}>
                {console.log(files.size)}
                {console.log(tool)}
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