import React, { useState, useEffect, useContext } from 'react';
import { Checkbox, Button, Spinner, Intent, Divider } from '@blueprintjs/core';
import { Column, Table, SelectionModes, Cell } from '@blueprintjs/table';
import TablePaginator from './TablePaginator';
import { AnnotationContext } from '../AnnotationContext';
import VariantFilter from './VariantFilter';
import Service from '../../../services/Service';

const extractHeaders = (data) => Object.keys(data[0]);

const VariantsTable = (props) => {
	const context = useContext(AnnotationContext);
	const { variants, onOverlayOpen, onAnnotateMultiple, isAnnotationRunning } = props;
	console.log(">>>", variants)
	const headers = extractHeaders(variants);

	useEffect(() => {
		console.log('Variants table useEffect');
		if (context.multipleSelectionInfo.loading) {
			new Promise((resolve) => setTimeout(resolve, 1)).then(() =>
				context.setIsMultipleSelectionEnabled({
					...context.multipleSelectionInfo,
					loading: false,
				})
			);
		}
	}, [context, context.multipleSelectionInfo]);



	const renderDefaultTableCell = (rowIndex, key) => <Cell>{variants[rowIndex][key]}</Cell>;

	const renderCheckableColumnCell = (rowIndex) => {
		const variantID = variants[rowIndex].id;

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

		if (cols) {
			const selectedColumnID = cols[0];

			if (context.multipleSelectionInfo.enabled && selectedColumnID && selectedColumnID === headers.length) {
				if (context.selectedVariantsInfo.isAllSelected) {
					context.setSelectedVariantsInfo({
						type: 'remove-all',
						variants,
					});
				} else {
					context.setSelectedVariantsInfo({
						type: 'add-all',
						variants,
					});
				}
			}
		}
	};

	if (context.multipleSelectionInfo.loading) return <Spinner />;

	return (
		<>
			<div
				style={{
					display: 'flex',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<VariantFilter />
				<Checkbox
					checked={context.multipleSelectionInfo.enabled}
					onChange={(event) => {
						context.setIsMultipleSelectionEnabled({
							enabled: event.target.checked,
							loading: true,
						});
					}}
				>
					Multiple Selection
				</Checkbox>
			</div>

			<Table selectionModes={SelectionModes.COLUMNS_ONLY} onSelection={onTableSelect} numRows={variants.length}>
				{headers.map((key) => (
					<Column name={key} key={key} cellRenderer={(rowIndex) => renderDefaultTableCell(rowIndex, key)} />
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

			<TablePaginator currentPage={0} totalPage={10} />

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
