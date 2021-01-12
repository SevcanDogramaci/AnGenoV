import { useState } from 'react';
import { Button, FileInput, Spinner } from "@blueprintjs/core";
import { Column, Table, Cell } from "@blueprintjs/table";
import axios from 'axios';

const VariantAnnotationPage = () => {
    const [VCFfileName, setVCFfileName] = useState("Choose File");
    const [variants, setVariants] = useState([]);
    const [isAnnotationDisabled, setAnnotationDisabled] = useState(false);

    async function getVariants(vcfFileName) {
        const response = await axios.get(`/get_variants?file=${vcfFileName}`);
        console.log("Response is ", response.data.variants);
        setAnnotationDisabled(false);
        return response.data.variants;
    }

    const handleAnnotation = () => {
        setAnnotationDisabled(true);
        getVariants(VCFfileName).then(result => setVariants(result));
    }

    const cellRenderer = (rowIndex, key) => {
        let rowVariant = variants[rowIndex]
        return  <Cell>{rowVariant[key]}</Cell>;
    };
        
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"2.5%", justifyContent:"center"}}>
            <h3 class="bp3-heading">Load Input</h3>
            <p>Load your variants in VCF format or by variant calling:</p>
            <FileInput buttonText="Browse" text={VCFfileName} 
                onInputChange={event => event.target.files[0] && setVCFfileName(event.target.files[0].name)}/>

            <Button style={{width:"10%", marginTop:"2.5%"}} disabled={isAnnotationDisabled}
                    onClick={handleAnnotation}>
                Annotate</Button>

            <h3 style={{marginTop:"2.5%"}} class="bp3-heading">Results</h3>

            {(Object.keys(variants).length > 0) ?
            <Table numRows={variants.length}>
                {
                    Object.keys(variants[0]).map(
                        (key, id) => {return <Column name={key} 
                                                cellRenderer={(r) => cellRenderer(r, key)}/>}
                    )
                }
            </Table> : 
            isAnnotationDisabled ? 
                <Spinner  /> :
                <p>No variants found</p>
            }
        </div>
    );
}

export default VariantAnnotationPage;