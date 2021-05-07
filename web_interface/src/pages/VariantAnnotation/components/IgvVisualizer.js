import igv from 'igv';
import React, { Component } from 'react';

const igvStyle = {
	paddingTop: '1%',
	paddingBottom: '10%',
	margin: '8px',
	// border: '1px solid lightgray'
};

export default class IgvVisualizer extends Component {
	componentDidMount() {
		const igvContainer = document.getElementById('igv-div');
		const igvOptions = {
			genome: 'hg38',
			locus: 'chr8:127,736,588-127,739,371',
		};
		return igv.createBrowser(igvContainer, igvOptions);
	}

	render() {
		return <div id="igv-div" style={igvStyle} />;
	}
}
