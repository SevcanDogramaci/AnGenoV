import React, { useState, useEffect, useContext } from 'react';
import { Checkbox, Button, Spinner, Intent, Divider, Tooltip, Icon, Position } from '@blueprintjs/core';
import { Column, Table, SelectionModes, Cell } from '@blueprintjs/table';
import TablePaginator from './TablePaginator';
import { AnnotationContext } from '../AnnotationContext';
import VariantFilter from './VariantFilter';

const extractHeaders = (data) => Object.keys(data[0]);
const types = 'DEL, INV, INS, DUP,';
const notAlt = '[<>]';

const VariantsTable = (props) => {
	const context = useContext(AnnotationContext);
	const { variants, onOverlayOpen, onAnnotateMultiple, isAnnotationRunning } = props;
	console.log('>>>', variants);
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
	// const types = 'DEL, INV, INS, DUP,';
	// const notAlt = '[<>]';
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
				{variants[rowIndex].svtype != null ? (
					types.includes(variants[rowIndex].svtype.substring(0, 3)) ? (
						// notAlt.includes(variants[rowIndex].alts[0]) || types.includes(variants[rowIndex].alts[variants[rowIndex].alts.length-1]) ? (
						variants[rowIndex].alts[0].split('').some((ch) => notAlt.indexOf(ch) !== -1) &&
						!variants[rowIndex].svtype.includes('DEL') ? (
							<Tooltip content="Alt info is insufficient." intent="warning">
								<Icon icon="warning-sign" intent="warning" />
							</Tooltip>
						) : (
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
						)
					) : (
						<Tooltip content="This svtype does not supported." intent="warning">
							<Icon icon="warning-sign" intent="warning" />
						</Tooltip>
					)
				) : variants[rowIndex].alts[0].split('').some((ch) => notAlt.indexOf(ch) !== -1) ? (
					<Tooltip content="Alt info is insufficient." intent="warning">
						<Icon icon="warning-sign" intent="warning" />
					</Tooltip>
				) : (
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
				)}
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
			{variants[rowIndex].svtype != null ? (
				types.includes(variants[rowIndex].svtype.substring(0, 3)) ? (
					// notAlt.includes(variants[rowIndex].alts[0]) || types.includes(variants[rowIndex].alts[variants[rowIndex].alts.length-1]) ? (
					variants[rowIndex].alts[0].split('').some((ch) => notAlt.indexOf(ch) !== -1) &&
					!variants[rowIndex].svtype.includes('DEL') ? (
						<Tooltip content="Alt info is insufficient." intent="warning">
							<Icon icon="warning-sign" intent="warning" />
						</Tooltip>
					) : (
						<Button
							intent={Intent.PRIMARY}
							small
							minimal
							icon="arrow-right"
							onClick={() => onOverlayOpen(true, rowIndex)}
						/>
					)
				) : (
					<Tooltip content="This svtype does not supported." intent="warning">
						<Icon icon="warning-sign" intent="warning" />
					</Tooltip>
				)
			) : variants[rowIndex].alts[0].split('').some((ch) => notAlt.indexOf(ch) !== -1) ? (
				<Tooltip content="Alt info is insufficient." intent="warning">
					<Icon icon="warning-sign" intent="warning" />
				</Tooltip>
			) : (
				<Button
					intent={Intent.PRIMARY}
					small
					minimal
					icon="arrow-right"
					onClick={() => onOverlayOpen(true, rowIndex)}
				/>
			)}
		</Cell>
	);

	const onTableSelect = (event) => {
		console.log(event);
		const { cols } = event[0];

		const variants2 = JSON.parse(JSON.stringify(variants));
		console.log(variants);
		const idxes = [];
		for (let i = 0; i < variants.length; i++) {
			if (variants[i].svtype != null) {
				if (types.includes(variants[i].svtype.substring(0, 3))) {
					if (
						variants[i].alts[0].split('').some((ch) => notAlt.indexOf(ch) !== -1) &&
						!variants[i].svtype.includes('DEL')
					) {
						idxes.push(i);
					}
				} else {
					idxes.push(i);
				}
			} else if (variants[i].alts[0].split('').some((ch) => notAlt.indexOf(ch) !== -1)) {
				idxes.push(i);
			}
		}
		for (let i = idxes.length - 1; i >= 0; i--) {
			variants2.splice(idxes[i], 1);
		}
		console.log('variants2', variants2);
		console.log(variants2);
		console.log(variants);

		if (cols) {
			console.log('Here', cols);
			const selectedColumnID = cols[0];
			console.log('Here', selectedColumnID);

			if (context.multipleSelectionInfo.enabled && selectedColumnID === 0) {
				console.log('Here2');
				if (context.selectedVariantsInfo.isAllSelected) {
					context.setSelectedVariantsInfo({
						type: 'remove-all',
						variants: variants2,
					});
				} else {
					context.setSelectedVariantsInfo({
						type: 'add-all',
						variants: variants2,
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

				{headers.map((key) => (
					<Column name={key} key={key} cellRenderer={(rowIndex) => renderDefaultTableCell(rowIndex, key)} />
				))}
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
