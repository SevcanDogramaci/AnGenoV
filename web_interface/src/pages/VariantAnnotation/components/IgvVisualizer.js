import igv from 'igv'
import React, { Component } from 'react';

var igvStyle = {
    paddingTop: '10px',
    paddingBottom: '10px',
    margin: '8px',
    border: '1px solid lightgray'
}

export default class IgvVisualizer extends Component {

    componentDidMount() {
      var igvContainer = document.getElementById('igv-div');
      var igvOptions = {
        genome: 'hg38', 
        locus: "chr8:127,736,588-127,739,371"
     };
      return igv.createBrowser(igvContainer, igvOptions);
    }
  
    render() {
      return (
        <div id="igv-div" style={igvStyle}></div>
      );
    }
}
