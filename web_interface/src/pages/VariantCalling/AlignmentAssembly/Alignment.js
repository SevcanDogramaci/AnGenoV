import { useState} from 'react';
import { Button, FileInput, Checkbox} from "@blueprintjs/core";

const AlignmentPage = () => {
    const [FASTQFileName, setFASTQfileName] = useState("Choose a FASTQ File");
    const [ReferenceFASTQFileName, setReferenceFASTQfileName] = useState("Choose reference FASTQ");

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop:"2.5%"}}>
            <h3 class="bp3-heading">Alignment</h3>
            <p style={{marginTop:"2%"}}>Load your sequences in FASTQ format</p>

            <div style={{display:"flex", flexDirection:"row", marginTop:"2%"}}>
            <FileInput buttonText="Choose" text={FASTQFileName} 
                onInputChange={event => setFASTQfileName(event.target.files[0].name)}/>
            &nbsp;&nbsp;&nbsp;
            <FileInput buttonText="Choose" text={ReferenceFASTQFileName} 
            onInputChange={event => setReferenceFASTQfileName(event.target.files[0].name)}/>
            </div>

            <div style={{display:"flex", flexDirection:"row", marginTop:"5%", justifyContent:"space-between", alignItems:"center"}}>
                <Checkbox>Short Read</Checkbox>
                &nbsp;&nbsp;&nbsp;
                <Checkbox>Long Read</Checkbox>
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












