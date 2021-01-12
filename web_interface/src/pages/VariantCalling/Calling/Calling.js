import { Checkbox, Button, ControlGroup } from "@blueprintjs/core";

const smallReadSVCallers = ["Tardis", "Delly", "Lumpy", "Manta", "Smoove"]
const longReadSVCallers = [ "Svim", "CuteSV", "Sniffles"]

const Calling = (props) => {
    const SVCallers = props.readOption == "Illumina" ? smallReadSVCallers : longReadSVCallers;

    async function updateRunning(e) {
        console.log("Running...");
        props.updateRunning(true);
        await new Promise(resolve => setTimeout(resolve, 2500)); // to imitate running
        props.updateRunning(false);
    }
    
    return (
        
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            {console.log(props.readOption)}
            <h3 class="bp3-heading">SV Calling</h3>
            <p>Choose the algorithms you want to run :</p>

            <div>

                { SVCallers.map((algorithm, id) =>  {
                    return id < SVCallers.length ? 
                        <Checkbox key={id}>{algorithm}</Checkbox> : <></>})}
                {/* <ControlGroup vertical={false}>
                    <Checkbox>Deneme</Checkbox>
                    <Button icon="plus" className="bp3-intent-primary" 
                        style={{borderRadius:"50%", marginLeft: "20%"}}/>
                </ControlGroup> */}
            </div>

            <div style={{width: "30%", marginTop: "1%"}}>
                <Button fill={true} icon="caret-right" onClick={e => updateRunning(e)}>
                Run
                </Button>
            </div>
        </div>
    );
}

export default Calling;