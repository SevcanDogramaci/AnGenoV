import {useEffect, useState} from 'react';
import { Button, FileInput } from "@blueprintjs/core";
import { Column, Table } from "@blueprintjs/table";
import axios from 'axios';

async function getVariants(vcfFileName) {
    const response = await axios.get("/get_variants");
    console.log("Response is ", response.data)
    return response.data;
  }

const AnnotationPage = () => {
    const [VCFfileName, setVCFfileName] = useState("Choose File");
    const [variants, setVariants] = useState([]);

    const handleAnnotation = () => {
        getVariants(VCFfileName).then(result => setVariants(result));
    }
        
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"2.5%", justifyContent:"center"}}>
            <h3 class="bp3-heading">Load Input</h3>
            <p>Load your variants in VCF format or by variant calling:</p>
            <FileInput buttonText="Browse" text={VCFfileName} 
                onInputChange={event => setVCFfileName(event.target.files[0].name)}/>
            <Button style={{width:"10%", marginTop:"2.5%"}} onClick={handleAnnotation}>Annotate</Button>

            <h3 style={{marginTop:"2.5%"}} class="bp3-heading">Results</h3>
            <Table numRows={5}>
                <Column />
                <Column />
                <Column />
            </Table>
        </div>
    );
}

export default AnnotationPage;