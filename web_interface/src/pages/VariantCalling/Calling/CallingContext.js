import React, { useReducer, useState } from 'react';

import { Set } from 'immutable';

import { CallingToolReducer } from './CallingReducer';

export const CallingContext = React.createContext(['light', () => {}]);

const CallingContextProvider = (props) => {
	const [callerToolsInfo, setCallerToolsInfo] = useReducer(CallingToolReducer, {
		svType: 'SV Calling',
		readOption: 'Illumina',
		checkedCallers: Set(),
	});

	const [runningInfo, setRunningInfo] = useState({
		running: false,
		responseMessages: undefined,
	});

	const [sampleFile, setSampleFile] = useState(undefined);
	const [referenceFile, setReferenceFile] = useState(undefined);

	const handleCallerToolsInfoChange = (type) => setCallerToolsInfo(type);
	const handleRunningInfoChange = (runningInfo) => setRunningInfo(runningInfo);
	const handleSampleFileChange = (sampleFile) => setSampleFile(sampleFile);
	const handleReferenceFileChange = (referenceFile) => setReferenceFile(referenceFile);

	return (
		<CallingContext.Provider
			value={{
				sampleFile,
				referenceFile,
				callerToolsInfo,
				runningInfo,

				setSampleFile: handleSampleFileChange,
				setReferenceFile: handleReferenceFileChange,
				setCallerToolsInfo: handleCallerToolsInfoChange,
				setRunningInfo: handleRunningInfoChange,
			}}
		>
			{props.children}
		</CallingContext.Provider>
	);
};

export default CallingContextProvider;
