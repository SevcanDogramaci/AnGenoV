export function AnnotationReducer(state, action) {
	console.log(state, action);

	switch (action.type) {
		case 'add': {
			return {
				...state,
				selectedVariants: state.selectedVariants.add(action.variants),
			};
		}
		case 'add-all': {
			const variantIDs = action.variants.map((variant) => variant.id);
			console.log('News >>', variantIDs);
			console.log('Total >>', state.selectedVariants.union(variantIDs).toList().toArray());

			return {
				isAllSelected: true,
				selectedVariants: state.selectedVariants.union(variantIDs),
			};
		}
		case 'remove': {
			return {
				...state,
				selectedVariants: state.selectedVariants.delete(action.variants),
			};
		}
		case 'remove-all': {
			const variantIDs = action.variants.map((variant) => variant.id);
			console.log('Total >>', state.selectedVariants.subtract(variantIDs).toList().toArray());
			return {
				isAllSelected: false,
				selectedVariants: state.selectedVariants.subtract(variantIDs),
			};
		}
		default:
			throw new Error();
	}
}

export function VariantsReducer(state, action) {
	console.log('VariantsReducer');
	console.log(action);

	switch (action.type) {
		case 'start-running':
			return {
				...state,
				running: true,
			};

		case 'finish-running':
			return {
				...state,
				running: false,
				variants: action.variants,
				totalPageNumber: action.totalPageNumber,
				currentPageNo: action.currentPageNo,
				filteredVariants: null,
				filter: '(Ex: chrom==1 and pos>10100)',
			};

		case 'finish-running-filtered':
			return {
				...state,
				running: false,
				filter: action.filter,
				filteredVariants: action.variants,
				filteredVariantsTotalPageNumber: action.totalPageNumber,
				filteredVariantsCurrentPageNo: action.currentPageNo,
			};

		case 'prev-page':
			return {
				...state,
				running: false,
				variants: action.variants,
				totalPageNumber: action.totalPageNumber,
				currentPageNo: state.currentPageNo - 1,
			};

		case 'prev-page-filtered':
			console.log("prev-page-filtered'");
			return {
				...state,
				running: false,
				filteredVariants: action.variants,
				filteredVariantsTotalPageNumber: action.totalPageNumber,
				filteredVariantsCurrentPageNo: state.filteredVariantsCurrentPageNo - 1,
			};

		case 'next-page':
			return {
				...state,
				running: false,
				variants: action.variants,
				totalPageNumber: action.totalPageNumber,
				currentPageNo: state.currentPageNo + 1,
			};

		case 'next-page-filtered':
			return {
				...state,
				running: false,
				filteredVariants: action.variants,
				filteredVariantsTotalPageNumber: action.totalPageNumber,
				filteredVariantsCurrentPageNo: state.filteredVariantsCurrentPageNo + 1,
			};

		default:
			throw new Error();
	}
}
