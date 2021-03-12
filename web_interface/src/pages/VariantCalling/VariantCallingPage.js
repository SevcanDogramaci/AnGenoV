import React, { useState }  from 'react';

import AlignmentAssemblyPage from './AlignmentAssembly/AlignmentAssemblyPage';
import CallingPage from "./Calling/CallingPage";
import MergePage from "./MergeSV/MergePage";
import Stepper from './components/Stepper';

const VariantCallingPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const stepNames = ["Alignment | Assembly", "Calling", "Merge SV"]

    const handleStepClick = (stepName) => {
        console.log("onStepClick !");
        setCurrentStep(stepNames.indexOf(stepName));
    }
        
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", 
                        marginTop:"2.5%", justifyContent:"center"}}>
            <Stepper steps={stepNames} onStepClick={handleStepClick} activeStep={stepNames[currentStep]}/>
            {currentStep === stepNames.indexOf("Alignment | Assembly") && <AlignmentAssemblyPage/>}
            {currentStep === stepNames.indexOf("Calling") && <CallingPage/>}
            {currentStep === stepNames.indexOf("Merge SV") && <MergePage/>}
        </div>
    );
}

export default VariantCallingPage;