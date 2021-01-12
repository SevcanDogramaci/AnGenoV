import React from 'react';
import {Route} from 'react-router-dom';

import NavBar from "../components/NavBar"
import AnnotationPage from "../pages/VariantAnnotation/VariantAnnotationPage"
import HomePage from "../pages/Home/HomePage"
import VariantCallingPage from '../pages/VariantCalling/VariantCallingPage';

const DefaultLayout = (props) => {

  return (
    <>
        <NavBar/>
        <Route exact path="/" render={props => <VariantCallingPage {...props} />}/>    
        <Route path="/calling" render={props => <VariantCallingPage {...props} />} />
        <Route path="/annotation" render={props => <AnnotationPage {...props} />} />
        <Route path="/home" render={props => <HomePage {...props} />} />
    </>
  );
}

export default DefaultLayout;
