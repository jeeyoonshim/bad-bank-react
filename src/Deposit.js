import React, { useState, useEffect } from "react";
import { readUserData, saveUserDataToDatabase } from "./firebaseDatabase";

function Deposit({ uid }) {
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
    console.log('Amount:', amount);
    console.log('Account Type:', accountType);

    const userDetails = await readUserData(uid);
    const currentBalance = userDetails.balance[accountType];
    console.log('Current Balance:', currentBalance);
    const newBalance = currentBalance + parseFloat(amount);

    const updatedBalance = {
      ...userDetails.balance,
      [accountType]: newBalance
    };


    await saveUserDataToDatabase(uid, {
      email: userDetails.email,
      password: userDetails.password,
      checkingBalance: accountType === 'checking' ? newBalance : userDetails.balance.checking,
      savingBalance: accountType === 'saving' ? newBalance : userDetails.balance.saving
    });
    setStatus(`Deposit successful. Your ${accountType} balance is: ${newBalance} for user ${userDetails.email}`);
  };

  return (
    <div className="container mt-4 mb-4">
      <h2>Deposit</h2>
      <br />
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
          <label>Deposit Amount:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter deposit amount"
            value={amount}
            onChange={(e) => setAmount(e.currentTarget.value)}
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

export default Deposit;
