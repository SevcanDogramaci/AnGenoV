import React, { useContext, useState, useEffect } from 'react';
import { Button, Icon, InputGroup, Intent, Tooltip } from '@blueprintjs/core';

import { ipcRenderer } from 'electron';
import { AnnotationContext } from '../AnnotationContext';
import Service from '../../../services/Service';

const FilteringTooltipContent = (
	<>
		<p>
			<strong>Filter variants by using fields in the table and operators:</strong>
		</p>
		<ul>
			<li>Fields: chrom, pos, end, id, svtype, genotype</li>
			<li>Comparison Operators: &lt;, &le;, &gt;, &ge;, ==, !=</li>
			<li>Logical Operators: and, or</li>
		</ul>

		<p>Note: Use strings between &quot; &quot; .</p>
		<p>
			<em>Ex: (chrom==1 and pos&gt;10100) or end&lt;50500</em>
		</p>
	</>
);

const VariantFilter = () => {
	const [filter, setFilter] = useState('');

	const context = useContext(AnnotationContext);

	useEffect(() => {
		setFilter(context.variantsInfo.filter);
	}, [context.variantsInfo.filter]);

	const updateFilteredVariants = (filterCondition) => {
		console.log('Filter condition:', filterCondition);
		context.setVariantsInfo({ type: 'start-running' });
		Service.filterVariants(context.variantsInfo.VCFfile.path, filterCondition, 0).then((response) => {
			console.log('FilterVariants bitti');
			console.log(response.message, response.messageType);

			if (response.messageType === 'ERROR') {
				console.log("Hereeeeee")
				ipcRenderer.invoke('show-error-dialog', { message: response.message });
			}

			const result = response.returnObject;

			if (result.variants.length > 0) {
				context.setVariantsInfo({
					type: 'finish-running-filtered',
					filter: filterCondition,
					variants: result.variants,
					totalPageNumber: result.total_page_number,
					currentPageNo: result.current_page_no,
				});
			} else {
				context.setVariantsInfo({
					type: 'finish-running-filtered',
					filter: filterCondition,
					variants: context.variantsInfo.filteredVariants,
					totalPageNumber: context.variantsInfo.filteredVariantsTotalPageNumber,
					currentPageNo: context.variantsInfo.filteredVariantsCurrentPageNo,
				});
			}
		});
	};

	const resetFilter = (event) => {
		console.log('resetFilter');
		context.setVariantsInfo({ type: 'start-running' });
		Service.getVariantsByPage(context.variantsInfo.VCFfile.path, context.variantsInfo.currentPageNo).then(
			(result) =>
				context.setVariantsInfo({
					type: 'finish-running',
					variants: result.variants,
					currentPageNo: result.current_page_no,
					totalPageNumber: result.total_page_number,
				})
		);
	};

	return (
		<div
			style={{
				display: 'flex',
				width: '80%',
				alignItems: 'center',
				justifyContent: 'center',
				marginBottom: '1%',
			}}
		>
			<Tooltip content={FilteringTooltipContent} intent={Intent.WARNING}>
				<Icon icon="info-sign" intent={Intent.WARNING} />
			</Tooltip>

			<InputGroup value={filter} fill style={{ marginLeft: '1%' }} onChange={(e) => setFilter(e.target.value)} />

			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '1%' }}>
				<Button minimal intent={Intent.PRIMARY} icon="filter" onClick={(e) => updateFilteredVariants(filter)}>
					Filter
				</Button>
				<Button minimal icon="reset" intent={Intent.DANGER} onClick={resetFilter} />
			</div>
		</div>
	);
};

export default VariantFilter;
