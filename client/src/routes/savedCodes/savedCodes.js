import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import "../home/Home.css";
import Swal from 'sweetalert2';
import "./savedCodes.css"
import { Toaster, toast } from "react-hot-toast";

function SavedCodes() {

    const [savedCodes , setSavedCodes] = useState(null)
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchCodes = async () => {
            const response = await fetch(`http://localhost:5000/code/get-codes/${user._id}`)

            //const response = await fetch(`http://localhost:5000/code/get-all-codes`)
            const json = await response.json()

            if(response.ok){
                setSavedCodes(json)
            }
        }

        fetchCodes()
    },[])

    const handleDeleteCode = async (code) => {
      const confirmation = await Swal.fire({
        title: 'Delete Confirmation',
        text: 'Are you sure you want to delete this Code?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: ' #368654',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
          popup: 'custom-popup-class', 
          
      },
      });
  
      if (confirmation.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5000/code/delete-code/${code._id}`, {
            method: 'DELETE',
          });
  
          const json = await response.json();
          console.log(json);

          if (response.ok) {
            setSavedCodes(savedCodes.filter((item) => item._id !== json._id));
            toast.success('Code deleted successfully',  { duration: 1000 });
            //Swal.fire('Deleted!', 'The Code has been deleted.', 'success')
          } else {
            toast.error('Failed to delete the code');
          }
        }
        catch (error) {
          Swal.fire('Error', 'Failed to delete the plan.', 'error');
        }
      }
    };

  return (
    <div className="home-container">
      <NavBar />
      <div>
      <h3> Saved Codes</h3>
      < div >
            {savedCodes && savedCodes.map ((code) => (
                <CodeBox key={code._id} code={code} onDelete={() => handleDeleteCode(code)} />
            ))}
        </div>
        <Toaster position="bottom-center" reverseOrder={true} />
        </div>
    </div>
    
  );

  
}

const CodeBox = ({ code, onDelete }) => {
    return (
        <div className="home-container">
          
            <h3>Code</h3>
          <h4> {code.name} </h4>
          <p><strong>Language : </strong> {code.language} </p>
          <p><strong>Code: </strong> {code.code} </p>

          <button className="dltbtn"
            onClick={() => onDelete()}
          >
          Delete
          </button>
          
        </div>


      );
    
}

export default SavedCodes;
