import React, { useContext } from 'react';

import { CallingContext } from '../CallingContext';

import CustomFileInput from './components/CustomFileInput';
import ReadOptionMenu from './components/ReadOptionMenu';
import SVTypeRadioGroup from './components/SVTypeRadioGroup';
import {Tooltip, Position, Icon} from '@blueprintjs/core';

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

			<div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", verticalAlign:"middle", width: '75%' }}>
				<div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
				<CustomFileInput placeholder="sample" file={context.sampleFile} onFileChosen={context.setSampleFile} inputProps={{accept: ".bam, .cram"}} />
				&nbsp;&nbsp;
				<Tooltip content="'.bam' or '.cram' files" position={Position.RIGHT} intent="primary">
					<Icon style={{verticalAlign:"middle"}} icon="help" intent="primary" />
				</Tooltip></div>

				<div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
				<CustomFileInput
					placeholder="reference"
					file={context.referenceFile}
					onFileChosen={context.setReferenceFile}
					inputProps={{accept: ".fa, .fasta"}}
				/>
				&nbsp;&nbsp;
				<Tooltip content="'.fa' or '.fasta' files" position={Position.RIGHT} intent="primary">
					<Icon style={{verticalAlign:"middle"}} icon="help" intent="primary" />
				</Tooltip></div>
				
			</div>

			<p style={{ marginTop: '10%' }}>Select Your Method :</p>
			<ReadOptionMenu />

			<div style={{ marginTop: '10%' }}>
				<SVTypeRadioGroup value={context.callerToolsInfo.svType} onRadioChosen={context.setCallerToolsInfo} />
			</div>
		</div>
	);
};

export default Inputs;
