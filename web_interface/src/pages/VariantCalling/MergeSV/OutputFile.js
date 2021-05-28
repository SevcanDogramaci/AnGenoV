import React from 'react';
import { Button } from '@blueprintjs/core';

import { saveToDir, view } from '../util/FileManipulations';

const OutputFile = (props) => {
	const { outputFiles } = props;

	const saveFilesToSelectedDirectory = (e) => saveToDir(outputFiles.fileName);

	const viewFile = (e) => view(outputFiles.fileName[0]);

	if (!outputFiles) return <></>;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				marginTop: '2%',
				width: '40%',
				justifyContent: 'space-evenly',
			}}
		>
			<Button text="Save Output" onClick={saveFilesToSelectedDirectory} />
			<Button text="View Output" onClick={viewFile} />
		</div>
	);
};

export default OutputFile;
