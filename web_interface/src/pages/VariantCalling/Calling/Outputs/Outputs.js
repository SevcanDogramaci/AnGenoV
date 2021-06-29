import React, { useState, useContext } from 'react';

import { Button, Pre } from '@blueprintjs/core';
import { Set } from 'immutable';

import { CallingContext } from '../CallingContext';

import RunningText from './components/RunningText';
import OutputFile from './components/OutputFile';
import { saveToDir } from '../../util/FileManipulations';

const isFinished = (context) => context.running === false && !context.responseMessages;
const isRunning = (context) => context.running === false && context.responseMessages;

const Outputs = (props) => {
	const context = useContext(CallingContext);
	const [checkedOutputFiles, setCheckedOutputFiles] = useState(Set());

	const saveFilesToSelectedDirectory = () => {
		const fileNames = checkedOutputFiles.toArray();
		saveToDir(fileNames);
	};

	const handleOutputFileChanged = (filePath, checked) => {
		if (checked) setCheckedOutputFiles(checkedOutputFiles.add(filePath));
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'flex-start',
				height: '75vh',
			}}
		>
			<h3 className="bp3-heading">Outputs</h3>

			{/* Show nothing when no tools running */}
			{isFinished(context.runningInfo) ? (
				<p>No outputs</p>
			) : (
				/* Show logs while running */
				<>
					<div
						style={{
							display: 'flex',
							alignSelf: 'stretch',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						<Pre style={{ display: 'flex', flexDirection: 'column', maxWidth: '33vw', overflow: 'auto' }}>
						{!isRunning(context.runningInfo) && <RunningText stop={context.runningInfo.running === false} />}
							{isRunning(context.runningInfo) &&
								context.runningInfo.responseMessages.message.map((element, id) => <div>{element}</div>)}
						</Pre>
					</div>

					{/* Show files when running finishes */}
					{isRunning(context.runningInfo) && (
						<>
							<div style={{ width: '50%' }}>
								{console.log(
									'OutputFile >>>',
									context.runningInfo.responseMessages,
									context.runningInfo.responseMessages.returnObject
								)}
								{context.runningInfo.responseMessages.returnObject.map((fileName, id) => (
									<OutputFile onOutputFileChecked={handleOutputFileChanged} filePath={fileName} />
								))}
							</div>

							<div style={{ width: '50%', marginTop: '1%' }}>
								{context.runningInfo.responseMessages.returnObject.length ? (
									<Button
										fill
										onClick={(e) => {
											console.log('Saving...');
											saveFilesToSelectedDirectory();
										}}
									>
										Save
									</Button>
								) : <p></p>}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Outputs;
