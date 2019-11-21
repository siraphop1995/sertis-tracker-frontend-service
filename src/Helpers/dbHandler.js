import axios from 'axios';

const USER_SERVER = process.env.REACT_APP_USER_SERVER;
const DATE_SERVER = process.env.REACT_APP_DATE_SERVER;
// const LINE_SERVER = process.env.REACT_APP_LINE_SERVER;

export async function getUserList() {
  return (await axios.get(`${USER_SERVER}/getAllUsers`)).data.user;
}

export async function createUser(userData) {
  return (
    await axios.post(`${USER_SERVER}/createUser`, {
      ...userData
    })
  ).data;
}

export async function updateUser(id, userData) {
  let newData = {
    firstName: userData.firstName,
    lastName: userData.lastName
  };
  return (
    await axios.patch(`${USER_SERVER}/updateUser/${id}`, {
      ...newData
    })
  ).data;
}

export async function updateDateUser(did, uid, newData) {
  return (
    await axios.post(`${DATE_SERVER}/updateDateUser`, {
      uid: uid,
      did: did,
      newData: newData
    })
  ).data;
}

export async function findUserDate(userId, monthQuery) {
  return (
    await axios.post(`${DATE_SERVER}/findUserDate`, {
      userId: userId,
      monthQuery: monthQuery
    })
  ).data.user;
}

export async function findDate(dateQuery) {
  console.log(dateQuery);
  return (
    await axios.post(`${DATE_SERVER}/findDate`, {
      dateQuery: dateQuery
    })
  ).data.date;
}
