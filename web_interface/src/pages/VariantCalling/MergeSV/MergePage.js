import React, { useState } from 'react';
import { 
    Button, 
    Menu, 
    MenuItem, 
    Popover, 
    Tooltip, 
    Position, 
    Icon,
    PopoverPosition, 
    FileInput
} from "@blueprintjs/core";

import Service from '../../../services/Service';

const MergePage = () => {
    const [VCFfile, setVCFfile] = useState(undefined);
    const [mergeTool, setMergeTool] = useState("Truvari");

    const updateMergeTool = (mergeTool) => { setMergeTool(mergeTool);}

    const handleFileChange = (event) => {

        if (event.target.files[0]) {
            setVCFfile(event.target.files[0]);
        }
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"2.5%", justifyContent:"center"}}>
            <h3 className="bp3-heading"> Merge SV</h3>
            <p style={{marginTop:"2%"}}>Load your SVs in VCF format</p>
            <div style={{display:"flex", flexDirection:"row",  alignItems:"center"}}> 
                    <FileInput buttonText="Browse" text={VCFfile == undefined ? "Choose file" : VCFfile.name}  style={{margin:"2%"}}
                                onInputChange={handleFileChange}/>
                <Tooltip content="At least 2 VCF files or 1 path file" position={Position.RIGHT} intent="warning">
                    <Icon icon="info-sign" intent="warning"/>
                </Tooltip> </div>

            <p style={{marginTop:"7%"}}>Select an algorithm</p>

            <Popover content={
                <Menu>
                    <MenuItem text="Truvari" onClick={e => updateMergeTool("Truvari")}/>
                    <MenuItem text="SURVIVOR" onClick={e => updateMergeTool("SURVIVOR")}/>
                </Menu>} position={PopoverPosition.BOTTOM}>
                <Button rightIcon="caret-down" text={mergeTool}/>
            </Popover>

            <Button text="Merge" onClick={e => Service.runSurvivor(VCFfile.path).then(res => console.log(res))}
                     style={{marginTop:"4%"}}/>
            <div style={{display:"flex", flexDirection:"row", marginTop:"2%"}}>
                <Button text="Save Output"/>
                &nbsp;&nbsp;&nbsp;
                <Button text="View Output"/>
            </div>
        </div>
    );
}

export default MergePage;