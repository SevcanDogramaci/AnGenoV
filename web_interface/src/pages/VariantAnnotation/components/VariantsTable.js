import React, { useState, useEffect, useContext } from 'react';
import { Checkbox, Button, Spinner, Intent } from '@blueprintjs/core';
import { Column, Table, SelectionModes, Cell } from '@blueprintjs/table';
import TablePaginator from './TablePaginator';
import { AnnotationContext } from '../AnnotationContext';

const VariantsTable = (props) => {
	const context = useContext(AnnotationContext);
	const { variants, headers, onOverlayOpen, onAnnotateMultiple, isAnnotationRunning } = props;

	const [filteredVariants, setFilteredVariants] = useState(undefined);

	useEffect(() => {
		if (context.multipleSelectionInfo.loading)
			context.setIsMultipleSelectionEnabled({
				...context.multipleSelectionInfo,
				loading: false,
			});
	}, [context, context.multipleSelectionInfo]);

	const renderDefaultTableCell = (rowIndex, key) => <Cell>{variants[rowIndex][key]}</Cell>;

	const renderCheckableColumnCell = (rowIndex) => {
		let variantID = variants[rowIndex].id;

		if (filteredVariants) variantID = filteredVariants[rowIndex].id;

		return (
			<Cell
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Checkbox
					key={variantID}
					checked={context.selectedVariantsInfo.selectedVariants.includes(variantID)}
					onChange={(event) => {
						const isChecked = event.target.checked;

						if (isChecked)
							context.setSelectedVariantsInfo({
								type: 'add',
								variants: variantID,
							});
						else
							context.setSelectedVariantsInfo({
								type: 'remove',
								variants: variantID,
							});
					}}
				/>
			</Cell>
		);
	};

	const renderAnnotationButtonCell = (rowIndex) => (
		<Cell
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Button
				intent={Intent.PRIMARY}
				small
				minimal
				icon="arrow-right"
				onClick={() => onOverlayOpen(true, rowIndex)}
			/>
		</Cell>
	);

	const onTableSelect = (event) => {
		console.log(event);
		const { cols } = event[0];

		const currentVariants = filteredVariants || variants;

		if (cols) {
			const selectedColumnID = cols[0];

			if (context.multipleSelectionInfo.enabled && selectedColumnID && selectedColumnID === headers.length) {
				if (context.selectedVariantsInfo.isAllSelected) {
					context.setSelectedVariantsInfo({
						type: 'remove-all',
						variants: currentVariants,
					});
				} else {
					context.setSelectedVariantsInfo({
						type: 'add-all',
						variants: currentVariants,
					});
				}
			}
		}
	};

	if (context.multipleSelectionInfo.loading) return <Spinner />;

	return (
		<>
			<Checkbox
				checked={context.multipleSelectionInfo.enabled}
				onChange={(event) => {
					context.setIsMultipleSelectionEnabled({
						enabled: event.target.checked,
						loading: true,
					});
				}}
			>
				Enable Multiple Selection
			</Checkbox>

			<Table selectionModes={SelectionModes.COLUMNS_ONLY} onSelection={onTableSelect} numRows={variants.length}>
				{headers.map((key) => (
					<Column name={key} cellRenderer={(rowIndex) => renderDefaultTableCell(rowIndex, key, variants)} />
				))}

				{context.multipleSelectionInfo.enabled ? (
					<Column
						name="select all"
						key="select"
						cellRenderer={(rowIndex) => renderCheckableColumnCell(rowIndex)}
					/>
				) : (
					<Column
						name="annotate"
						key="annotate"
						cellRenderer={(variant) => renderAnnotationButtonCell(variant)}
					/>
				)}
			</Table>

			<TablePaginator currentPage={0} totalPage={10} onPage={undefined} />

			{context.multipleSelectionInfo.enabled && (
				<Button
					outlined
					intent={Intent.PRIMARY}
					style={{ marginTop: '2%' }}
					disabled={isAnnotationRunning}
					onClick={() => {
						onAnnotateMultiple(context.selectedVariantsInfo.selectedVariants);
					}}
				>
					Annotate
				</Button>
			)}
		</>
	);
};

export default VariantsTable;
