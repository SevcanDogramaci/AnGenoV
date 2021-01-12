import {useState} from "react";
import {
    Button,
    Menu,
    MenuItem,
    Popover,
    PopoverPosition,
    Checkbox,
} from "@blueprintjs/core";

const Inputs = (props) => {

    const [readOption, setReadOption] = useState("Method");

    const updateReadOption = readOption => {
        console.log(`${readOption} clicked`);
        setReadOption(readOption);
        props.updateReadOption(readOption);
    }

    return (

        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>

            <h3 class="bp3-heading">Input</h3>

            <p style={{marginTop:"2%"}}>Load your Input Files</p>
            <div style={{display:"flex", flexDirection:"row", marginTop:"4%", justifyContent:"space-between", alignItems:"center"}}>
            <p style={{marginTop:"2%"}}>Aligned File:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <Button text="Choose File"/>
            </div>
            &nbsp;&nbsp;
            <div style={{display:"flex", flexDirection:"row", marginTop:"1%", justifyContent:"space-between", alignItems:"center"}}>
            <p style={{marginTop:"2%"}}>Reference File:&nbsp;</p>
            <Button text="Choose File"/>
            </div>

            <p style={{marginTop:"7%"}}>Select Your Method :</p>

            
            <Popover  content={
                <Menu>
            
                        <MenuItem onClick={e => {updateReadOption("Illumina")}} text="Illumina" />
                        <MenuItem onClick={e => {updateReadOption("PacBio")}} text="PacBio/Oxford Nanopore"/>

                </Menu>} position={PopoverPosition.RIGHT_TOP}>
                <Button rightIcon="caret-down" text={readOption}/>
            </Popover>

            <div style={{marginTop: "2.5%"}}>
                <Checkbox label="SNP Calling"/>
                <Checkbox label="Genotyping" />
                <Checkbox label="SV Calling" />
            </div>
        </div>

    );
} 

export default Inputs;