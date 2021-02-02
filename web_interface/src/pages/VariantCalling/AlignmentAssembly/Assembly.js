import React from 'react';
import { useState } from 'react';
import { Button, Menu, MenuItem, Popover, Tooltip, Position, Icon, Intent,
    PopoverPosition, FileInput, Checkbox} from "@blueprintjs/core";

const AssemblyPage = () => {
    const [FASTQFileName, setFASTQfileName] = useState("Choose input files");

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop:"2.5%"}}>
            <h3 className="bp3-heading">Assembly</h3>
            <p style={{marginTop:"2%"}}>Load your sequence files </p>

            <div style={{display:"flex", flexDirection:"row",  alignItems:"center"}}> <Button text="Choose Files"/> &nbsp;&nbsp;
                                            <Tooltip content="At least 2 files (fasta, fastq)" position={Position.RIGHT} intent="warning">
                                            <Icon icon="info-sign"  intent={Intent.WARNING}/>
                                            </Tooltip> </div>

            <div style={{display:"flex", flexDirection:"row", marginTop:"1.5%", justifyContent:"space-between", alignItems:"center"}}>
            <p style={{marginTop:"5%"}}>Select an algorithm:&nbsp;&nbsp;&nbsp;</p>
            
            <Popover content={
                <Menu>
            
                        <MenuItem text="Flye" />

                </Menu>} position={PopoverPosition.BOTTOM}>
                <Button rightIcon="caret-down" text="Flye"/>
            </Popover>
            </div>

            <div style={{display:"flex", flexDirection:"row", marginTop:"1.5%", justifyContent:"space-between", alignItems:"center"}}>
                <p>Output format:&nbsp;&nbsp;&nbsp;</p>
                <Checkbox>fasta&nbsp;&nbsp;&nbsp;</Checkbox>
                <Checkbox>gfa|gv&nbsp;&nbsp;&nbsp;</Checkbox>
                <Checkbox>txt&nbsp;&nbsp;&nbsp;</Checkbox>
            </div>

            <Button text="Assemble" style={{marginTop:"2%"}}/>

            <div style={{display:"flex", flexDirection:"row",marginTop:"5%"}}>
                <Button text="Save Output"/>
                &nbsp;&nbsp;&nbsp;
                <Button text="View Output"/>
            </div>

            <Button text="Send Output into Alignment" style={{marginTop:"2%"}}/>

        </div>


    );

}

export default AssemblyPage;