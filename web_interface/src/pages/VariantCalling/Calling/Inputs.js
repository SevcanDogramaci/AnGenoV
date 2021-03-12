import React,  { useState, useEffect }  from 'react';
import {
    Button,
    Menu,
    MenuItem,
    Popover,
    PopoverPosition,
    Checkbox,
    FileInput
} from "@blueprintjs/core";

const Inputs = (props) => {

    const [readOption, setReadOption] = useState("Illumina");
    const [sampleFile, setSampleFile] = useState(undefined);
    const [referenceFile, setReferenceFile] = useState(undefined);

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

            <h3 className="bp3-heading">Input</h3>

            <p style={{marginTop:"2%"}}>Load your Input Files</p>

            <div style={{width: "75%"}}>
                <FileInput  style={{width: "100%"}}
                            buttonText="Browse" text={sampleFile !== undefined ? sampleFile.name : "Choose aligned file"} 
                            onInputChange={event => {setSampleFile(event.target.files[0]);
                                                    props.updateSampleFile(event.target.files[0].path)}}/> 
        
                <FileInput  style={{marginTop: "4%", width: "100%"}}
                            buttonText="Browse" text={referenceFile !== undefined ? referenceFile.name : "Choose reference file"} 
                            onInputChange={event => {setReferenceFile(event.target.files[0])
                                                    props.updateReferenceFile(event.target.files[0].path)}}/> 
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