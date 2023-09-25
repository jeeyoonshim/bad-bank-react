import { React, useState } from "react";
import { readUserData, saveUserDataToDatabase } from "./firebaseDatabase";

function Deposit({ uid }){
    const [status, setStatus] = useState('');
    const [amount, setAmount] = useState('');
  

    const handleSubmit = async e => {
        // const userRef = db.collection('users').doc('peter@mit.edu');
        // const doc = await userRef.get();
        // if (!doc.exists) {
        //   console.log('No such document!');
        // } else {
        //   console.log('Document data:', doc.data());
        // }
        // console.log('button is clicked');
        // alert(`your status is: ${status}`)
        // const userDetails = await readUserData(uid);
        e.preventDefault();
        const userDetails = await readUserData(uid);
        const newBalance = userDetails.balance + parseFloat(amount);

       
        console.log(userDetails);
        await saveUserDataToDatabase(uid, {
            email: userDetails.email,
            password: userDetails.password,
            balance: newBalance
        })
        setStatus(`Your balance is: ${userDetails.balance}`);
      };
  
      return (
        <>
          <h2>Deposit</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Deposit Amount:</label>
              <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Enter deposit amount" 
                    value={amount} onChange={e => setAmount(e.currentTarget.value)}
                     />
            </div>
            <button type="submit" className="btn btn-primary" >
              Submit
            </button>
            <p>
                {status}
            </p>
          </form>
        </>
      );
    }
  


  

  export default Deposit;