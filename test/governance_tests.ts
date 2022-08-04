import { ethers, waffle, network } from "hardhat";
import { Contract } from "ethers";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";
import { abi } from "@openzeppelin/contracts/build/contracts/IERC20.json";

import { BnICHIPowah } from "../typechain/BnICHIPowah";
import { ICHIFarmPowah } from "../typechain/ICHIFarmPowah";
import { ICHIBancorInsurance } from "../typechain/ICHIBancorInsurance";
import { OneINCHICHIPowah } from "../typechain/oneINCHICHIPowah";
import { SushiICHIPowah } from "../typechain/sushiICHIPowah";
import { XICHIPowah } from "../typechain/xICHIPowah";
import { ICHIPowah } from "../typechain/ICHIPowah";

import { ichiGovernanceTestFixture } from "../lib/fixtures";
chai.use(solidity);
const { expect } = chai;

const createFixtureLoader = waffle.createFixtureLoader;

describe("System Level Testing", () => {
  const [wallet, alice, bob, carol, other] = waffle.provider.getWallets();

  let fixture: ICHIPowah;

  let bnICHIFixture: BnICHIPowah;
  let bnICHIToken: Contract;
  let bnICHIWallet: string;
  let bnICHIAddress: string;

  let ichiBancorFixture: ICHIBancorInsurance;
  let ichiBancorInsurancePoolID: string;
  let ichiBancorInsuranceLP: string;
  let ichiBancorInsuranceWallet: string;

  let sushiICHIFixture: SushiICHIPowah;
  let ethICHIWallet: string;
  let sushiICHIPoolID: string;
  let sushiICHIWallet: string;

  let ichiFarmFixture: ICHIFarmPowah;
  let ichiFarmPoolID: string;
  let ichiEthPoolID: string;
  let ichiLinkPoolID: string;
  let ichiEthUniPoolID: string;

  let ichiEthLP: string;
  let ichiEthWallet: string;
  let ichiLinkLP: string;
  let ichiLinkWallet: string;
  let ichiEthUniLP: string;
  let ichiEthUniWallet: string;

  let xICHIfixture: XICHIPowah;
  let xICHIAddress: string;
  let xICHIWallet: string;

  let oneINCHICHIFixture: OneINCHICHIPowah;
  let oneINCHICHIWallet: string;
  let oneINCHICHIAddress: string;

  const hundred = BigNumber.from(100);
  const null_bytes = ethers.constants.HashZero;

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, other]);
  });

  beforeEach(async () => {
    // 1
    ({
      fixture,
      xICHIfixture,
      xICHIWallet,
      xICHIAddress,
      sushiICHIFixture,
      sushiICHIWallet,
      ethICHIWallet,
      sushiICHIPoolID,
      oneINCHICHIFixture,
      oneINCHICHIWallet,
      oneINCHICHIAddress,
      ichiBancorFixture,
      ichiBancorInsuranceWallet,
      ichiBancorInsuranceLP,
      ichiBancorInsurancePoolID,
      ichiFarmFixture,
      ichiFarmPoolID,
      ichiEthLP,
      ichiEthWallet,
      ichiEthPoolID,
      ichiLinkLP,
      ichiLinkWallet,
      ichiLinkPoolID,
      ichiEthUniLP,
      ichiEthUniWallet,
      ichiEthUniPoolID,
      bnICHIFixture,
      bnICHIAddress,
      bnICHIWallet,
    } = await loadFixture(ichiGovernanceTestFixture));
  });

  describe("Return Values", async () => {});
});
