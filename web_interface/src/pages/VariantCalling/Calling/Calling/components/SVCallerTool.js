import React, { useState } from 'react';
import { TextArea, Button, Popover, Intent } from '@blueprintjs/core';

const { ipcRenderer } = require('electron');

const SVCallerTool = (props) => {
	const { tool, onRefresh, deletable } = props;

	const [tooglePopover, setTogglePopover] = useState(false);
	const [params, setParams] = useState(tool.lastUsedParams);
	const [outName, setOutName] = useState(tool.outputName);

	const updateToolConfig = (parameters, outputName) => {
		if ((parameters != tool.lastUsedParams) | (outputName != tool.outputName)) {
			const config = {
				toolName: tool.name,
				params: parameters,
				outName: outputName,
			};

			console.log('Config >> ', config);

			ipcRenderer.invoke('update-config-file', config).then((result) => {
				console.log('HERE', result);
				setTogglePopover(false);
				onRefresh();
			});
		}
	};

	const deleteTool = () => {
		const config = { toolName: tool.name };

		ipcRenderer.invoke('delete-config-file', config).then((result) => onRefresh());
	};

	const resetParamsToDefault = (event) => {
		updateToolConfig(null, null);
	};
	const saveParamsToConfig = (event) => {
		updateToolConfig(params, outName);
	};
	const closeWithoutSave = (event) => {
		setTogglePopover(true);
		setParams(tool.lastUsedParams);
	};
	const updateOutputName = (event) => {
		event.target.value !== '' ? setOutName(event.target.value) : setOutName(tool.outputName);
	};
	const updateParams = (event) => {
		event.target.value !== '' ? setParams(event.target.value) : setParams(tool.lastUsedParams);
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{deletable && tool.name}

			<Popover position="right-top" isOpen={tooglePopover} usePortal canEscapeKeyClose>
				<Button minimal small icon="settings" style={{ marginLeft: 5 }} onClick={closeWithoutSave} />

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						padding: 10,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<p style={{ fontWeight: 'bold', margin: 0 }}>{tool.name} Parameters</p>
						<Button minimal small icon="small-cross" onClick={(e) => setTogglePopover(false)} />
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'left',
							justifyContent: 'center',
						}}
					>
						<p style={{ margin: 0 }}>Parameters and their usage can be found </p>
						<p style={{ margin: 0 }}>on the related tool's documentation page </p>
						<p
							style={{
								margin: 5,
								fontSize: 12,
								fontWeight: 'bold',
							}}
						>
							Output Name:
							<input
								className="bp3-input"
								fill
								small
								defaultValue={tool.outputName}
								onChange={(e) => updateOutputName(e)}
							/>
						</p>
						<TextArea
							id="deneme"
							fill
							small
							growVertically
							defaultValue={tool.lastUsedParams}
							onChange={(e) => updateParams(e)}
						/>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<div>
							<Button
								minimal
								small
								intent={Intent.SUCCESS}
								icon="saved"
								style={{ margin: 5 }}
								onClick={saveParamsToConfig}
							>
								Save
							</Button>
							<Button
								minimal
								small
								intent={Intent.DANGER}
								icon="refresh"
								style={{ margin: 5 }}
								onClick={resetParamsToDefault}
							>
								Reset
							</Button>
							{deletable && (
								<Button
									minimal
									small
									intent={Intent.DANGER}
									icon="trash"
									style={{ margin: 5 }}
									onClick={deleteTool}
								>
									Delete
								</Button>
							)}
						</div>
					</div>
				</div>
			</Popover>
		</div>
	);
};

export default SVCallerTool;
