import React, { useState, useContext } from 'react';
import { Button, FileInput, Spinner, Menu, MenuItem, Popover, PopoverPosition, Alert } from '@blueprintjs/core';

import Service from '../../services/Service';
import VariantsTable from './components/VariantsTable';
import VariantInfoOverlay from './components/VariantInfoOverlay';
import { AnnotationContext } from './AnnotationContext';
import MultipleVariantAnnotationOverlay from './components/MultipleVariantAnnotationOverlay';

const VariantAnnotationPage = () => {
	const context = useContext(AnnotationContext);

	const [overlayVariantInfo, setOverlayVariantInfo] = useState({
		open: false,
		variant: null,
	});
	const [multipleAnnotationsInfo, setMultipleAnnotationsInfo] = useState({
		open: false,
		running: false,
		annotations: null,
	});

	const handleShowVariants = (event) => {
		console.log('handleShowVariants');
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
		Service.annotateMultipleVariants(context.variantsInfo.VCFfile.path, variantIDsToAnnotate.toList()).then(
			(result) => {
				console.log('Filtered Variants are taken as a result !');
				setMultipleAnnotationsInfo({
					running: false,
					annotations: result,
					open: true,
				});
			}
		);
	};

	const renderTable = () => {
		if (context.variantsInfo.running) return <Spinner />;

		if (multipleAnnotationsInfo.running) return <Spinner />;

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

					<MultipleVariantAnnotationOverlay
						open={multipleAnnotationsInfo.open}
						annotations={multipleAnnotationsInfo.annotations}
						onClose={(event) =>
							setMultipleAnnotationsInfo({
								...multipleAnnotationsInfo,
								open: !multipleAnnotationsInfo.open,
							})
						}
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
			{/* {multipleAnnotationsInfo.running && <CustomSpinner text="Annotating" />} */}
			<h3 className="bp3-heading">Load Input</h3>

			<p>Choose a BAM file and a reference genome suitable for your BAM file: (Optional)</p>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					marginBottom: '1%',
					justifyContent: '',
				}}
			>
				<FileInput
					buttonText="Browse"
					style={{ marginRight: '4%' }}
					text={
						context.BAMfile
							? Array.from(context.BAMfile).length > 0
								? Array.from(context.BAMfile).map((file) => file.name)
								: 'Choose files'
							: 'Choose files'
					}
					onInputChange={(event) => context.setBAMfile(event)}
					inputProps={{ multiple: 'true', accept: '.bai, .csi, .tbi, .idx, .crai, .bam, .cram, .vcf, .gz' }}
				/>

				<Popover
					content={
						<Menu>
							<MenuItem onClick={(e) => context.setReadOption('hg38')} text="Human (GRCh38/hg38)" />
							<MenuItem onClick={(e) => context.setReadOption('hg38_1kg')} text="Human (hg38 1kg/GATK)" />
							<MenuItem onClick={(e) => context.setReadOption('hg19')} text="Human (CRCh37/hg19)" />
							<MenuItem onClick={(e) => context.setReadOption('hg18')} text="Human (hg18)" />
						</Menu>
					}
					position={PopoverPosition.RIGHT_TOP}
				>
					<Button style={{ width: '100px' }} rightIcon="caret-down" text={context.readOption} />
				</Popover>
			</div>

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
					text={context.variantsInfo.VCFfile ? context.variantsInfo.VCFfile.name : 'Choose file'}
					onInputChange={(event) => {
						if (event.target.files.length)
							context.setVariantsInfo({
								type: 'set-vcf-file',
								file: event,
							});
					}}
					inputProps={{ accept: '.vcf, .bcf' }}
				/>
				<Button
					style={{ paddingLeft: '10%', paddingRight: '10%' }}
					disabled={!context.variantsInfo.VCFfile || context.variantsInfo.running}
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