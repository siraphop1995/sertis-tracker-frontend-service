import axios from 'axios';

const USER_SERVER = 'http://localhost:7001';
const DATE_SERVER = 'http://localhost:7002';
// const LINE_SERVER = 'http://localhost:7003'

export async function getUserList() {
  return (await axios.get(`${USER_SERVER}/getAllUsers`)).data.map(user => {
    return {
      _id: user._id,
      lid: user.lid,
      uid: user.uid,
      inTime: undefined,
      outTime: undefined,
      status: 'unverify'
    };
  });
}

export async function updateDateUser(userData, userDate) {
  return (
    await axios.post(`${DATE_SERVER}/updateDateUser`, {
      userData: userData,
      userDate: userDate
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
  console.log(dateQuery)
  return (
    await axios.post(`${DATE_SERVER}/findDate`, {
      dateQuery: dateQuery
    })
  ).data.date;
}