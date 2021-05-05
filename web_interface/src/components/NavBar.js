import React from 'react';
import {
	Button,
	Alignment,
	Navbar,
	NavbarDivider,
	NavbarGroup,
	NavbarHeading,
} from '@blueprintjs/core';

import NavButton from './NavButton';

const NavBar = () => {
	return (
		<Navbar>
			<NavbarGroup align={Alignment.LEFT}>
				<NavbarHeading>AnGenoV</NavbarHeading>
			</NavbarGroup>
			<NavbarGroup align={Alignment.RIGHT}>
				<NavButton to="/" name="Home" />
				<NavButton to="/calling" name="Variant Calling" />
				<NavButton to="/annotation" name="Variant Annotation" />
				<NavbarDivider />
				<a
					target="_blank"
					href="https://github.com/SevcanDogramaci/AnGenoV"
				>
					<Button text="Docs" icon="document" />
				</a>
			</NavbarGroup>
		</Navbar>
	);
};

export default NavBar;
