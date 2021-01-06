import {
    Classes,
    Button,
    Menu,
    MenuItem,
    Popover,
    PopoverPosition,
    Checkbox,
} from "@blueprintjs/core";

const Inputs = () => {

    return (

        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>

            <h3 class="bp3-heading">Input</h3>
            <p>Load Your Alignment in BAM Format</p>
            <Button text="Choose File"/>


            <p style={{marginTop:"2.5%"}}>Select Your Method :</p>

            <Popover content={
                <Menu>
            
                        <MenuItem text="Illumina" />
                        <MenuItem text="PacBio/Oxford Nanopore"/>

                </Menu>} position={PopoverPosition.RIGHT_TOP}>
                <Button rightIcon="caret-down" text="Method"/>
            </Popover>

            <div style={{marginTop: "2.5%"}}>
                <Checkbox label="SNP Calling"/>
                <Checkbox label="Genotyping" />
                <Checkbox label="SV Calling" />
            </div>
        </div>

    );
} 

export default Inputs;