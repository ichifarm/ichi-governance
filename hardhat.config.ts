import { HardhatUserConfig } from 'hardhat/types';

import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-typechain'
import 'hardhat-abi-exporter'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import 'hardhat-gas-reporter'
import 'hardhat-spdx-license-identifier'
import 'dotenv/config'
import "hardhat-watcher";

//import { HardhatUserConfig } from "hardhat/types";

const config: HardhatUserConfig = {
  abiExporter: {
    path: './abi',
    clear: false,
    flat: true,
    // only: [],
    // except: []
  },
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: "USD",
    enabled: process.env.REPORT_GAS === "true",
    excludeContracts: ["contracts/mocks/", "contracts/libraries/"],
  },
  namedAccounts: {
    deployer: {
      default: 0
    },
    dev: {
      // Default to 1
      default: 1,
      // dev address mainnet
      // 1: "",
    }
  },
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.MAINNET_PK}`],
      saveDeployments: true,
      gasPrice: 120 * 1000000000,
      chainId: 1,
    },
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ["local"],
    },
    hardhat: {
      forking: {
        enabled: process.env.FORKING === "false",
        url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      },
      live: false,
      saveDeployments: true,
      tags: ["test", "local"],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.TESTNET_PK}`],
      chainId: 42,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 20000000000,
      gasMultiplier: 2
    },
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
  solidity: {
    compilers: [
      { 
        version: '0.7.6', 
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        } 
      }
    ],
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  watcher: {
    compile: {
      tasks: ["compile"],
      files: ["./contracts"],
      verbose: true,
    },
  },
}
export default config