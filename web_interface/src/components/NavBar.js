import {
    Classes,
    Alignment,
    Button,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
} from "@blueprintjs/core";

const NavBar = () => {
    return (
        <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>AnGenoV</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
            <Button className={Classes.MINIMAL} text="Home" />
            <Button className={Classes.MINIMAL} text="Variant Calling" />
            <Button className={Classes.MINIMAL} text="Variant Annotation" />
            <NavbarDivider/>
            <Button className={Classes.MINIMAL} icon="document" text="Docs" />
        </NavbarGroup>
        </Navbar>
    );
  
}

export default NavBar;