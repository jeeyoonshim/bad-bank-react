import React, { useState } from "react";
import { readAllUsers } from "./firebaseDatabase";

function AllData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log('button is clicked')
      const allUserDetails = await readAllUsers();
      if (allUserDetails) {
        const usersArray = Object.values(allUserDetails).map(user => {
          return {
            id: user.accountNumber, // Use account number as ID for simplicity
            email: user.email,
            checkingBalance: user.balance.checking,
            savingBalance: user.balance.saving
          };
        });
        setData(usersArray);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching all users:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <h2>AllData</h2>
      <form>
        <div className="form-group">
          <label>Check All Users:</label>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          All Users
        </button>
        <br />
        <br />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Email</th>
                <th>Checking Balance</th>
                <th>Saving Balance</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.checkingBalance}</td>
                  <td>{user.savingBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </form>
    </div>
  );
}

export default AllData;
