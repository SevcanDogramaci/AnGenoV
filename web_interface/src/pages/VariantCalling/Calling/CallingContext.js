import React, { useState } from 'react'
const { Set, List } = require('immutable');

export const CallingContext = React.createContext(["light", () => {}]);

const CallingContextProvider = (props) => {

    const [running, setRunning] = useState(undefined);
    const [readOption, setReadOption] = useState("Illumina");
    const [svType, setSvType] = useState("SV Calling");

    const [sampleFile, setSampleFile] = useState(undefined);
    const [referenceFile, setReferenceFile] = useState(undefined);
    const [checkedCallers, setCheckedCallers] = useState(Set()); 
    const [responseMessages, setResponseMessages] = useState(null)

    const handleRunningChange = (isRunning) => setRunning(isRunning);
    const handleReadOptionChange = (readOption) => setReadOption(readOption);
    const handleSvTypeChange = (svType) => setSvType(svType);
    const handleSampleFileChange = (sampleFile) => setSampleFile(sampleFile);
    const handleReferenceFileChange = (referenceFile) => setReferenceFile(referenceFile);
    const handleCheckedCallersChange = (newCheckedCallers) => {
        if(running === false)
            setRunning(undefined);
        setCheckedCallers(newCheckedCallers);
        console.log("checkedCallers", checkedCallers);
    }
    const handleResponseMessageChange = (newResponseMessage) => {
        setResponseMessages(newResponseMessage);
    }

  
    return (
        <CallingContext.Provider value={{
            running,
            readOption,
            checkedCallers,
            responseMessages,
            svType,

            setReadOption: handleReadOptionChange,
            setSvType: handleSvTypeChange,
            setRunning: handleRunningChange,
            setCheckedCallers: handleCheckedCallersChange,
            setResponseMessages: handleResponseMessageChange,
        }}>
            {props.children}
        </CallingContext.Provider >
    )
  }

export default CallingContextProvider;