import React from 'react';
import {Route} from 'react-router-dom';

import NavBar from "../components/NavBar"
import CallingPage from "../pages/Calling/CallingPage"
import AnnotationPage from "../pages/Annotation/AnnotationPage"

const DefaultLayout = (props) => {

  return (
    <>
        <NavBar/>
        <Route exact path="/" render={props => <CallingPage {...props} />}/>    
        <Route path="/calling" render={props => <CallingPage {...props} />} />
        <Route path="/annotation" render={props => <AnnotationPage {...props} />} />
    </>
  );
}

export default DefaultLayout;
