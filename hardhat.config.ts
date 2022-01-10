import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  defaultNetwork: "polygon",
  networks: {
    polygon: {
      url: "https://polygon-rpc.com",
      chainId: 137,
      accounts: [
        process.env.PRIVATE_KEY_OWNER || "",
        process.env.PRIVATE_KEY_OPERATOR || "",
      ].filter(Boolean),
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
