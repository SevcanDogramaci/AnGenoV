import React, { useState, useEffect } from 'react';
import { Checkbox, Button, ControlGroup, Spinner } from '@blueprintjs/core';

const { ipcRenderer } = require('electron');

const extractFileName = (filePath) => {
	let splittedFileName = filePath.split('/');
	return splittedFileName[splittedFileName.length - 1];
};

const OutputFile = (props) => {
	const [filePath, setFilePath] = useState(null);

	useEffect(() => {
		setFilePath(props.filePath);
	}, []);

	const viewFile = () => {
		console.log('View clicked!', filePath);
		ipcRenderer.send('view-file', filePath);
	};

	if (filePath === null) return <Spinner />;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				marginTop: '2%',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<p>{extractFileName(filePath)}</p>
			<ControlGroup style={{ display: 'flex', alignItems: 'center' }}>
				<Checkbox
					onChange={(e) =>
						props.onOutputFileChecked(filePath, e.target.checked)
					}
				></Checkbox>
				<Button onClick={viewFile}>View</Button>
			</ControlGroup>
		</div>
	);
};

export default OutputFile;
