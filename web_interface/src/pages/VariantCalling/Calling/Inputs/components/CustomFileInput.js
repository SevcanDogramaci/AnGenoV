import React from 'react';
import { FileInput } from '@blueprintjs/core';

const CustomFileInput = (props) => {
	const { file, placeholder, onFileChosen } = props;

	return (
		<FileInput
			style={{ marginTop: '4%', width: '100%' }}
			buttonText="Browse"
			text={file !== undefined ? file.name : `Choose ${placeholder} file`}
			onInputChange={(event) => event.target.files.length > 0 && onFileChosen(event.target.files[0])}
		/>
	);
};

export default CustomFileInput;
