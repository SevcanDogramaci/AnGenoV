import React from 'react';
import { Overlay, Spinner } from '@blueprintjs/core';

const SpinnerStyle = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	height: '20%',
	width: '20%',
	marginTop: '40vh',
	marginLeft: '40vw',
	backgroundColor: 'white',
};

const TextStyle = {
	color: '#546370',
};

const CustomSpinner = (props) => {
	const { text } = props;

	return (
		<Overlay isOpen>
			<div style={SpinnerStyle}>
				<Spinner large />
				<h4 style={TextStyle}>{text}...</h4>
			</div>
		</Overlay>
	);
};

export default CustomSpinner;
