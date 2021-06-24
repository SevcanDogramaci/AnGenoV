import igv from 'igv';
import React, { useContext, useEffect } from 'react';

import { FileUtils, TrackUtils } from 'igv-utils/src/index.js';
import { AnnotationContext } from '../AnnotationContext';

const style = {
	paddingTop: '10px',
	paddingBottom: '10px',
	margin: '8px',
	border: '1px solid lightgray',
	width: '100%',
};

const IgvVisualizer = (props) => {
	const context = useContext(AnnotationContext);

	useEffect(() => {
		console.log('Context >>', context);
		console.log('IgvVisualizer >>', props);
		const { variant } = props;

		let mounted = true;

		if (mounted) {
			const div = document.getElementById('myDiv');

			const options = {
				genome: context.readOption,
				locus: `${variant.chrom}:${variant.pos}-${variant.end}`,
			};

			igv.createBrowser(div, options).then((browser) => {
				if (context.BAMfile) {
					const files = context.BAMfile;

					// Search for index files  (.bai, .csi, .tbi, .idx)
					const indexExtensions = new Set(['bai', 'csi', 'tbi', 'idx', 'crai']);
					const indexLUT = new Map();
					const dataFiles = [];
					for (const f of files) {
						const ext = FileUtils.getExtension(f.name);
						if (indexExtensions.has(ext)) {
							const fn = f.name;
							let key = fn.substring(0, fn.length - (ext.length + 1));

							// bam and cram files (.bai, .crai) have 2 convension <data>.bam.bai and <data.bai>, account for second
							if (ext === 'bai' && !key.endsWith('bam')) {
								key += '.bam';
							} else if (ext === 'crai' && !key.endsWith('cram')) {
								key += '.cram';
							}
							indexLUT.set(key, f);
						} else {
							dataFiles.push(f);
						}
					}

					// Loop through data files building "configs"
					const trackConfigs = [];
					for (const df of dataFiles) {
						const fn = df.name;
						const format = TrackUtils.inferFileFormat(fn);
						if (!format) {
							console.log(`Skipping ${fn} - unknown format.`);
						} else if (indexLUT.has(fn)) {
							trackConfigs.push({
								format,
								url: df,
								indexURL: indexLUT.get(fn),
								name: df.name,
							});
						} else {
							trackConfigs.push({
								format,
								url: df,
								name: df.name,
							});
						}
					}

					if (trackConfigs.length > 0) {
						browser.loadTrackList(trackConfigs);
					}
				}
			});
		}

		return function cleanup() {
			mounted = false;
		};
	}, []);

	return <div id="myDiv" style={style} />;
};

export default IgvVisualizer;
