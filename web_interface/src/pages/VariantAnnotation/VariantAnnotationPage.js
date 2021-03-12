import React, { useState } from 'react';
import { 
    Button, 
    FileInput, 
    Spinner 
} from "@blueprintjs/core";
import { 
    Column, 
    Table, 
    Cell 
} from "@blueprintjs/table";
import Service from '../../services/Service';

const VariantAnnotationPage = () => {
    const [VCFfileName, setVCFfileName] = useState("Choose File");
    const [variants, setVariants] = useState([]);
    const [isAnnotationDisabled, setAnnotationDisabled] = useState(false);
    const [VCFfile, setVCFfile] = useState(null);

    const handleAnnotation = () => {
        setAnnotationDisabled(true);
        Service.getVariants(VCFfile.path)
            .then(result => {
                setAnnotationDisabled(false);
                setVariants(result);
            });
    }

    const cellRenderer = (rowIndex, key) => {
        let rowVariant = variants[rowIndex]
        return  <Cell>{rowVariant[key]}</Cell>;
    };

    const handleFileChange = (event) => {
        console.log("VCF file chosen >>", event.target.files[0].name);
        
        setVCFfile(event.target.files[0])
        setVCFfileName(event.target.files[0].name);
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"2.5%", justifyContent:"center"}}>
            <h3 className="bp3-heading">Load Input</h3>
            <p>Load your variants in VCF format or by variant calling:</p>
            <FileInput buttonText="Browse" text={VCFfileName ? VCFfileName : "Choose file"} 
                onInputChange={handleFileChange}/> 

            <Button style={{width:"10%", marginTop:"2.5%"}} disabled={isAnnotationDisabled}
                    onClick={handleAnnotation}>
                Annotate</Button>

            <h3 style={{marginTop:"2.5%"}} className="bp3-heading">Results</h3>

            <div style={{height:"400px", display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"1%", marginBottom:"5%", justifyContent:"flex-start"}}>
                {(Object.keys(variants).length > 0) ?
                    <Table numRows={variants.length}>
                        {
                            Object.keys(variants[0]).map(
                                (key, id) => {return <Column name={key} 
                                                        cellRenderer={(r) => cellRenderer(r, key)}/>}
                            )
                        }
                    </Table> 
                    : isAnnotationDisabled ? 
                        <Spinner  /> :
                        <p>No variants found</p>
                }
            </div>
        </div>
    );
}

export default VariantAnnotationPage;