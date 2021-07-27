export default class AnnotationDisplay {
	static showAnnotations(annotations, annotationSrc) {
		switch (annotationSrc) {
			case 'dbSNP':
				return { multiple: false, columns: ['snp_id', 'clinical_significance'] };
			case 'ENSEMBLE':
				const annotation = annotations[annotationSrc][0];
				console.log(annotations[annotationSrc], Object.keys(annotations[annotationSrc][0]));
				const columns = Object.keys(annotation).filter((key) => key.endsWith('_consequences'));
				return { multiple: true, columns };
			case 'dbVar':
				return { multiple: false, columns: ['dbvarvarianttypelist', 'dbvarclinicalsignificancelist'] };
			default:
				return undefined;
		}
	}
}
