import React from 'react';
import ModuleCard from './components/ModuleCard';

const HomePage = () => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: '2.5%',
			justifyContent: 'center',
		}}
	>
		<h1 className="bp3-heading">AnGenoV</h1>
		<p>Analysis of Genome Variants</p>

		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				marginTop: '2.5%',
				width: '75%',
				alignItems: 'flex-start',
				justifyContent: 'space-around',
			}}
		>
			<ModuleCard
				name="Variant Calling Module"
				explanation="Find SVs in Illumina and long reads, merge SVs"
				buttonText="Learn More"
				link="https://docs.google.com/document/d/1JhV0qWTLmxxwDjGNkJJSzNc1k2jG4oWr/edit#heading=h.xdfd4hiyn919"
			/>

			<ModuleCard
				name="Variant Annotation Module"
				explanation="Annotate variants using the most popular databases"
				buttonText="Learn More"
				link="https://docs.google.com/document/d/1JhV0qWTLmxxwDjGNkJJSzNc1k2jG4oWr/edit#heading=h.804tx7ouca3v"
			/>

			<ModuleCard 
				name="Variant Visualization Module" 
				explanation="Visualize variants" 
				buttonText="Learn More" 
				link="https://docs.google.com/document/d/1JhV0qWTLmxxwDjGNkJJSzNc1k2jG4oWr/edit#heading=h.804tx7ouca3v"
			/>
		</div>
	</div>
);

export default HomePage;
