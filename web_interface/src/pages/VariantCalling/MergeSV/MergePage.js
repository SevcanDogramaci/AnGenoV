import { useState } from 'react';
import { Button, Menu, MenuItem, Popover, Tooltip, Position, Icon, Intent,
    PopoverPosition, FileInput} from "@blueprintjs/core";

const MergePage = () => {
    const [VCFfileName, setVCFfileName] = useState("Choose VCF File");
    const [mergeTool, setMergeTool] = useState("Truvari");

    const updateMergeTool = (mergeTool) => {
        setMergeTool(mergeTool);
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"2.5%", justifyContent:"center"}}>
            <h3 class="bp3-heading"> Merge SV</h3>
            <p style={{marginTop:"2%"}}>Load your SVs in VCF format</p>
            <div style={{display:"flex", flexDirection:"row",  alignItems:"center"}}> <FileInput buttonText="Choose" text={VCFfileName}  style={{margin:"2%"}}
                           onInputChange={event => {
                               if (event.target.files[0])
                                    setVCFfileName(event.target.files[0].name);
                               }}/>
                <Tooltip content="At least 2 VCF files" position={Position.RIGHT} intent="warning">
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

            <Button text="Merge" style={{marginTop:"4%"}}/>
            <div style={{display:"flex", flexDirection:"row", marginTop:"2%"}}>
                <Button text="Save Output"/>
                &nbsp;&nbsp;&nbsp;
                <Button text="View Output"/>
            </div>
        </div>
    );
}



export default MergePage;