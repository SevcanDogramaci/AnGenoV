import React from 'react';
import { Classes, Button,} from "@blueprintjs/core";
import { NavLink } from "react-router-dom";

const NavButton = (props) => {

    return (
        <Button icon={props.icon} className={Classes.MINIMAL}>
            <NavLink  style={{color: "#5C7080"}} 
                      activeStyle={{fontWeight: "bold",}} 
                      to={props.to}>{props.name}</NavLink>
        </Button>
    );
}

export default NavButton;