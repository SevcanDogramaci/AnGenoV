import React from 'react';
import { Button } from '@blueprintjs/core';

const MergeFilesList = (props) => {
	const { files, onRemoveFile } = props;

	if (!files) return <></>;

	return (
		<div
			style={{
				height: '25%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				marginTop: '1%',
				marginBottom: '5%',
				justifyContent: 'flex-start',
			}}
		>
			{files.size > 0 && (
				<ul>
					{files.map((file) => (
						<li key={file}>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								{file}
								<Button minimal intent="danger" icon="trash" onClick={() => onRemoveFile(file)} />
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MergeFilesList;
