import { Checkbox, Button, ControlGroup } from "@blueprintjs/core";

const SVCallingAlgorithms = ["Tardis", "Delly", "Lumpy", "Manta", "Smoove"]

const Outputs = () => {
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <h3 class="bp3-heading">Outputs</h3>

            <div style={{width:"50%"}}>
                { SVCallingAlgorithms.map((algorithm, id) =>  
                    <div style={{display:"flex", flexDirection:"row", marginTop:"2%",
                                justifyContent:"space-between", alignItems:"center"}}>
                        <p key={id}>{algorithm.toLowerCase().concat("Output.vcf")}</p>
                        <ControlGroup style={{display:"flex", alignItems:"center"}}>
                            <Checkbox></Checkbox>
                            <Button>View</Button>
                        </ControlGroup>
                    </div>)}
            </div>

            <div style={{width: "20%", marginTop: "1%"}}>
                <Button fill={true} onClick={e => console.log("Saving...")}>
                Save
                </Button>
            </div>

            <div style={{width: "50%", marginTop: "1%"}}>
                <Button fill={true} onClick={e => console.log("Saving...")}>
                Send to Merge Step
                </Button>
            </div>
        </div>
    );
}

export default Outputs;