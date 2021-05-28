import React, { useReducer, useState } from 'react';

import { Set } from 'immutable';
import { AnnotationReducer, VariantsReducer } from './AnnotationReducer';

export const AnnotationContext = React.createContext(['light', () => {}]);

const AnnotationContextProvider = (props) => {
	console.log('Annotation Context');
	const { children } = props;

	const [VCFfile, setVCFfile] = useState(null);
	const [variantsInfo, setVariantsInfo] = useReducer(VariantsReducer, {
		running: false,
		variants: [],
		totalPageNumber: 0,
		currentPageNo: 0,
		filter: '(Ex: chrom==1 and pos>10100)',
		filteredVariants: [],
		filteredVariantsTotalPageNumber: 0,
		filteredVariantsCurrentPageNo: 0,
	});

	const [selectedVariantsInfo, setSelectedVariantsInfo] = useReducer(AnnotationReducer, {
		isAllSelected: false,
		selectedVariants: Set(),
	});

	const [multipleSelectionInfo, setIsMultipleSelectionEnabled] = useState({
		enabled: false,
		loading: false,
	});

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

				setVCFfile: handleFileChange,
				setVariantsInfo: handleVariantsInfoChange,
				setSelectedVariantsInfo: handleSelectedVariantsInfoChange,
				setIsMultipleSelectionEnabled: handleMultipleSelectionInfoChange,
			}}
		>
			{children}
		</AnnotationContext.Provider>
	);
};

export default AnnotationContextProvider;
