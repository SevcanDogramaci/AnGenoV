import React, { useState, useContext } from 'react';
import { Button, FileInput, Spinner } from '@blueprintjs/core';

import Service from '../../services/Service';
import VariantsTable from './components/VariantsTable';
import VariantInfoOverlay from './components/VariantInfoOverlay';
import CustomSpinner from './components/CustomSpinner';
import { AnnotationContext } from './AnnotationContext';

const VariantAnnotationPage = () => {
	const context = useContext(AnnotationContext);

	const [overlayVariantInfo, setOverlayVariantInfo] = useState({
		open: false,
		variant: null,
	});
	const [multipleAnnotationsInfo, setMultipleAnnotationsInfo] = useState({
		running: false,
		annotations: null,
	});

	const handleShowVariants = (event) => {
		console.log('handleShowVariants');
		context.setVariantsInfo({ type: 'start-running' });
		Service.getVariantsByPage(context.VCFfile.path, context.variantsInfo.currentPageNo).then((result) =>
			context.setVariantsInfo({
				type: 'finish-running',
				variants: result.variants,
				currentPageNo: result.current_page_no,
				totalPageNumber: result.total_page_number,
			})
		);
	};

	const handleOverlayChange = (open, variantID) => {
		if (variantID !== undefined) {
			setOverlayVariantInfo({
				open,
				variant: context.variantsInfo.variants[variantID],
			});
		} else {
			setOverlayVariantInfo({
				...overlayVariantInfo,
				open,
			});
		}
	};

	const handleAnnotateMultiple = (variantIDsToAnnotate) => {
		console.log('Annotate variants with ids ', variantIDsToAnnotate.toList().toArray());
		setMultipleAnnotationsInfo({
			...multipleAnnotationsInfo,
			running: true,
		});
		Service.annotateSelectedVariants(context.VCFfile.path, variantIDsToAnnotate.toList()).then((result) => {
			console.log('Filtered Variants are taken as a result !');
			setMultipleAnnotationsInfo({
				running: false,
				annotations: result,
			});
		});
	};

	const renderTable = () => {
		if (context.variantsInfo.running) return <Spinner />;

		if (
			Object.keys(
				context.variantsInfo.filteredVariants
					? context.variantsInfo.filteredVariants
					: context.variantsInfo.variants
			).length > 0
		)
			return (
				<>
					<VariantInfoOverlay
						variantInfo={overlayVariantInfo}
						onClose={(event) => handleOverlayChange(false)}
					/>

					<VariantsTable
						variants={
							context.variantsInfo.filteredVariants
								? context.variantsInfo.filteredVariants
								: context.variantsInfo.variants
						}

						onOverlayOpen={handleOverlayChange}
						onAnnotateMultiple={handleAnnotateMultiple}
						isAnnotationRunning={multipleAnnotationsInfo.running}
					/>
				</>
			);
		return <p>No variants found</p>;
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				marginTop: '2.5%',
				justifyContent: 'center',
			}}
		>
			{multipleAnnotationsInfo.running && <CustomSpinner text="Annotating" />}
			<h3 className="bp3-heading">Load Input</h3>
			<p>Load your variants in VCF format or by variant calling:</p>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: '',
				}}
			>
				<FileInput
					buttonText="Browse"
					style={{ marginRight: '4%' }}
					text={context.VCFfile ? context.VCFfile.name : 'Choose file'}
					onInputChange={(event) => context.setVCFfile(event)}
					inputProps={{accept: ".vcf, .bcf"}}
				/>
				<Button
					style={{ paddingLeft: '10%', paddingRight: '10%' }}
					disabled={!context.VCFfile || context.variantsInfo.running}
					onClick={(event) => handleShowVariants(event)}
				>
					Show
				</Button>
			</div>

			<h3 style={{ marginTop: '2.5%' }} className="bp3-heading">
				Results
			</h3>

			<div
				style={{
					// height: '400px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: '1%',
					marginBottom: '5%',
					width: '90%',
					justifyContent: 'flex-start',
				}}
			>
				{renderTable()}
			</div>
		</div>
	);
};

export default VariantAnnotationPage;
