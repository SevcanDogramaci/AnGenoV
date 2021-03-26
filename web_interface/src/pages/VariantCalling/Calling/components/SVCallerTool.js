import React,  { useState }  from 'react';
import { 
    TextArea, 
    Button, 
    Popover,
    Intent,
} from "@blueprintjs/core";

const { ipcRenderer } = require('electron');

const SVCallerTool = (props) => {

    const { tool, name, onRefresh } = props;
    const [tooglePopover, setTogglePopover] = useState(false);
    const [params, setParams] = useState(tool.lastUsedParams);
    const [outName, setOutName] = useState(tool.outputName);

    const updateToolConfig = (params, outName) => {

        const config = {
            "toolName": name,
            "params": params,
            "outName": outName
        }

        console.log("Config >> ", config);

        ipcRenderer.invoke("update-config-file", config)
            .then((result) => {
                console.log(result);
                setTogglePopover(false);
                onRefresh();
        })
    }

    const deleteTool = () => {

        const config = { "toolName": name }

        ipcRenderer.invoke("delete-config-file", config)
            .then((result) => {
                console.log(result);
                setTogglePopover(false);
                onRefresh();
        })
    }

    const resetParamsToDefault = () => { updateToolConfig(null); }
    const saveParamsToConfig = () => { updateToolConfig(params, outName); }
    const closeWithoutSave = (event) => { setTogglePopover(true); setParams(tool.lastUsedParams); }
    const updateOutputName = (event) => { event.target.value !== "" ? setOutName(event.target.value) : setOutName(tool.outputName) }
    const updateParams = (event) => { event.target.value !== "" ? setParams(event.target.value) : setParams(tool.lastUsedParams) }

    return (
        <div style={{display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "center"}}>
            {name}
            
            <Popover position={'right-top'} isOpen={tooglePopover} usePortal={true} canEscapeKeyClose={true}>             
                <Button minimal={true} small={true} icon="settings" style={{marginLeft: 5}} onClick={closeWithoutSave}/>
                
                <div style={{display:"flex", flexDirection:"column", justifyContent: "center", padding: 10}}> 
                    <div style={{display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                        <p style={{fontWeight: "bold", margin:0 }}>{name} Parameters</p>
                        <Button minimal={true} small={true} icon="small-cross" onClick={e => setTogglePopover(false)}/>
                    </div>

                    <div style={{display:"flex", flexDirection:"column", alignItems: "left", justifyContent: "center"}}>
                        <p style={{margin:0}}>Parameters and their usage can be found </p> 
                        <p style={{margin:0}}>on the related tool's documentation page </p> 
                        <p style={{margin:5, fontSize:12, fontWeight:"bold"}}>Output Name: 
                            <input class="bp3-input" fill={true} small={true} defaultValue={tool.outputName} onChange={e => updateOutputName(e)}/>
                        </p>
                        <TextArea fill={true} small={true} growVertically={true} defaultValue={tool.lastUsedParams} onChange={e => updateParams(e)}/>
                    </div>

                    <div style={{display: "flex", alignItems: "center",  justifyContent: "center"}}>
                        <div>
                            <Button minimal={true} small={true} intent={Intent.SUCCESS} icon="saved" style={{margin: 5}} onClick={saveParamsToConfig}>Save</Button>
                            <Button minimal={true} small={true} intent={Intent.DANGER} icon="refresh" style={{margin: 5}} onClick={resetParamsToDefault}>Reset</Button>
                            <Button minimal={true} small={true} intent={Intent.DANGER} icon="trash" style={{margin: 5}} onClick={deleteTool}>Delete</Button>
                        </div>
                    </div>
                </div>
            </Popover>
        </div>

    );
} 

export default SVCallerTool;