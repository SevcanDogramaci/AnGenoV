import React from 'react';
import { NavLink } from "react-router-dom";
import { 
    Classes, 
    Button 
} from "@blueprintjs/core";

const NavButton = (props) => {

    return (
        <Button icon={props.icon} className={Classes.MINIMAL}>
            <NavLink  exact style={{color: "#5C7080"}} 
                      activeStyle={{fontWeight: "bold",}} 
                      to={props.to}>{props.name}</NavLink>
        </Button>
    );
}

export default NavButton;