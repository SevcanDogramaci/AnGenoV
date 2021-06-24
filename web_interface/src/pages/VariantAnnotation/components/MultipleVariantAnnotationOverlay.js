import React from 'react';
import { Overlay, Classes, Spinner, Callout, Intent } from '@blueprintjs/core';
import { Cell, Column, Table } from '@blueprintjs/table';

const extractHeaders = (data) => Object.keys(data[0]);

const MultipleVariantAnnotationOverlay = (props) => {
	const { annotations, open, onClose } = props;

	const renderTableCell = (rowIndex, key) => {
		const rowCell = annotations[rowIndex][key];
		if (!rowCell.length) return <Cell>-</Cell>;
		return <Cell>{rowCell}</Cell>;
	};

	console.log('MultipleVariantAnnotationOverlay props >> ', props);

	const renderTable = () => {
		if (!annotations) return <Spinner />;

		if (!annotations.length) return 'No annotations found';

		const headers = extractHeaders(annotations);

		return (
			<Table numRows={annotations.length}>
				{headers.map((key) => (
					<Column name={key} key={key} cellRenderer={(rowIndex) => renderTableCell(rowIndex, key)} />
				))}
			</Table>
		);
	};

	return (
		<Overlay
			backdropClassName="overlay-backdrop"
			onClose={(e) => onClose(e)}
			className={Classes.OVERLAY_SCROLL_CONTAINER}
			isOpen={open}
			canOutsideClickClose
		>
			{console.log('Overlay props >> ', props)}
			<div
				style={{
					width: '90%',
					display: 'flex',
					flexDirection: 'column',
					margin: '10vh',
				}}
				className={[Classes.CARD, Classes.OVERLAY_SCROLL_CONTAINER]}
			>
				<h2>Annotations</h2>
				<Callout style={{ display: 'flex', marginBottom: '2%' }} icon="error" intent={Intent.DANGER}>
					Most severe consequences are shown
				</Callout>
				{renderTable()}
			</div>
		</Overlay>
	);
};

export default MultipleVariantAnnotationOverlay;
