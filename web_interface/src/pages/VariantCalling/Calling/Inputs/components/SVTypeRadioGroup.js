import React from 'react';
import { RadioGroup, Radio } from '@blueprintjs/core';

const labels = ['SNP / INDEL', 'SV Calling'];

const SVTypeRadioGroup = (props) => {
	const { value, onRadioChosen } = props;

	return (
		<RadioGroup
			selectedValue={value}
			onChange={(e) => {
				onRadioChosen({
					type: 'update-sv-type',
					svType: e.target.value,
				});
				console.log('on change');
			}}
		>
			{labels.map((label) => (
				<Radio label={label} value={label} />
			))}
		</RadioGroup>
	);
};

export default SVTypeRadioGroup;
