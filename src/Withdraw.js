import React, { useState } from "react";
import { readUserData, saveUserDataToDatabase } from "./firebaseDatabase";

function Withdraw({ uid }) {
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDetails = await readUserData(uid);
    console.log(userDetails)
    const withdrawAmount = parseFloat(amount);
    if(withdrawAmount > userDetails.balance) {
        setStatus('Error: Withdraw amount exceeds available balance.')
        return;
    }
    const newBalance = userDetails.balance - withdrawAmount;

    await saveUserDataToDatabase(uid, {
      email: userDetails.email,
      password: userDetails.password,
      balance: newBalance
    });

    setStatus(`Withdraw successful. Your new balance is: ${newBalance}`);
    console.log(userDetails.email)
    console.log(`Withdraw successful. Your new balance is: ${newBalance} for user ${userDetails.email}`)
  };

  return (
    <>
      <h2>Withdraw</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Withdraw Amount:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter withdraw amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p>{status}</p>
      </form>
    </>
  );
}

export default Withdraw;
