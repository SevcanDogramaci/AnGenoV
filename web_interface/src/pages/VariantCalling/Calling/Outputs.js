import React, { useState, useEffect }  from 'react';
import { 
    Checkbox, 
    Button, 
    ControlGroup, 
    Pre, 
    Collapse 
} from "@blueprintjs/core";

const { ipcRenderer } = require('electron')

const Outputs = (props) => {

    const [logs, setLogs] = useState("");
    const [logsOpen, setLogsOpen] = useState(true);

    useEffect(() => {

        ipcRenderer.on('log-file-reply', (event, arg) => {
            if (arg != undefined) {
                setLogs(arg["data"]);

                if (!props.isRunning)
                    setLogsOpen(false);
            }
        });
    }, []);

    return (
       
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-start", height:"75vh"}}>
         {console.log("Algorithms >>", props.algorithms)}
            <h3 className="bp3-heading">Outputs</h3>

            {/* Show nothing when no tools running */}
            {props.isRunning === undefined ? <p>No outputs</p> :

            /* Show logs while running */
            <>
                {props.isRunning === false &&
                <Button onClick={e => setLogsOpen(!logsOpen)}>{logsOpen ? "Hide" : "Show"} build logs</Button>}

                <div style={{overflowY:"scroll",  alignSelf: 'stretch'}}>
                    <Collapse isOpen={props.isRunning ? true : logsOpen} style={{height: 100}}>
                        <Pre> {logs} </Pre>
                    </Collapse>
                </div>
                
                {/* Show files when running finishes */}
                {props.isRunning === false &&
                <>  
                    <div style={{width:"50%"}}>
                        { props.algorithms.map((algorithm, id) =>  
                            <div style={{display:"flex", flexDirection:"row", marginTop:"2%",
                                        justifyContent:"space-between", alignItems:"center"}}>
                                <p key={id}>{algorithm.toLowerCase().concat("Output.vcf")}</p>
                                <ControlGroup style={{display:"flex", alignItems:"center"}}>
                                    <Checkbox></Checkbox>
                                    <Button>View</Button>
                                </ControlGroup>
                            </div>)}
                    </div>

                    <div style={{width: "50%", marginTop: "1%"}}>
                        <Button fill={true} onClick={e => console.log("Saving...")}>
                            Save
                        </Button>
                    </div>

                    <div style={{width: "50%", marginTop: "1%"}}>
                        <Button fill={true} onClick={e => console.log("Saving...")}>
                            Send to Merge Step
                        </Button>
                    </div> 
                </>}
            </>}
        </div>
    );
}

export default Outputs;