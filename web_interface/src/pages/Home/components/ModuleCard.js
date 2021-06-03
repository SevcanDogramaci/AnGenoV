import React from 'react';
import { Button } from '@blueprintjs/core';

const UpperHr = (
	<hr
		style={{
			color: '#d4d4d4',
			backgroundColor: '#d4d4d4',
			width: '100%',
			height: 1,
			borderWidth: 0,
		}}
	/>
);
const LowerHr = (
	<hr
		style={{
			color: '#d4d4d4',
			backgroundColor: '#d4d4d4',
			width: '100%',
			height: 1,
			borderWidth: 0,
			marginTop: '7.5%',
		}}
	/>
);

const ModuleCard = (props) => {
	const { name, explanation, buttonText, link } = props;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '25%',
				textAlign: 'center',
			}}
		>
			{UpperHr}
			<h3>{name}</h3>
			<p>{explanation}</p>
			<a target="_blank" href={link} rel="noreferrer">
				<Button text={buttonText} />
			</a>			
			{LowerHr}
		</div>
	);
};

export default ModuleCard;
