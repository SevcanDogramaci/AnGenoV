import React,  { useState, useContext }  from 'react';
import {
    Button,
    Menu,
    MenuItem,
    Popover,
    PopoverPosition,
    FileInput,
    RadioGroup,
    Radio,
    ContextMenuTarget
} from "@blueprintjs/core";

import { CallingContext } from './CallingContext';

const { Set } = require('immutable');

const Inputs = (props) => {

    const context = useContext(CallingContext);
    const [sampleFile, setSampleFile] = useState(undefined);
    const [referenceFile, setReferenceFile] = useState(undefined);

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
                    <MenuItem onClick={e => {
                                            if(context.readOption !== "Illumina") {
                                                console.log("Changing");
                                                context.setReadOption("Illumina"); 
                                                context.setCheckedCallers(Set())
                                            }
                                            }} text="Illumina" />
                    <MenuItem onClick={e => {
                                            if(context.readOption !== "PacBio") {
                                                console.log("Changing");
                                                context.setReadOption("PacBio"); 
                                                context.setCheckedCallers(Set())
                                            }
                                        }} text="PacBio/Oxford Nanopore"/>
                </Menu>} position={PopoverPosition.RIGHT_TOP}>
                <Button rightIcon="caret-down" text={context.readOption}/>
            </Popover>
            
             <div style={{marginTop: "10%"}}>
                <RadioGroup selectedValue={context.svType} onChange={(e) => {  context.setSvType(e.target.value); 
                                                context.setCheckedCallers(Set());
                                                console.log("on change")
                                            }} >
                     
                    <Radio label="SNP / INDEL" value="SNP / INDEL"/>
                    <Radio label="Genotyping" value="Genotyping"/>
                    <Radio label="SV Calling" value="SV Calling"/>
                </RadioGroup>
            </div> 

            {/* <div style={{marginTop: "10%"}}>
                <RadioGroup>
                    <Radio label="SNP Calling" onChange={e => {
                                                context.setSvType("SNP Calling"); 
                                                context.setCheckedCallers(Set())
                                            }}/>
                    <Radio label="Genotyping" onChange={e => {
                                                context.setSvType("Genotyping"); 
                                                context.setCheckedCallers(Set())
                                            }}/>
                    <Radio label="SV Calling" onChange={e => {
                                                context.setSvType("SV Calling"); 
                                                context.setCheckedCallers(Set())
                                            }}/>
                </RadioGroup>
            </div> */}

        </div>

    );
} 

export default Inputs;