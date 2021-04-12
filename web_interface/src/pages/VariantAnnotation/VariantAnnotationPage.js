import React, { useState } from 'react';
import { 
    Button, 
    FileInput, 
    Spinner, 
    Checkbox,
    InputGroup,
    Intent
} from "@blueprintjs/core";
import { 
    Column, 
    Table, 
    Cell,
    SelectionModes,
    TableLoadingOption
} from "@blueprintjs/table";
import Service from '../../services/Service';
import IgvVisualizer from './components/IgvVisualizer';

const { Set } = require('immutable');

const VariantAnnotationPage = () => {
    const [variants, setVariants] = useState([]);
    const [VCFfile, setVCFfile] = useState(null);

    const [isShowVariantsDisabled, setShowVariantsDisabled] = useState(false);
    const [isAllSelected, setAllSelected] =  useState(false);

    const [selectedVariants, setSelectedVariants] =  useState(Set());
    const [variantFilter, setVariantFilter] = useState(undefined);
    const [filteredVariants, setFilteredVariants] = useState(undefined);
    const [loading, setLoading] = useState(null);

    const handleShowVariants = () => {
        setShowVariantsDisabled(true);
        Service.getVariants(VCFfile.path)
            .then(result => {
                setShowVariantsDisabled(false);
                setVariants(result);
            });
    }

    const cellRenderer = (rowIndex, key, variants) => {
        let rowVariant = variants[rowIndex];
        return  <Cell>{rowVariant[key]}</Cell>;
    };

    const editableCellRenderer = (rowIndex) => {

        let variantID = variants[rowIndex].id;
            
        if(filteredVariants)
            variantID = filteredVariants[rowIndex].id;



        return <Cell style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Checkbox key={rowIndex} 
                    checked={selectedVariants.includes(variantID)}
                    onChange={e => {
                    console.log("Checked", rowIndex);


                    console.log(rowIndex, variantID)
                    
                    let is_checked = e.target.checked;

                    if (is_checked) 
                        setSelectedVariants(selectedVariants.add(variantID));
                    else 
                        setSelectedVariants(selectedVariants.delete(variantID));

                    }}></Checkbox>
        </Cell>
    };

    const handleFileChange = (event) => {
        console.log("VCF file chosen >>", event.target.files[0].name);
        
        setVCFfile(event.target.files[0])
    }

    const Filter = <div style={{display:"flex",width:"100%", alignItems:"center",justifyContent:"center", marginBottom: "1%"}}>
        <InputGroup placeholder="Filter variants" fill={true} value={variantFilter}
                    onChange={e => {console.log(e.target.value); setVariantFilter(e.target.value)}}/>
        <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
            <Button minimal={true} intent={Intent.PRIMARY} icon="filter" 
                onClick={e => 
                   { let filtered = variants.filter(variant => variant.chrom == variantFilter);
                     console.log(filtered);
                     setLoading(TableLoadingOption.CELLS);
                    setFilteredVariants(filtered);
                    setLoading(null);}
                }>Filter</Button>
            <Button minimal={true} icon="reset" intent={Intent.DANGER}
                onClick={ e =>{  
                    setLoading(TableLoadingOption.CELLS);
                    setFilteredVariants(undefined);
                    setLoading(null);
                    setVariantFilter("");
                }

                }></Button>
        </div>
    </div>

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"2.5%", justifyContent:"center"}}>
            <h3 className="bp3-heading">Load Input</h3>
            <p>Load your variants in VCF format or by variant calling:</p>
            <FileInput buttonText="Browse" text={VCFfile ? VCFfile.name : "Choose file"} 
                onInputChange={handleFileChange}/> 

            <div style={{width: "20%", marginTop:"2.5%", display:"flex", alignItems:"center", justifyContent:"space-around"}}>
                <Button style={{width:"45%"}} disabled={isShowVariantsDisabled}
                    onClick={handleShowVariants}>
                Show</Button>
                <Button style={{width:"45%"}} 
                    onClick={e => {
                        console.log("Annotate variants with ids ", selectedVariants.toList().toArray());
                        Service.annotateSelectedVariants(VCFfile.path, selectedVariants.toList())
                        .then(result => {
                            console.log("Filtered Variants are taken as a result !");
                        });
                        }}>
                Annotate</Button>
            </div>

            <h3 style={{marginTop:"2.5%"}} className="bp3-heading">Results</h3>

            <div style={{height:"400px", display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"1%", marginBottom:"5%", justifyContent:"flex-start"}}>
                {(Object.keys(variants).length > 0) ?
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                    {Filter}
                    <Table loadingOptions={loading} numRows={filteredVariants ? filteredVariants.length : variants.length} selectionModes={SelectionModes.COLUMNS_ONLY}
                     onSelection={e => {

                        let selected_col_id = e[0].cols[0];

                        if (selected_col_id && selected_col_id == (Object.keys(variants[0]).length)) {

                            let currentVariants = filteredVariants ? filteredVariants : variants;

                            if(isAllSelected){
                                setSelectedVariants(Set());
                                setAllSelected(false);
                                return;
                            }
    
                            let variantIDs = currentVariants.map(variant => variant.id)
                            console.log(variantIDs);
    
                            setSelectedVariants(Set(variantIDs));
                            setAllSelected(true)
                        }}}>
                        {
                            Object.keys(variants[0]).map(
                                (key, id) => {return <Column name={key} 
                                                        cellRenderer={(r) => cellRenderer(r, key, filteredVariants ? filteredVariants : variants)}/>}
                            )
                        }
                        { <Column name="select all" cellRenderer={r => editableCellRenderer(r)}/>}
                    </Table> 
                    </div>
                    : isShowVariantsDisabled ? 
                        <Spinner  /> :
                        <p>No variants found</p>
                        // <IgvVisualizer/>
                }
            </div>
        </div>
    );
}

export default VariantAnnotationPage;