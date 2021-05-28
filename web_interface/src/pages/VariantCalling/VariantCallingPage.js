import React, { useState } from 'react';

import CallingPage from './Calling/CallingPage';
import MergePage from './MergeSV/MergePage';
import Stepper from './components/Stepper';

import CallingContextProvider from './Calling/CallingContext';

const stepNames = ['Calling', 'Merge SV'];

const VariantCallingPage = () => {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	const handleStepClick = (stepName) => {
		console.log('onStepClick !');
		setCurrentStepIndex(stepNames.indexOf(stepName));
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				marginTop: '2.5%',
				justifyContent: 'center',
			}}
		>
			<Stepper steps={stepNames} onStepClick={handleStepClick} activeStep={stepNames[currentStepIndex]} />
			{currentStepIndex === stepNames.indexOf('Calling') && (
				<CallingContextProvider>
					<CallingPage />
				</CallingContextProvider>
			)}
			{currentStepIndex === stepNames.indexOf('Merge SV') && <MergePage />}
		</div>
	);
};

export default VariantCallingPage;
