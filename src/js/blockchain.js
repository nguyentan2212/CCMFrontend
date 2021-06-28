var Web3 = require("web3");
var web3Provider = null;

const createWeb3 = async () => {
  if (window.ethereum) {
    web3Provider = window.ethereum;
    try {
      // Request account access
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
      console.error("User denied account access");
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    web3Provider = window.web3.currentProvider;
  }
  // If no injected web3 instance is detected, fall back to Ganache
  else {
    web3Provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
  }
};

createWeb3();
const web3 = new Web3(web3Provider);

export const getAccounts = () => {
  let accounts = web3.eth.getAccounts().then(function (acc) {
    return acc;
  });
  return accounts;
};

export const sign = (publicAddress, message) => {
  return new Promise((resolve, reject) =>
    web3.eth.personal.sign(
      web3.utils.fromUtf8(message),
      publicAddress,
      (err, signature) => {
        if (err) return reject(err);
        return resolve({ publicAddress, signature });
      }
    )
  );
};
