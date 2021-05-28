import React, { useState, useContext, useEffect } from 'react';
import { Button } from '@blueprintjs/core';

import Service from '../../../../services/Service';
import { CallingContext } from '../CallingContext';

import NewSVCallerTool from './components/NewSVCallerTool';
import SVCallerToolsList from './components/SVCallerToolsList';
import { readConfig } from '../../util/FileManipulations';

const Calling = (props) => {
	const context = useContext(CallingContext);

	async function updateRunning(e) {
		console.log(
			'Running with files >>',
			context.sampleFile,
			context.referenceFile,
			context.callerToolsInfo.checkedCallers.toList().toArray()
		);
		context.setRunningInfo({ ...context.setRunningNew, running: true });

		Service.runSelectedTools(
			{ sample: context.sampleFile.path, ref: context.referenceFile.path },
			context.callerToolsInfo.checkedCallers
		).then((response) => {
			console.log('Response >> ', response);
			context.setRunningInfo({
				running: false,
				responseMessages: response,
			});
		});
	}

	const refreshPage = () => {
		readConfig().then((result) => {
			console.log(result);

			const { tools } = result;
			const filteredTools = {};

			Object.keys(tools)
				.filter(
					(tool) =>
						tools[tool].readType === context.callerToolsInfo.readOption &&
						tools[tool].svType === context.callerToolsInfo.svType
				)
				.forEach((tool) => (filteredTools[tool] = tools[tool]));

			setSVCallerTools(filteredTools);
		});
	};

	const [SVCallerTools, setSVCallerTools] = useState(null);

	useEffect(() => {
		refreshPage();
	}, [, context.callerToolsInfo.readOption, context.callerToolsInfo.svType]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<h3 className="bp3-heading">SV Calling</h3>
			<p>Choose the algorithms you want to run :</p>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<SVCallerToolsList tools={SVCallerTools} onRefresh={refreshPage} />
			</div>

			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignSelf: 'flex-end',
					width: '25%',
				}}
			>
				<NewSVCallerTool onRefresh={refreshPage} />
			</div>

			<div style={{ width: '30%', marginTop: '10%' }}>
				<Button
					disabled={
						!context.referenceFile ||
						!context.sampleFile ||
						!context.callerToolsInfo.checkedCallers.size ||
						context.running
					}
					fill
					icon="caret-right"
					onClick={updateRunning}
				>
					{' '}
					Run{' '}
				</Button>
			</div>
		</div>
	);
};

export default Calling;
