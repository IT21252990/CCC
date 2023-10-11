import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import "../home/Home.css";

function SavedCodes() {

    const [savedCodes , setSavedCodes] = useState(null)
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchInstallments = async () => {
            const response = await fetch(`http://localhost:5000/code/get-codes/${user._id}`)
            const json = await response.json()

            if(response.ok){
                setSavedCodes(json)
            }
        }

        fetchInstallments()
    },[])

  return (
    <div className="home-container">
      <NavBar />
      <h3> Saved Codes</h3>
      < div >
            {savedCodes && savedCodes.map ((code) => (
                <codeBox key={code._id} code={code} />
            ))}
        </div>
    </div>
  );

  
}

const codeBox = ({ code }) => {
    return (
        <div className="home-container">
          
            <h3>Code</h3>
          <div className="lightBlueBodyBG">
          <h4> {code.name} </h4>
          <p><strong>Title </strong> {code.language} </p>
          <p><strong>Initial Payment: </strong> {code.code} </p>
        </div>
          
        </div>
      );
    
}

export default SavedCodes;
