import StepButton from "./StepButton";

const Stepper = (props) => {

    return (
        
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", 
                    alignItems: "center",  width:"50%"}}>
            {
                props.steps.map((stepName, id) => {
                    return  <>

                            <StepButton isActive={props.activeStep === stepName} onClick={props.onStepClick} 
                                    name={stepName} to="/calling"/>

                            {(id != (props.steps.length-1)) &&
                            <hr style={{
                                        color: "#d4d4d4",
                                        backgroundColor: "#d4d4d4",
                                        width: "20%",
                                        height:1,
                                        borderWidth: 0
                                    }} />}
                            </>
                            
                })
            }
        </div>
    );
}

export default Stepper;