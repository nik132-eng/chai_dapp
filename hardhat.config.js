require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks:{
    hardhat: {
    },
    goerli:{
      url:GOERLI_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
