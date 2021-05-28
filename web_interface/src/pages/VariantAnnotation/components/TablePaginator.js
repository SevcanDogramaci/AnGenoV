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

	const getPageInfo = () =>
		context.variantsInfo.filteredVariants
			? {
					filtered: 'filtered',
					total: context.variantsInfo.filteredVariantsTotalPageNumber,
					current: context.variantsInfo.filteredVariantsCurrentPageNo,
			  }
			: {
					filtered: '',
					total: context.variantsInfo.totalPageNumber,
					current: context.variantsInfo.currentPageNo,
			  };

	const onPageChange = (type) => {
		context.setVariantsInfo({ type: 'start-running' });

		const { filtered, total, current } = getPageInfo();
		console.log(filtered, current, type, total);

		const currentPageNo = type === 'prev-page' ? current - 1 : current + 1;

		if (filtered) {
			Service.filterVariants(context.VCFfile.path, context.variantsInfo.filter, currentPageNo).then((result) => {
				context.setVariantsInfo({
					type: `${type}-${filtered}`,
					variants: result.variants,
					totalPageNumber: result.total_page_number,
				});
			});
		} else {
			Service.getVariantsByPage(context.VCFfile.path, currentPageNo).then((result) => {
				context.setVariantsInfo({
					type: `${type}`,
					variants: result.variants,
					totalPageNumber: result.total_page_number,
				});
			});
		}
	};

	return (
		<div style={SpinnerStyle}>
			<Button
				style={ButtonStyle}
				disabled={getPageInfo().current === 0}
				small
				minimal
				outlined
				icon="chevron-left"
				onClick={() => onPageChange('prev-page')}
			/>
			<p style={TextStyle}>
				{getPageInfo().current + 1} / {getPageInfo().total}
			</p>
			<Button
				disabled={getPageInfo().current + 1 === getPageInfo().total}
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
