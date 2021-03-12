import React from 'react';
import { 
    ControlGroup
} from "@blueprintjs/core";

import Alignment from "./Alignment"
import Assembly from "./Assembly"

const AlignmentAssemblyPage = () => {
    return (
        <div style={{display:"flex", flexDirection:"row", marginTop:"2.5%",
                    alignItems:"flex-start", justifyContent:"space-between", width:"75%"}}>
            <ControlGroup fill={true}>
                <Alignment/>
            </ControlGroup>
            <ControlGroup fill={true}>
                <Assembly/>
            </ControlGroup>
        </div>
    );
}

export default AlignmentAssemblyPage;