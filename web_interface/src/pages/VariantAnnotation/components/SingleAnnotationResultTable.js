import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from '@blueprintjs/core';
import { AnnotationContext } from '../AnnotationContext';
import Service from '../../../services/Service';

const SingleAnnotationResultTable = ({ variant }) => {
	const context = useContext(AnnotationContext);
	const [annotations, setAnnotations] = useState(undefined);

	useEffect(() => {
		let mounted = true;

		Service.annotateSelectedVariants(context.VCFfile.path, [variant.id]).then((result) => {
			if (mounted) setAnnotations(JSON.parse(result[0].annotations[0]));
		});

		return function cleanup() {
			mounted = false;
		};
	}, [context.VCFfile.path, variant.id]);

	if (!annotations) return <Spinner />;

	return (
		<div>
			<h3>{variant.id}</h3>
			{annotations.map((annotation) => (
				<>
					<h4>Most severe consequence : {annotation.most_severe_consequence}</h4>
					{annotation.transcript_consequences.map((transCon) => (
						<ul>
							{transCon.consequence_terms.map((term) => (
								<li>{term}</li>
							))}
						</ul>
					))}
				</>
			))}
		</div>
	);
};

export default SingleAnnotationResultTable;
