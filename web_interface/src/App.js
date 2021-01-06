import React, {useEffect, useState} from 'react';
import NavBar from "./components/NavBar"
import CallingPage from "./pages/Calling/CallingPage"
import AnnotationPage from "./pages/Annotation/AnnotationPage"
import axios from 'axios';

async function checkCommunication() {
  const response = await axios.get("/world");
  console.log("Response is ", response.data)
  return response.data;
}

async function checkAnotherCommunication() {
  const response = await axios.get("/another_world");
  console.log("Response is ", response.data)
  return response.data;
}

const App = (props) => {
  const [response, setResponse] = useState("Learn React");
  const [response2, setResponse2] = useState("Learn React");

  useEffect(() => {
    checkCommunication().then(result => setResponse(result));
    checkAnotherCommunication().then(result => setResponse2(result));
  }, []);

  return (
    <>
        <NavBar/>
        {/* Open the Page component which you want to see */}
        <CallingPage/>
        {/* <AnnotationPage/> */}
    </>
  );
}

export default App;
