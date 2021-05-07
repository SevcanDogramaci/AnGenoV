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
	console.log(action);

	switch (action.type) {
		case 'start-running':
			return {
				...state,
				running: true,
			};

		case 'finish-running':
			return {
				running: false,
				variants: action.variants,
				totalPageNumber: action.totalPageNumber,
				currentPageNo: action.currentPageNo,
			};

		case 'prev-page':
			return {
				running: false,
				variants: action.variants,
				totalPageNumber: action.totalPageNumber,
				currentPageNo: state.currentPageNo - 1,
			};

		case 'next-page':
			return {
				running: false,
				variants: action.variants,
				totalPageNumber: action.totalPageNumber,
				currentPageNo: state.currentPageNo + 1,
			};

		default:
			throw new Error();
	}
}
