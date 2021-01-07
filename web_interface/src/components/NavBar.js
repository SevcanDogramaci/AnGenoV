import {
    Alignment,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
} from "@blueprintjs/core";

import NavButton from "./NavButton";

const NavBar = () => {

    return (
        <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>AnGenoV</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
            <NavButton to='/home' name="Home"/>
            <NavButton to='/calling' name="Variant Calling"/>
            <NavButton to='/annotation' name="Variant Annotation"/>
            <NavbarDivider/>
            <NavButton to='/docs' name="Docs" icon="document" />
        </NavbarGroup>
        </Navbar>
    );
}

export default NavBar;