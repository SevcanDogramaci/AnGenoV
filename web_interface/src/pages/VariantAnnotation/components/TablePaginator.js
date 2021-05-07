import React, { useContext } from 'react';
import { Button } from '@blueprintjs/core';
import { AnnotationContext } from '../AnnotationContext';
import Service from '../../../services/Service';

const SpinnerStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
};

const ButtonStyle = {
	borderRadius: '50%',
};

const TextStyle = {
	margin: '1%',
};

const TablePaginator = (props) => {
	const context = useContext(AnnotationContext);

	const onPageChange = (type) => {
		context.setVariantsInfo({ type: 'start-running' });
		const currentPageNo =
			type === 'prev-page' ? context.variantsInfo.currentPageNo - 1 : context.variantsInfo.currentPageNo + 1;
		Service.getVariantsByPage(context.VCFfile.path, currentPageNo).then((result) => {
			context.setVariantsInfo({
				type,
				variants: result.variants,
				totalPageNumber: result.total_page_number,
				currentPageNo: context.variantsInfo.current_page_no,
			});
		});
	};

	return (
		<div style={SpinnerStyle}>
			<Button
				style={ButtonStyle}
				disabled={context.variantsInfo.currentPageNo === 0}
				small
				minimal
				outlined
				icon="chevron-left"
				onClick={() => onPageChange('prev-page')}
			/>
			<p style={TextStyle}>
				{context.variantsInfo.currentPageNo + 1} / {context.variantsInfo.totalPageNumber}
			</p>
			<Button
				disabled={context.variantsInfo.currentPageNo + 1 === context.variantsInfo.totalPageNumber}
				style={ButtonStyle}
				small
				minimal
				outlined
				icon="chevron-right"
				onClick={() => onPageChange('next-page')}
			/>
		</div>
	);
};

export default TablePaginator;
