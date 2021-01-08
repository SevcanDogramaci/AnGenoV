import StepButton from "./StepButton";

const Stepper = (props) => {

    return (
        
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"50%"}}>
            {
                props.steps.map(stepName => {
                    return <StepButton isActive={props.activeStep === stepName} onClick={props.onStepClick} 
                                       name={stepName} to="/calling"/>
                })
            }
        </div>
    );
}

export default Stepper;