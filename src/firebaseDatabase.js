import { getDatabase, ref, set, get } from 'firebase/database';
import { db } from './firebaseConfig';

const generateAccountNumber = () => {
  const min = 10000000; // Minimum eight-digit number
  const max = 99999999; // Maximum eight-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const saveUserDataToDatabase = (userId, { email, password, checkingBalance, savingBalance }) => {
  const accountNumber = generateAccountNumber();

  const newBalance = {
    checking: checkingBalance || 0,
    saving: savingBalance || 0
  };

  console.log('Data to be saved:', {
    email: email,
    password: password,
    balance: newBalance,
    accountNumber: accountNumber
  });


  const userRef = ref(db, `users/${userId}`);
  set(userRef, {
    email: email,
    password: password,
    balance: newBalance,
    accountNumber: accountNumber
  });
};

// const writeUserData = (userId, name, email, balance) => {
//     const userRef = ref(getDatabase(), `users/${userId}`);
//     set(userRef, {
//       username: name,
//       email: email,
//       balance: balance
//     });
// };
/* 
  set(userRef, {
      username: name,
      email: email,
      balance: [
        {checking: balance},
        {saving: balance}
      ]
      
    });
*/

const readUserData = async (userId) => {
    const userRef = ref(getDatabase(), `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No data available');
      return null;
    }
};

const readAllUsers = async () => {
  const allUsers = ref(getDatabase(), `users`);
  const snapshot = await get(allUsers);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log('No users in database');
    return null;
  }
};

export { saveUserDataToDatabase, readUserData, readAllUsers };
