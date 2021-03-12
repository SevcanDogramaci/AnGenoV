import React from 'react';
import ModuleCard from './components/ModuleCard';

const HomePage = () => {

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2.5%", justifyContent:"center"}}>
            
            <h1 className="bp3-heading">AnGenoV</h1>
            <p>Analysis of Genome Variants</p>

            <div style={{display:"flex", flexDirection:"row", marginTop:"2.5%", width:"75%",
                        alignItems:"flex-start", justifyContent:"space-around"}}>

                <ModuleCard name="Variant Calling Module"
                            explanation="Align and assembly sequences, call SVs in Illumina and long reads, merge SVs"
                            buttonText="Learn More"/>

                <ModuleCard name="Variant Annotation Module"
                            explanation="Annotate variants using the most popular databases"
                            buttonText="Learn More"/>

                <ModuleCard name="Variant Visualization Module"
                            explanation="Visualize variants"
                            buttonText="Learn More"/>
            </div>
        </div>
    );
} 

export default HomePage;
