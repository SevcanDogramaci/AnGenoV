import React from 'react';
import { ControlGroup } from '@blueprintjs/core';

import Inputs from './Inputs/Inputs';
import Calling from './Calling/Calling';
import Outputs from './Outputs/Outputs';

const CallingPage = () => (
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
		<ControlGroup fill>
			<Inputs />
		</ControlGroup>

		<ControlGroup fill>
			<Calling />
		</ControlGroup>

		<ControlGroup fill>
			<Outputs />
		</ControlGroup>
	</div>
);

export default CallingPage;
