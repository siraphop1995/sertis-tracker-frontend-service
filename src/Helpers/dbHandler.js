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

export async function findUserDate(userId) {
  return (await axios.post(`${DATE_SERVER}/findUserDate`, { userId: userId })).data.user;
}