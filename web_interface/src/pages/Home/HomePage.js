import {
    Button,
    Menu,
    MenuItem,
    Popover,
    PopoverPosition,
    Checkbox,
} from "@blueprintjs/core";

const HomePage = () => {

    return (

        <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2.5%", justifyContent:"center"}}>
            

            <h1 class="bp3-heading">AnGenoV</h1>
            <p>Analysis of Genome Variants</p>


            <div style={{display:"flex", flexDirection:"row", marginTop:"2.5%",
                    alignItems:"flex-start", justifyContent:"space-between",  width:"75%"}}>

            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <hr style={{color: "#d4d4d4",backgroundColor: "#d4d4d4",width: "100%",height:1,borderWidth: 0 }} />
            <h3>Variant Calling Module</h3>
            <p>Align and assembly sequences, call SVs<br></br>in Illumina and long reads, merge SVs</p>
            <Button text="Learn More"/>
            <hr style={{color: "#d4d4d4",backgroundColor: "#d4d4d4",width: "100%",height:1,borderWidth: 0, marginTop: "7.5%"}} />
            </div>
            
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <hr style={{color: "#d4d4d4",backgroundColor: "#d4d4d4",width: "100%",height:1,borderWidth: 0 }} />
            <h3>Variant Annotation Module</h3>
            <p>Annotate variants using <br></br>the most popular databases</p>
            <Button text="Learn More"/>
            <hr style={{color: "#d4d4d4",backgroundColor: "#d4d4d4",width: "100%",height:1,borderWidth: 0, marginTop: "7.5%"}} />
            </div>

            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <hr style={{color: "#d4d4d4",backgroundColor: "#d4d4d4",width: "100%",height:1,borderWidth: 0 }} />
            <h3>Variant Visualization Module</h3>
            <p>Visualize variants</p>
            <Button text="Learn More"/>
            <hr style={{color: "#d4d4d4",backgroundColor: "#d4d4d4",width: "100%",height:1,borderWidth: 0, marginTop: "7.5%" }} />
            </div>

            </div>
          
        </div>

    );
} 

export default HomePage;