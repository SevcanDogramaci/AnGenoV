import React from 'react';
import { NavLink } from 'react-router-dom';
import { Classes, Button } from '@blueprintjs/core';

const StepButton = (props) => {
	const color = props.isActive ? '#5C7080' : '#C4C4C4';
	const buttonStyle = {
		background: color,
		borderRadius: '50%',
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<NavLink style={{ color: '#C4C4C4' }} to={props.to}>
				<Button
					style={buttonStyle}
					onClick={() => props.onClick(props.name)}
					className={Classes.MINIMAL}
				/>
			</NavLink>

			<p style={{ color: color, marginBottom: 0 }}>{props.name}</p>
		</div>
	);
};

export default StepButton;
