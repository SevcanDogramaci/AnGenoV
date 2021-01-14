import { useState} from 'react';
import { Button, Checkbox, Tooltip, Position, Icon, Intent} from "@blueprintjs/core";

const sequenceTypes = ["Illumina", "PacBio / Oxford Nanopore"]
const sequenceInfo = {"Illumina" : "Short Read, uses BWA-MEM algorithm.", "PacBio / Oxford Nanopore" : "Long Read, uses Minimap2 algorithm."}

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
                &nbsp;&nbsp;
                <Tooltip content="fasta, fastq" position={Position.RIGHT} intent={Intent.WARNING}>
                    <Icon icon="info-sign" intent={Intent.WARNING}/>
                </Tooltip>                       
            </div>

            <div style={{display:"flex", flexDirection:"row", marginTop:"2%", justifyContent:"space-between", alignItems:"center"}}>
                <p style={{marginTop:"2%"}}>Reference File:&nbsp;</p>
                <Button text="Choose File"/> 
                &nbsp;&nbsp;
                <Tooltip content="fasta, fa" position={Position.RIGHT} intent={Intent.WARNING}>
                    <Icon icon="info-sign" intent={Intent.WARNING}/>
                </Tooltip>  
            </div>

            <div style={{marginTop:"5%"}}>
                { sequenceTypes.map((types, id) =>  {
                    return id < sequenceTypes.length ? 
                    <div style={{display:"flex", flexDirection:"row"}}>   
                        <Checkbox key={id}>{types}</Checkbox>
                        &nbsp;&nbsp;
                        <Tooltip content={sequenceInfo[types]} position={Position.RIGHT} intent = {Intent.PRIMARY}>
                            <Icon icon="help" intent = {Intent.PRIMARY}/>
                        </Tooltip> 
                    </div>: <></>} )} 
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












