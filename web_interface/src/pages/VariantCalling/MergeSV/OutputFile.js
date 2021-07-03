import React from 'react';
import { Button } from '@blueprintjs/core';

import { saveToDir, view } from '../util/FileManipulations';

const OutputFile = (props) => {
	const { outputFiles } = props;

	const saveFilesToSelectedDirectory = (e) => saveToDir(outputFiles.returnObject);

	const viewFile = (e) => view(outputFiles.returnObject[0]);

	if (!outputFiles) return <></>;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				marginTop: '2%',
				justifyContent: 'space-evenly',
			}}
		>
			<p>{outputFiles.message}</p>
			{outputFiles.returnObject.length ? 
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					marginTop: '2%',
					justifyContent: 'center',
				}}
			>
				<Button text="Save Output" onClick={saveFilesToSelectedDirectory} />
				<Button text="View Output" onClick={viewFile} />
			</div> : <div></div>}
		</div> 
	);
};

export default OutputFile;
