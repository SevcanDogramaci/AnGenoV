import { useState } from 'react';
import { Button, Menu, MenuItem, Popover,
    PopoverPosition, FileInput, Checkbox} from "@blueprintjs/core";

const AssemblyPage = () => {
    const [FASTQFileName, setFASTQfileName] = useState("Choose input files");

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop:"2.5%"}}>
            <h3 class="bp3-heading">Assembly</h3>
            <p style={{marginTop:"2%"}}>Load your sequences in FASTA or FASTQ format</p>

            <FileInput buttonText="Choose" text={FASTQFileName} style={{marginTop:"2%"}}
                onInputChange={event => setFASTQfileName(event.target.files[0].name)}/>

            <p style={{marginTop:"5%"}}>Select an algorithm</p>

            <Popover content={
                <Menu>
            
                        <MenuItem text="Flye" />

                </Menu>} position={PopoverPosition.BOTTOM}>
                <Button rightIcon="caret-down" text="Flye"/>
            </Popover>

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