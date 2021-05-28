import React from 'react';
import { NavLink } from 'react-router-dom';
import { Classes, Button } from '@blueprintjs/core';

const NavButton = (props) => {
	const { icon, name, to } = props;

	return (
		<Button icon={icon} className={Classes.MINIMAL}>
			<NavLink exact style={{ color: '#5C7080' }} activeStyle={{ fontWeight: 'bold' }} to={to}>
				{name}
			</NavLink>
		</Button>
	);
};

export default NavButton;
