import React, {useEffect, useState} from 'react';
import NavBar from "./components/NavBar"
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
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", margin: 20}}>
          <p>{response}</p>
          <p>{response2}</p>
        </div>
    </>
  );
}

export default App;
