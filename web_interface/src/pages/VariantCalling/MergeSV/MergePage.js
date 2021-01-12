import { useState } from 'react';
import { Button, Menu, MenuItem, Popover, Tooltip, Position, Icon, Intent,
    PopoverPosition, FileInput} from "@blueprintjs/core";

const MergePage = () => {
    const [VCFfileName, setVCFfileName] = useState("Choose VCF File");

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"2.5%", justifyContent:"center"}}>
            <h3 class="bp3-heading"> Merge SV</h3>
            <p style={{marginTop:"2%"}}>Load your SVs in VCF format</p>
            <div style={{display:"flex", flexDirection:"row",  alignItems:"center"}}> <FileInput buttonText="Choose" text={VCFfileName} 
                onInputChange={event => setVCFfileName(event.target.files[0].name)} style={{marginTop:"2%"}}/>
                <Tooltip content="At least 2 VCF files" position={Position.RIGHT} intent="warning">
                    <Icon icon="info-sign" intent="warning"/>
                </Tooltip> </div>

            <p style={{marginTop:"7%"}}>Select an algorithm</p>

            <Popover content={
                <Menu>
            
                        <MenuItem text="Truvari" />
                        <MenuItem text="SURVIVOR"/>

                </Menu>} position={PopoverPosition.BOTTOM}>
                <Button rightIcon="caret-down" text="Truvari"/>
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