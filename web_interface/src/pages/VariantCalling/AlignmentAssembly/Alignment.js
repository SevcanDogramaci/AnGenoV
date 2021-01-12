import { useState} from 'react';
import { Button, FileInput, Checkbox, ControlGroup} from "@blueprintjs/core";

const sequenceTypes = ["Illumina", "PacBio / Oxford Nanopore"]

const AlignmentPage = () => {
    const [FASTQFileName, setFASTQfileName] = useState("Choose a FASTQ File");
    const [ReferenceFASTQFileName, setReferenceFASTQfileName] = useState("Choose reference FASTQ");

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop:"2.5%"}}>
            <h3 class="bp3-heading">Alignment</h3>
            <p style={{marginTop:"2%"}}>Load your sequence files</p>

            <div style={{display:"flex", flexDirection:"row", marginTop:"3%", justifyContent:"space-between", alignItems:"center"}}>
            <p style={{marginTop:"2%"}}>Sample File:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <Button text="Choose File"/>
            </div>

            <div style={{display:"flex", flexDirection:"row", marginTop:"2%", justifyContent:"space-between", alignItems:"center"}}>
            <p style={{marginTop:"2%"}}>Reference File:&nbsp;</p>
            <Button text="Choose File"/>
            </div>

            <div style={{marginTop:"5%"}}>
                { sequenceTypes.map((types, id) =>  {
                    return id < sequenceTypes.length ? 
                        <Checkbox key={id}>{types}</Checkbox> : <></>})}
            </div>

            <Button text="Generate" style={{marginTop:"2%"}}/>

            <div style={{display:"flex", flexDirection:"row",marginTop:"5%"}}>
                <Button text="Save Output"/>
                &nbsp;&nbsp;&nbsp;
                <Button text="View Output"/>
            </div>

            <Button text="Send Output into the Calling Step" style={{marginTop:"2%"}}/>




        </div>



    

    );

}

export default AlignmentPage;












