import React, { useReducer, useState } from 'react';

import { Set } from 'immutable';
import { AnnotationReducer, VariantsReducer } from './AnnotationReducer';

export const AnnotationContext = React.createContext(['light', () => {}]);

const AnnotationContextProvider = (props) => {
	console.log('Annotation Context');
	const { children } = props;

	// const [VCFfile, setVCFfile] = useState(null);

	const [BAMfile, setBAMfile] = useState(null);
	const [readOption, setReadOption] = useState('hg38');

	const updateReadOption = (newReadOption) => {
		console.log(`${newReadOption} clicked`);
		setReadOption(newReadOption);
	};

	const handleBAMFileChange = (event) => {
		console.log('BAM file chosen >>', event.target.files);
		setBAMfile(event.target.files);
	};

	const [variantsInfo, setVariantsInfo] = useReducer(VariantsReducer, {
		VCFfile: null,
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

	// const handleFileChange = (event) => {
	// 	console.log('VCF file chosen >>', event.target.files[0].name);
	// 	setVCFfile(event.target.files[0]);
	// };

	const handleVariantsInfoChange = (newVariantsInfo) => setVariantsInfo(newVariantsInfo);

	const handleSelectedVariantsInfoChange = (newSelectedVariantsInfo) => {
		setSelectedVariantsInfo(newSelectedVariantsInfo);
	};

	return (
		<AnnotationContext.Provider
			value={{
				variantsInfo,
				selectedVariantsInfo,
				// VCFfile,
				BAMfile,
				readOption,
				multipleSelectionInfo,

				// setVCFfile: handleFileChange,
				setReadOption: updateReadOption,
				setBAMfile: handleBAMFileChange,
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
