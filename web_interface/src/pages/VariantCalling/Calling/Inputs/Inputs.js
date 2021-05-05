import React, { useContext } from 'react';

import { CallingContext } from '../CallingContext';

import CustomFileInput from './components/CustomFileInput';
import ReadOptionMenu from './components/ReadOptionMenu';
import SVTypeRadioGroup from './components/SVTypeRadioGroup';

const Inputs = (props) => {
	const context = useContext(CallingContext);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<h3 className="bp3-heading">Input</h3>

			<p style={{ marginTop: '2%' }}>Load your Input Files</p>

			<div style={{ width: '75%' }}>
				<CustomFileInput
					placeholder="sample"
					file={context.sampleFile}
					onFileChosen={context.setSampleFile}
				/>
				<CustomFileInput
					placeholder="reference"
					file={context.referenceFile}
					onFileChosen={context.setReferenceFile}
				/>
			</div>

			<p style={{ marginTop: '10%' }}>Select Your Method :</p>
			<ReadOptionMenu />

			<div style={{ marginTop: '10%' }}>
				<SVTypeRadioGroup
					value={context.callerToolsInfo.svType}
					onRadioChosen={context.setCallerToolsInfo}
				/>
			</div>
		</div>
	);
};

export default Inputs;
