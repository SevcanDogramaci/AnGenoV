import React, { useContext } from 'react';
import { Checkbox } from '@blueprintjs/core';

import { CallingContext } from '../../CallingContext';
import SVCallerTool from './SVCallerTool';

const SVCallerToolsList = (props) => {
	const { tools, onRefresh } = props;
	const context = useContext(CallingContext);

	const handleSVCallerChecked = (e, name) => {
		const is_checked = e.target.checked;

		if (is_checked) context.setCallerToolsInfo({ type: 'add', name });
		else context.setCallerToolsInfo({ type: 'delete', name });
		console.log('CheckedCallers >>', context.callerToolsInfo);
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
			<div>
				{tools &&
					Object.keys(tools).map((key, id) => (
						<Checkbox
							onChange={(e) => handleSVCallerChecked(e, key)}
							key={key}
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<SVCallerTool tool={tools[key]} onRefresh={onRefresh} deletable />
						</Checkbox>
					))}
			</div>
		</div>
	);
};

export default SVCallerToolsList;
