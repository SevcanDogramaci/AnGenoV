import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import AnnotationPage from '../pages/VariantAnnotation/VariantAnnotationPage';
import VariantCallingPage from '../pages/VariantCalling/VariantCallingPage';
import HomePage from '../pages/Home/HomePage';
import NavBar from '../components/NavBar';

const DefaultLayout = (props) => {
	return (
		<HashRouter>
			<NavBar />

			<Route path="/home" render={(props) => <HomePage {...props} />} />
			<Route
				path="/calling"
				render={(props) => <VariantCallingPage {...props} />}
			/>
			<Route
				path="/annotation"
				render={(props) => <AnnotationPage {...props} />}
			/>
			<Route exact path="/" render={(props) => <HomePage {...props} />} />
		</HashRouter>
	);
};

export default DefaultLayout;
