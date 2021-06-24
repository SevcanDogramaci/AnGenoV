import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from '@blueprintjs/core';
import { Column, Table, Cell } from '@blueprintjs/table';

import { AnnotationContext } from '../AnnotationContext';

import Service from '../../../services/Service';
import AnnotationDisplay from '../util/AnnotationDisplay';

const SingleAnnotationResultTable = ({ variant }) => {
	const context = useContext(AnnotationContext);
	const [annotations, setAnnotations] = useState(undefined);

	useEffect(() => {
		let mounted = true;

		Service.annotateSingleVariant(context.variantsInfo.VCFfile.path, [variant.id]).then((result) => {
			if (mounted) {
				const resAnnotations = result.annotations;
				console.log(resAnnotations);
				if (resAnnotations) setAnnotations(resAnnotations);
				else setAnnotations([]);
			}
		});

		return function cleanup() {
			mounted = false;
		};
	}, [context.variantsInfo.VCFfile.path, variant.id]);

	const cellRenderer = (result, rowIndex, key) => {
		console.log('cellRenderer', result, rowIndex, key);
		const rowCell = result[rowIndex][key];
		if (Array.isArray(rowCell)) {
			console.log(rowCell.length);
			if (rowCell.length === 0) return <Cell>-</Cell>;
			return <Cell>{rowCell.reduce((prevValue, currValue) => `${prevValue}, ${currValue}`)}</Cell>;
		}

		if (rowCell === '') return <Cell>-</Cell>;
		return <Cell>{rowCell}</Cell>;
	};

	const renderTable = (columns, data, header) => {
		console.log(columns, data, header);
		return (
			<Table numRows={data.length} key={header} style={{ marginBottom: '2%' }}>
				{columns.map((key) => (
					<Column name={key} key={key} cellRenderer={(rowIndex) => cellRenderer(data, rowIndex, key)} />
				))}
			</Table>
		);
	};

	const renderMultipleTableWithHeader = (tableHeaders, annotationSrc) => {
		console.log(annotationSrc, tableHeaders);
		return (
			<>
				<h3 style={{ color: '#137CBD' }}>{annotationSrc} Results</h3>
				{tableHeaders.map((header) => {
					const headers = Object.keys(annotations[annotationSrc][0][header][0]);

					return (
						<>
							<h4>{header.split('_').join(' ')}</h4>
							{renderTable(headers, annotations[annotationSrc][0][header], header)}
						</>
					);
				})}
			</>
		);
	};

	const renderSingleTableWithHeader = (consequenceHeaders, annotationSrc) => (
		<>
			<h3 style={{ color: '#137CBD', marginTop: '3%', marginBottom: '2%' }}>{annotationSrc} Results</h3>
			{renderTable(consequenceHeaders, annotations[annotationSrc], annotationSrc)}
		</>
	);

	const renderAnnotationResult = () =>
		Object.keys(annotations).map((annotationSrc) => {
			console.log(annotationSrc, annotations[annotationSrc]);

			const { multiple, columns } = AnnotationDisplay.showAnnotations(annotations, annotationSrc);

			if (multiple) return renderMultipleTableWithHeader(columns, annotationSrc);
			return renderSingleTableWithHeader(columns, annotationSrc);
		});

	if (!annotations) return <Spinner />;

	if (!Object.keys(annotations).length) return 'No annotations found';

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				flexDirection: 'column',
			}}
		>
			{renderAnnotationResult()}
		</div>
	);
};

export default SingleAnnotationResultTable;
