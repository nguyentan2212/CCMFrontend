import axios from "axios";
import { getToken, saveToken } from "./localStorageToken";

const jwtToken = getToken();
const requestConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + jwtToken,
  },
};

export const instance = axios.create({
  baseURL: "https://localhost:5001/api/",
  requestConfig,
});

export const getNonce = (publicAddress) => {
  const result = instance
    .get("account/nonce/" + publicAddress)
    .then(({ data }) => data);
  return result;
};

export const login = (publicAddress, signature) => {
  const result = instance
    .post("account/login/", {
      publicAddress: publicAddress,
      signature: signature,
    })
    .then((res) => {
      if (res.status === 200) {
        saveToken(res.data);
      }
      return res;
    })
    .catch((res) => res);
  return result;
};

export const register = (user) => {
  const result = instance
    .post("account/register/", {
      publicAddress: user.publicAddress,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
    })
    .then((res) => {
      if (res.status === 200) {
        saveToken(res.data);
      }
      return res;
    });
  return result;
};

export const demoteUser = (userId) => {
  const result = instance
    .post(`account/promote?userId=${userId}&isPromote=false`)
    .then(({ status }) => status);
  return result;
};

export const promoteUser = (userId) => {
  const result = instance
    .post(`account/promote?userId=${userId}&isPromote=true`)
    .then(({ status }) => status);
  return result;
};

export const lockUser = (userId) => {
  const result = instance
    .post(`account/locked?userId=${userId}&isLocked=true`)
    .then(({ status }) => status);
  return result;
};

export const unlockUser = (userId) => {
  const result = instance
    .post(`account/locked?userId=${userId}&isLocked=false`)
    .then(({ status }) => status);
  return result;
};

export const getUsers = () => {
  const result = instance.get("account/").then(({ data }) => data);
  return result;
};

export const getUser = (userId) => {
  const result = instance.get(`account/${userId}`).then(({ data }) => data);
  return result;
};

export const getCreatedCapitals = (userId) => {
  const result = instance
    .get(`Capital/user/${userId}`)
    .then(({ data }) => data);
  return result;
};

export const updateUser = (user) => {
  const result = instance.post("Account/update",user).then((result) => result);
  return result;
}

export const getCapitals = () => {
  const result = instance.get("capital/").then(({ data }) => data);
  return result;
};

export const getCapitalById = (id) => {
  const result = instance.get(`Capital/${id}`).then(({ data }) => data);
  return result;
};

export const cancelCapital = (id) => {
  const result = instance
    .post(`Capital/cancel/${id}`)
    .then(({ status }) => status);
  return result;
};

export const createCapital = (capital) => {
  const result = instance
    .post("Capital/create/", {
      ...capital,
      value: parseInt(capital.value),
      type: parseInt(capital.type),
      asset: parseInt(capital.asset),
    })
    .then((res) => res)
    .catch((error) => {
      console.log(error);
      return error.status;
    });
  return result;
};

export const getStatistic = () => {
  const result = instance.get("Statistical/").then(({data}) => data);
  return result;
}
