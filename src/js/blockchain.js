const Web3 = require("web3");
var Contract = require("web3-eth-contract");
const UserManagerJson = require("../contracts/artifacts/UserManager.json");
const CapitalManagerJson = require("../contracts/artifacts/CapitalManager.json");

const UserManagerContract = "0xcFF9C6B47FCA10Dfe4e83de887Ebe39dC219af83";
const CapitalManagerContract = "0x2cE1Ad3fbd444BE0C5FC2396eF2D8F35d3F60408";
var web3Provider = null;
var userManager = null;
var capitalManager = null;

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

const initContracts = () => {
  Contract.setProvider(web3Provider);

  userManager = new Contract(UserManagerJson.abi, UserManagerContract);
  capitalManager = new Contract(CapitalManagerJson.abi, CapitalManagerContract);
};

initContracts();

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

export const blockRegister = (userAddress) => {
  const result = userManager.methods.register().send({ from: userAddress });
  return result;
};

export const blockLock = (userAddress, lockedAddress) => {
  const result = userManager.methods
    .lock(lockedAddress)
    .send({ from: userAddress });
  return result;
};

export const blockUnlock = (userAddress, unlockedAddress) => {
  const result = userManager.methods
    .unlock(unlockedAddress)
    .send({ from: userAddress });
  return result;
};

export const blockPromote = (userAddress, promotedAddress) => {
  console.log(userAddress, promotedAddress);
  const result = userManager.methods
    .promote(promotedAddress)
    .send({ from: userAddress });
  return result;
};

export const blockDemote = (userAddress, demotedAddress) => {
  const result = userManager.methods
    .demote(demotedAddress)
    .send({ from: userAddress });
  return result;
};

export const blockCreateCapital = (userAddress, capital) => {
  let type = capital.type === "Equity" ? 1 : 0;
  let asset = capital.asset === "ShortTermAsset" ? 0 : 1;

  const result = capitalManager.methods
    .createCapital(
      capital.id,
      capital.title,
      capital.description,
      type,
      asset,
      capital.value
    )
    .send({ from: userAddress });
  return result;
};

export const blockCancel = (userAddress, id) => {
  const result = capitalManager.methods.cancel(id).send({ from: userAddress });
  return result;
};
