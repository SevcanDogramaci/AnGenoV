import React, { useState } from 'react';
import { Overlay, Classes, Tab, Tabs, Spinner } from '@blueprintjs/core';
import IgvVisualizer from './IgvVisualizer';
import SingleAnnotationResultTable from './SingleAnnotationResultTable';

const VariantInfoOverlay = ({ variantInfo, onClose }) => {
	const { variant, open } = variantInfo;
	const [activeTabId, setActiveTabId] = useState('annotation');

	const handleTabChange = (selectedTabId) => {
		console.log('Handling tab change...', selectedTabId);
		setActiveTabId(selectedTabId);
	};

	const SampleAnnotationPanel = () => <SingleAnnotationResultTable variant={variant} />;

	return (
		<Overlay
			backdropClassName="overlay-backdrop"
			onClose={(e) => {
				setActiveTabId('annotation');
				onClose(e);
			}}
			className={Classes.OVERLAY_SCROLL_CONTAINER}
			isOpen={open}
			canOutsideClickClose
		>
			{console.log('Overlay props >> ', variantInfo, onClose)}
			<div
				style={{
					width: '90%',
					height: '80vh',
					margin: '10vh',
				}}
				className={[Classes.CARD]}
			>
				<Tabs
					renderActiveTabPanelOnly
					id="variant-info-tabs"
					onChange={handleTabChange}
					selectedTabId={activeTabId}
				>
					<Tab
						id="annotation"
						title="Annotations"
						panel={variant ? <SampleAnnotationPanel /> : <Spinner />}
					/>
					<Tab id="visualization" title="Visualization" panel={<IgvVisualizer variant={variant} />} />
					<Tabs.Expander />
				</Tabs>
			</div>
		</Overlay>
	);
};

export default VariantInfoOverlay;
