import React, { useContext } from 'react';
import { Button, Menu, MenuItem, Popover, PopoverPosition } from '@blueprintjs/core';

import { CallingContext } from '../../CallingContext';

const menuItems = ['Illumina', 'PacBio/Oxford Nanopore'];

const ReadOptionMenu = (props) => {
	const context = useContext(CallingContext);

	const handleMenuItemChange = (itemName) => {
		if (context.callerToolsInfo.readOption !== itemName) {
			console.log('Changing');
			context.setCallerToolsInfo({
				type: 'update-read',
				readOption: itemName.split('/')[0],
			});
		}
	};

	return (
		<Popover
			content={
				<Menu>
					{menuItems.map((menuItem) => (
						<MenuItem onClick={(e) => handleMenuItemChange(e.target.innerText)} text={menuItem} />
					))}
				</Menu>
			}
			position={PopoverPosition.RIGHT_TOP}
		>
			<Button rightIcon="caret-down" text={context.callerToolsInfo.readOption} />
		</Popover>
	);
};

export default ReadOptionMenu;
