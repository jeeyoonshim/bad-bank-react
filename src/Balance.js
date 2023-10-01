import React, { useState, useEffect } from "react";
import { readUserData } from "./firebaseDatabase";

function Balance({ uid }) {
  const [status, setStatus] = useState('');
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

  const handleSubmit = async () => {
    console.log('Button is clicked');
    const userDetails = await readUserData(uid);
    const userBalance = userDetails.balance[accountType];
    setStatus(`Your ${accountType} balance for ${userDetails.email} is: ${userBalance}`);
  };

  return (
    <div className="container mt-4 mb-4">
      <h2>Balance</h2>
      <h5>For Account {accountNumber}</h5>
      <form>
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
