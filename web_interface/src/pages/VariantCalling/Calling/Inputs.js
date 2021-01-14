import {useState, useEffect} from "react";
import {
    Button,
    Menu,
    MenuItem,
    Popover,
    PopoverPosition,
    Checkbox,
} from "@blueprintjs/core";

const Inputs = (props) => {

    const [readOption, setReadOption] = useState("Illumina");

    useEffect(() => {
        props.updateReadOption(readOption);
    }, [])

    const updateReadOption = readOption => {
        console.log(`${readOption} clicked`);
        setReadOption(readOption);
        props.updateReadOption(readOption);
    }

    return (

        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>

            <h3 class="bp3-heading">Input</h3>

            <p style={{marginTop:"2%"}}>Load your Input Files</p>

            <div>
                <div style={{display:"flex", flexDirection:"row", marginTop:"4%", justifyContent:"space-between", alignItems:"center"}}>
                    <p>Aligned File :</p>
                    <Button text="Choose File"/>
                </div>
                <div style={{display:"flex", flexDirection:"row", marginTop:"4%", justifyContent:"space-between", alignItems:"center"}}>
                    <p>Reference File :</p>
                    <Button text="Choose File"/>
                </div>
            </div>

            <p style={{marginTop:"10%"}}>Select Your Method :</p>
            <Popover  content={
                <Menu>
                    <MenuItem onClick={e => {updateReadOption("Illumina")}} text="Illumina" />
                    <MenuItem onClick={e => {updateReadOption("PacBio")}} text="PacBio/Oxford Nanopore"/>
                </Menu>} position={PopoverPosition.RIGHT_TOP}>
                <Button rightIcon="caret-down" text={readOption}/>
            </Popover>

            <div style={{marginTop: "10%"}}>
                <Checkbox label="SNP Calling"/>
                <Checkbox label="Genotyping" />
                <Checkbox label="SV Calling" />
            </div>
        </div>

    );
} 

export default Inputs;