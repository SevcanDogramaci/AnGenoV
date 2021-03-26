import React, { useState, useEffect }  from 'react';
import { 
    Checkbox, 
    Button, 
    ControlGroup, 
} from "@blueprintjs/core";

const { ipcRenderer } = require('electron')

const OutputFile = (props) => {

    const [filePath, setFilePath] = useState(null);
    const [fileName, setFileName] = useState(null);

    useEffect(() => {
        setFilePath(props.filePath);

        let splittedFileName = props.filePath.split("/");
        let fileName = splittedFileName[splittedFileName.length - 1];
        setFileName(fileName);
    }, []);

    const viewFile = () => {
        console.log(fileName, filePath);
        ipcRenderer.send('view-file', filePath);
    }

    return (
        <div style={{display:"flex", flexDirection:"row", marginTop:"2%",
                justifyContent:"space-between", alignItems:"center"}}>
            <p>{fileName}</p>
            <ControlGroup style={{display:"flex", alignItems:"center"}}>
                <Checkbox onChange={e => props.onOutputFileChecked(filePath, e.target.checked)}></Checkbox>
                <Button onClick={e => {console.log("View clicked!"); viewFile();}}>View</Button>
            </ControlGroup>
        </div>
    );
}

export default OutputFile;