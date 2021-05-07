import React, { useReducer, useState } from 'react';

import { Set } from 'immutable';
import { AnnotationReducer, VariantsReducer } from './AnnotationReducer';

export const AnnotationContext = React.createContext(['light', () => {}]);

const AnnotationContextProvider = (props) => {
	const { children } = props;

	const [VCFfile, setVCFfile] = useState(null);
	const [variantsInfo, setVariantsInfo] = useReducer(VariantsReducer, {
		running: false,
		variants: [],
		totalPageNumber: 0,
		currentPageNo: 0,
	});

	const [selectedVariantsInfo, setSelectedVariantsInfo] = useReducer(AnnotationReducer, {
		isAllSelected: false,
		selectedVariants: Set(),
	});

	const [multipleSelectionInfo, setIsMultipleSelectionEnabled] = useState({
		enabled: false,
		loading: false,
	});

	// const [filteredVariants, setFilteredVariants] = useState(undefined);

	// const handleFilteredVariantsChange = (variants) => {
	// 	setFilteredVariants(variants);
	// };

	const handleMultipleSelectionInfoChange = (newMultipleSelectionInfo) => {
		setIsMultipleSelectionEnabled(newMultipleSelectionInfo);
	};

	const handleFileChange = (event) => {
		console.log('VCF file chosen >>', event.target.files[0].name);
		setVCFfile(event.target.files[0]);
	};

	const handleVariantsInfoChange = (newVariantsInfo) => setVariantsInfo(newVariantsInfo);

	const handleSelectedVariantsInfoChange = (newSelectedVariantsInfo) => {
		setSelectedVariantsInfo(newSelectedVariantsInfo);
	};

	return (
		<AnnotationContext.Provider
			value={{
				variantsInfo,
				selectedVariantsInfo,
				VCFfile,
				multipleSelectionInfo,
				// filteredVariants,

				setVCFfile: handleFileChange,
				setVariantsInfo: handleVariantsInfoChange,
				setSelectedVariantsInfo: handleSelectedVariantsInfoChange,
				setIsMultipleSelectionEnabled: handleMultipleSelectionInfoChange,
				// setFilteredVariants: handleFilteredVariantsChange,
			}}
		>
			{children}
		</AnnotationContext.Provider>
	);
};

export default AnnotationContextProvider;
