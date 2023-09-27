import { React, useState } from "react";
import { readUserData } from "./firebaseDatabase";

function Balance({ uid }){

    const [status, setStatus] = useState('');
    const [balance, setBalance] = useState('');
  

    const handleSubmit = async e => {
        // const userRef = db.collection('users').doc('peter@mit.edu');
        // const doc = await userRef.get();
        // if (!doc.exists) {
        //   console.log('No such document!');
        // } else {
        //   console.log('Document data:', doc.data());
        // }
        console.log('button is clicked');
        const userDetails = await readUserData(uid);
        console.log(userDetails);
        console.log(userDetails.balance)
        setStatus(`Your balance is for ${userDetails.email} is: ${userDetails.balance}`);
      };
  
      return (
        <div className="container mt-4 mb-4">
          <h2>Balance</h2>
          <form>
            <div className="form-group">
              <label>Check Balance:</label>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Check
            </button>
            <p className="pt-2 pb-2">
                {status}
            </p>
          </form>
        </div>
      );
    }
  


  

  export default Balance;