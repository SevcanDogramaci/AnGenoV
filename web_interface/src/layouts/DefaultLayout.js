import React from 'react';
import {HashRouter, Route} from 'react-router-dom';

import NavBar from "../components/NavBar"
import AnnotationPage from "../pages/VariantAnnotation/VariantAnnotationPage"
import HomePage from "../pages/Home/HomePage"
import VariantCallingPage from '../pages/VariantCalling/VariantCallingPage';

const DefaultLayout = (props) => {

  return (
    <HashRouter>
        <NavBar/>
        <Route exact path="/" render={props => <HomePage {...props} />}/>    
        <Route path="/calling" render={props => <VariantCallingPage {...props} />} />
        <Route path="/annotation" render={props => <AnnotationPage {...props} />} />
    </HashRouter>
  );
}

export default DefaultLayout;
