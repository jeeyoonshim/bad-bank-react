import React, { useState, useEffect } from "react";
import { readAllUsers } from "./firebaseDatabase";

function AllData(){
  const [data, setData] = useState([]);   

    const handleSubmit = async e => {
        console.log('button is clicked')
        const allUserDetails = await readAllUsers();
        if (allUserDetails) {
          const usersArray = Object.values(allUserDetails);
          setData(usersArray);
        } else {
          setData([]);
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
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
    );
};


export default AllData;