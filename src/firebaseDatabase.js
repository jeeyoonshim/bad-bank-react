import { getDatabase, ref, set, get } from 'firebase/database';
import { db } from './firebaseConfig';

const saveUserDataToDatabase = (userId, { email, password, balance }) => {
    const userRef = ref(db, `users/${userId}`);
    set(userRef, {
      email: email,
      password: password,
      balance: balance
    });
  };

const writeUserData = (userId, name, email, balance) => {
    const userRef = ref(getDatabase(), `users/${userId}`);
    set(userRef, {
      username: name,
      email: email,
      balance: balance
    });
};
/* 
  set(userRef, {
      username: name,
      email: email,
      
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

export { saveUserDataToDatabase, writeUserData, readUserData, readAllUsers };
