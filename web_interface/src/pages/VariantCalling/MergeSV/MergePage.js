import React, { useState, useEffect, useReducer } from 'react';
import { Button, Tooltip, Position, Icon, FileInput } from '@blueprintjs/core';

import Service from '../../../services/Service';
import { MergeReducer } from './MergeReducer';

import SVCallerTool from '../Calling/Calling/components/SVCallerTool';
import MergeFilesList from './MergeFilesList';
import OutputFile from './OutputFile';
import { readConfig } from '../util/FileManipulations';

const { Set } = require('immutable');

const mergeToolName = 'SURVIVOR';

const MergePage = (props) => {
	const [files, setFileList] = useReducer(MergeReducer, Set());
	const [runningInfo, setRunningInfo] = useState({
		isRunning: false,
		responseMessage: undefined,
	});
	const [tool, setTool] = useState(null);

	useEffect(() => {
		refreshPage();
	}, []);

	const removeList = (path) => setFileList({ type: 'remove', path });

	const handleFileChange = (event) => {
		setFileList({ type: 'add', paths: Array.from(event.target.files) });
		event.target.value = '';
	};

	const runMergeTool = (event) => {
		setRunningInfo({ ...runningInfo, isRunning: true });
		Service.runSurvivor(files.toArray()).then((response) => {
			setRunningInfo({
				isRunning: false,
				responseMessage: response,
			});
		});
	};

	const refreshPage = () => {
		readConfig().then((result) => {
			const r = result.tools;
			setTool(r[mergeToolName]);
		});
	};

	return (
		<div
			id="div"
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				marginTop: '2.5%',
				justifyContent: 'center',
			}}
		>
			<h3 className="bp3-heading"> Merge SV</h3>
			<p style={{ marginTop: '2%' }}>Load your variants in VCF format</p>

			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<FileInput
					id="fileInput"
					buttonText="Browse"
					style={{ margin: '2%', width: '600px', marginRight: '1%' }}
					onInputChange={handleFileChange}
					inputProps={{ multiple: true }}
				/>
				<Tooltip content="At least 2 VCF files" position={Position.RIGHT} intent="warning">
					<Icon icon="info-sign" intent="warning" />
				</Tooltip>

				{tool && <SVCallerTool tool={tool} onRefresh={refreshPage} />}
			</div>

			<MergeFilesList files={files} onRemoveFile={removeList} />

			<Button
				text="Merge"
				disabled={!files.size || runningInfo.isRunning}
				onClick={runMergeTool}
				style={{ marginTop: '2%' }}
			/>

			<OutputFile outputFiles={runningInfo.responseMessage} />
		</div>
	);
};

export default MergePage;
