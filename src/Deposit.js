import { React, useState } from "react";
import { readUserData, saveUserDataToDatabase } from "./firebaseDatabase";

function Deposit({ uid }){
    const [status, setStatus] = useState('');
    const [amount, setAmount] = useState('');
  

    const handleSubmit = async e => {

        e.preventDefault();
        const userDetails = await readUserData(uid);
        const newBalance = userDetails.balance + parseFloat(amount);

       
        console.log(userDetails);
        await saveUserDataToDatabase(uid, {
            email: userDetails.email,
            password: userDetails.password,
            balance: newBalance
        })
        setStatus(`Your balance is: ${newBalance}`);
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