import React, { useState, useEffect } from "react";
import { readUserData, saveUserDataToDatabase } from "./firebaseDatabase";

function Withdraw({ uid }) {
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState('');
  const [accountType, setAccountType] = useState('checking'); // Default to checking
  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await readUserData(uid);
      if (userData && userData.accountNumber) {
        setAccountNumber(userData.accountNumber);
      }
    };

    fetchUserData();
  }, [uid]);

  const handleAccountChange = (e) => {
    setAccountType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userDetails = await readUserData(uid);
    const currentBalance = userDetails.balance[accountType];
    const withdrawAmount = parseFloat(amount);
  
    if (withdrawAmount > currentBalance) {
      setStatus('Error: Withdraw amount exceeds available balance.');
      return;
    }
  
    const newBalance = {
      ...userDetails.balance,
      [accountType]: currentBalance - withdrawAmount
    };
  
    await saveUserDataToDatabase(uid, {
      email: userDetails.email,
      password: userDetails.password,
      checkingBalance: newBalance.checking,
      savingBalance: newBalance.saving
    });
  
    setStatus(`Withdraw successful. Your new ${accountType} balance is: ${newBalance[accountType]}`);
  };

  return (
    <div className="container mt-4 mb-4">
      <h2>Withdraw</h2>
      <h5>For Account {accountNumber}</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Account Type:</label>
          <select
            className="form-control"
            value={accountType}
            onChange={handleAccountChange}
          >
            <option value="checking">Checking</option>
            <option value="saving">Saving</option>
          </select>
        </div>
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
        <p className="pt-2 pb-2">
          {status}
        </p>
      </form>
    </div>
  );
}

export default Withdraw;
