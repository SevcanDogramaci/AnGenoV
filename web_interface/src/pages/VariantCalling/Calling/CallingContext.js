import React, { useState } from 'react'
const { Set } = require('immutable');

export const CallingContext = React.createContext(["light", () => {}]);

const CallingContextProvider = (props) => {

    const [running, setRunning] = useState(undefined);
    const [readOption, setReadOption] = useState("Illumina");
    const [checkedCallers, setCheckedCallers] = useState(Set()); 
    const [responseMessages, setResponseMessages] = useState(null)

    const handleRunningChange = (isRunning) => setRunning(isRunning);
    const handleReadOptionChange = (readOption) => setReadOption(readOption);
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

            setReadOption: handleReadOptionChange,
            setRunning: handleRunningChange,
            setCheckedCallers: handleCheckedCallersChange,
            setResponseMessages: handleResponseMessageChange,
        }}>
            {props.children}
        </CallingContext.Provider >
    )
  }

export default CallingContextProvider;