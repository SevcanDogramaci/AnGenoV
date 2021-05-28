import igv from 'igv';
import React, { useContext, useEffect, Component } from 'react';

import { FileUtils, TrackUtils } from 'igv-utils/src/index.js';
import { AnnotationContext } from '../AnnotationContext';

const style = {
	paddingTop: '10px',
	paddingBottom: '10px',
	margin: '8px',
	border: '1px solid lightgray',
	width: '100%',
};

class IgvVisualizer extends Component {
	componentDidMount() {
		console.log('IgvVisualizer >>', this.props);
		const { variant } = this.props;

		const div = document.getElementById('myDiv');
		const fileWidget = document.getElementById('fileWidget');

		const options = {
			genome: 'hg38',
			locus: `chr${variant.chrom}:${variant.pos}-${variant.end}`,
		};

		igv.createBrowser(div, options).then((browser) => {
			fileWidget.disabled = false;
			fileWidget.onchange = () => {
				const { files } = fileWidget;

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
			};
		});
	}

	render() {
		return (
			<>
				<div>
					<p>
						<input id="fileWidget" multiple="true" type="file" disabled />
					</p>
				</div>
				<div id="myDiv" style={style} />
			</>
		);
	}
}

export default IgvVisualizer;
