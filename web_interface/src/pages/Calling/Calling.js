import { Checkbox, Button, ControlGroup } from "@blueprintjs/core";

const SVCallingAlgorithms = ["Tardis", "Delly", "Lumpy", "Manta", "Smoove"]

const Calling = () => {
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <h3 class="bp3-heading">SV Calling</h3>
            <p>Choose the algorithms you want to run :</p>

            <div>
                { SVCallingAlgorithms.map((algorithm, id) =>  {
                    return id < SVCallingAlgorithms.length ? 
                        <Checkbox key={id}>{algorithm}</Checkbox> : <></>})}
                <ControlGroup vertical={false}>
                    <Checkbox>Deneme</Checkbox>
                    <Button icon="plus" className="bp3-intent-primary" 
                        style={{borderRadius:"50%", marginLeft: "20%"}}/>
                </ControlGroup>
            </div>

            <div style={{width: "30%", marginTop: "1%"}}>
                <Button fill={true} icon="caret-right" onClick={e => console.log("Running...")}>
                Run
                </Button>
            </div>
        </div>
    );
}

export default Calling;