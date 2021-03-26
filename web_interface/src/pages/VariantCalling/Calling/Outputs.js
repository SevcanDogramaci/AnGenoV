import React, { useState, useContext }  from 'react';
import { 
    Button, 
    Pre, 
} from "@blueprintjs/core";
import RunningText from './components/RunningText';
import { CallingContext } from './CallingContext';
import OutputFile from './components/OutputFile';

const { ipcRenderer } = require('electron');
const { Set } = require('immutable');

const Outputs = (props) => {

    const context = useContext(CallingContext);
    const [checkedOutputFiles, setCheckedOutputFiles] = useState(Set());

    const saveFilesToSelectedDirectory = () => {

        let fileNames = checkedOutputFiles.toArray();
        console.log(fileNames);
        ipcRenderer.send('show-open-dialog', {"files": fileNames});  
    }

    const viewFile = (fileName) => {
        console.log(fileName);
        ipcRenderer.send('view-file', fileName);
    }

    const handleOutputFileChanged = (filePath, checked) => {
        console.log("handleOutputFileChanged !", filePath, checked);
        if(checked) {
            setCheckedOutputFiles(checkedOutputFiles.add(filePath));
        }
    }

    return (
       
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-start", height:"75vh"}}>

         {console.log("Algorithms >>", context.checkedCallers)}

            <h3 className="bp3-heading">Outputs</h3>

            {/* Show nothing when no tools running */}
            {context.running === undefined ? <p>No outputs</p> :

            /* Show logs while running */
            <>
                <div style={{display:"flex",alignSelf: 'stretch', flexDirection: "column", justifyContent: "center"}}>
                    <Pre style={{display: "flex", flexDirection: "column"}}>
                        {<RunningText stop={context.running === false}/>}
                        {context.running === false && context.responseMessages.message.map((element, id) => <div>
                            {element}
                        </div>)}
                    </Pre>
                </div>
                
                {/* Show files when running finishes */}
                {context.running === false &&
                <>     
                    <div style={{width:"50%"}}>
                    {console.log("OutputFile >>>", context.responseMessages, context.responseMessages.fileName)}
                        {

                            context.responseMessages.fileName.map((fileName, id) =>
                            <OutputFile 
                                onOutputFileChecked={handleOutputFileChanged} 
                                filePath={fileName} />
                        )}
                    </div>

                    <div style={{width: "50%", marginTop: "1%"}}>
                        <Button fill={true} onClick={e => {
                            console.log("Saving..."); 
                            saveFilesToSelectedDirectory();}}>
                            Save
                        </Button>
                    </div>

                </>}
            </>}
        </div>
    );
}

export default Outputs;