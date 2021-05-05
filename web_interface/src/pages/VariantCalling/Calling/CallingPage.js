import React from 'react';
import { ControlGroup } from '@blueprintjs/core';

import Inputs from './Inputs/Inputs';
import Calling from './Calling/Calling';
import Outputs from './Outputs/Outputs';

const CallingPage = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				marginTop: '2.5%',
				alignItems: 'flex-start',
				justifyContent: 'space-between',
				width: '75%',
			}}
		>
			<ControlGroup fill={true}>
				<Inputs />
			</ControlGroup>

			<ControlGroup fill={true}>
				<Calling />
			</ControlGroup>

			<ControlGroup fill={true}>
				<Outputs />
			</ControlGroup>
		</div>
	);
};

export default CallingPage;
