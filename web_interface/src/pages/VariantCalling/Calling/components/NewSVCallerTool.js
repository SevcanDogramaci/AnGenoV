import React,  { useState, useContext }  from 'react';
import { 
    TextArea, 
    Button, 
    Popover,
    Intent,
} from "@blueprintjs/core";
import { CallingContext } from '../CallingContext';


const { ipcRenderer } = require('electron');

const NewSVCallerTool = (props) => {

    const [name, setName] = useState(null);
    const [tooglePopover, setTogglePopover] = useState(false);
    const [params, setParams] = useState(null);
    const context = useContext(CallingContext);
    const { onRefresh } = props;

    const updateToolConfig = (params) => {

        const config = {
            "toolName": name,
            "params": params,
            "readType": context.readOption
        }

        ipcRenderer.invoke("update-config-file", config)
            .then((result) => {
                console.log(result);
                setTogglePopover(false);
                onRefresh();
        })
    }

    const saveParamsToConfig = () => { updateToolConfig(params); }

    return (
        <Popover position={'right-top'} isOpen={tooglePopover} usePortal={true} canEscapeKeyClose={true}>             
            <Button intent={Intent.PRIMARY} small={true} style={{borderRadius: "50%"}} icon="plus"  onClick={e => setTogglePopover(true)}/>    
            
            <div style={{display:"flex", flexDirection:"column", justifyContent: "center", padding: 10}}> 
                <div style={{display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                    <p style={{fontWeight: "bold", margin:0 }}>New SV Caller</p>
                    <Button minimal={true} small={true} icon="small-cross" onClick={e => setTogglePopover(false)}/>
                </div>

                <div style={{display:"flex", flexDirection:"column", alignItems: "left", justifyContent: "center"}}>
                    <input style={{marginTop: "5%"}} type="text" class="bp3-input" placeholder="Tool Name" onChange={e => setName(e.target.value)}/>
                    <TextArea style={{marginTop: "5%"}} fill={true} small={true} growVertically={true} placeholder="Default parameters" onChange={e => setParams(e.target.value)}/>
                </div>

                <div style={{display: "flex", alignItems: "center",  justifyContent: "flex-end"}}>
                    <Button minimal={true} small={true} intent={Intent.PRIMARY} icon="small-tick" style={{margin: 5}} onClick={saveParamsToConfig}>Add</Button>
                </div>
            </div>
        </Popover>
    );
} 

export default NewSVCallerTool;