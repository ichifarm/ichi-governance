import { ethers } from "hardhat";
import { BnICHIPowah } from "../typechain/BnICHIPowah";
import { ICHIFarmPowah } from "../typechain/ICHIFarmPowah";
import { ICHIBancorInsurance } from "../typechain/ICHIBancorInsurance";
import { OneINCHICHIPowah } from "../typechain/oneINCHICHIPowah";
import { SushiICHIPowah } from "../typechain/sushiICHIPowah";
import { XICHIPowah } from "../typechain/xICHIPowah";
import { ICHIPowah } from "../typechain/ICHIPowah";
import { BigNumber } from 'ethers'

import { Fixture } from "ethereum-waffle";

interface BnICHIPowahFixture {
  bnICHIAddress: string;
  bnICHIFixture: BnICHIPowah;
  bnICHIWallet: string;
}

export async function bnICHIPowahFixture(): Promise<BnICHIPowahFixture> {
  const bnICHIPowahFactory = await ethers.getContractFactory("bnICHIPowah");
  const bnICHIFixture = (await bnICHIPowahFactory.deploy()) as BnICHIPowah;

  const bnICHIAddress = "0x36FAbE4cAeF8c190550b6f93c306A5644E7dCef6";

  const bnICHIWallet = "0x62a874497db511f7e4c8d6eeaaf61daf39e43aa4";
  return { bnICHIFixture, bnICHIAddress, bnICHIWallet };
}

interface ICHIFarmPowahFixture {
  ichiFarmFixture: ICHIFarmPowah;
  ichiFarmPoolID: string;
  ichiEthLP: string;
  ichiEthWallet: string;
  ichiEthPoolID: string;
  ichiLinkLP: string;
  ichiLinkWallet: string;
  ichiLinkPoolID: string;
  ichiEthUniLP: string;
  ichiEthUniWallet: string;
  ichiEthUniPoolID: string;
}

export async function ichiFarmPowahFixture(): Promise<ICHIFarmPowahFixture> {
  const ICHIFarmPowahFactory = await ethers.getContractFactory("ICHIFarmPowah");
  const ichiFarmFixture =
    (await ICHIFarmPowahFactory.deploy()) as ICHIFarmPowah;

  const ichiFarmPoolID =
    "0x0000000000000000000000000000000000000000000000000000000000000004";
  const ichiEthPoolID =
    "0x0000000000000000000000000000000000000000000000000000000000000001";
  const ichiLinkPoolID =
    "0x0000000000000000000000000000000000000000000000000000000000000008";
  const ichiEthUniPoolID =
    "0x0000000000000000000000000000000000000000000000000000000000000005";

  const ichiEthLP = "0x58378f5F8Ca85144ebD8e1E5e2ad95B02D29d2BB";
  const ichiEthWallet = "0x11111D16485aa71D2f2BfFBD294DCACbaE79c1d4";
  const ichiLinkLP = "0x960c437E2A9A9a25e0FEDC0C8A5899827B10F63c";
  const ichiLinkWallet = "0x7a09696e30192974d732ceb3e82e1306385886ff";
  const ichiEthUniLP = "0xd07D430Db20d2D7E0c4C11759256adBCC355B20C";
  const ichiEthUniWallet = "0xF1C5B7f8D467DE7Ef26eE3dFc6D15E8186e75f60";

  return {
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
  };
}

interface ICHIBancorInsuranceFixture {
  ichiBancorFixture: ICHIBancorInsurance;
  ichiBancorInsuranceWallet: string;
  ichiBancorInsuranceLP: string;
  ichiBancorInsurancePoolID: string;
}

export async function ichiBancorInsuranceFixture(): Promise<ICHIBancorInsuranceFixture> {
  const ICHIBancorInsuranceFactory = await ethers.getContractFactory(
    "ICHIBancorInsurance"
  );
  const ichiBancorFixture =
    (await ICHIBancorInsuranceFactory.deploy()) as ICHIBancorInsurance;

  const ichiBancorInsuranceWallet =
    "0x2ecda5574e4ae1b257eb439bc9930fb3aebef53a";
  const ichiBancorInsuranceLP = "0x4a2F0Ca5E03B2cF81AebD936328CF2085037b63B";
  const ichiBancorInsurancePoolID =
    "0x0000000000000000000000000000000000000000000000000000000000000000";

  return {
    ichiBancorFixture,
    ichiBancorInsuranceWallet,
    ichiBancorInsuranceLP,
    ichiBancorInsurancePoolID,
  };
}

interface OneINCHICHIPowahFixture {
  oneINCHICHIFixture: OneINCHICHIPowah;
  oneINCHICHIWallet: string;
  oneINCHICHIAddress: string;
}

export async function oneINCHICHIPowahFixture(): Promise<OneINCHICHIPowahFixture> {
  const OneINCHICHIPowahFactory = await ethers.getContractFactory(
    "oneINCHICHIPowah"
  );
  const oneINCHICHIFixture =
    (await OneINCHICHIPowahFactory.deploy()) as OneINCHICHIPowah;

  const oneINCHICHIWallet = "0x11111D16485aa71D2f2BfFBD294DCACbaE79c1d4";
  const oneINCHICHIAddress = "0x1dcE26F543E591c27717e25294AEbbF59AD9f3a5";

  return { oneINCHICHIFixture, oneINCHICHIWallet, oneINCHICHIAddress };
}

interface SushiICHIPowahFixture {
  sushiICHIFixture: SushiICHIPowah;
  sushiICHIWallet: string;
  ethICHIWallet: string;
  sushiICHIPoolID: string;
}

export async function sushiICHIPowahFixture(): Promise<SushiICHIPowahFixture> {
  const sushiICHIPowahFactory = await ethers.getContractFactory(
    "sushiICHIPowah"
  );
  const sushiICHIFixture =
    (await sushiICHIPowahFactory.deploy()) as SushiICHIPowah;

  const sushiICHIWallet = "0xbfd4ec210c56b55741dd97d1c6b80d33042d6946";
  const sushiICHIPoolID =
    "0x0000000000000000000000000000000000000000000000000000000000000004";
  const ethICHIWallet = "0x9cD028B1287803250B1e226F0180EB725428d069";

  return { sushiICHIFixture, sushiICHIWallet, ethICHIWallet, sushiICHIPoolID };
}

interface XICHIPowahFixture {
  xICHIfixture: XICHIPowah;
  xICHIWallet: string;
  xICHIAddress: string;
}

export async function xICHIPowahFixture(): Promise<XICHIPowahFixture> {
  const xICHIPowahFactory = await ethers.getContractFactory("xICHIPowah");
  const xICHIfixture = (await xICHIPowahFactory.deploy()) as XICHIPowah;

  const xICHIWallet = "0xef03c219614c5b2532f9bE17f92E2CcB2c1Eb005";
  const xICHIAddress = "0x70605a6457B0A8fBf1EEE896911895296eAB467E";

  return { xICHIfixture, xICHIWallet, xICHIAddress };
}

interface ICHIPowahFixture {
  fixture: ICHIPowah;
}

export async function ichiPowahFixture(): Promise<ICHIPowahFixture> {
  const ichiPowahFactory = await ethers.getContractFactory("ICHIPowah");
  const fixture = (await ichiPowahFactory.deploy()) as ICHIPowah;
  return { fixture };
}

type ICHIGovernanceTestFixture = ICHIPowahFixture &
  XICHIPowahFixture &
  SushiICHIPowahFixture &
  OneINCHICHIPowahFixture &
  ICHIBancorInsuranceFixture &
  ICHIFarmPowahFixture &
  BnICHIPowahFixture;

export const ichiGovernanceTestFixture: Fixture<ICHIGovernanceTestFixture> =
  async function (): Promise<ICHIGovernanceTestFixture> {
    const { fixture } = await ichiPowahFixture();
    const { xICHIfixture, xICHIWallet, xICHIAddress } =
      await xICHIPowahFixture();
    const {
      sushiICHIFixture,
      sushiICHIWallet,
      ethICHIWallet,
      sushiICHIPoolID,
    } = await sushiICHIPowahFixture();
    const { oneINCHICHIFixture, oneINCHICHIWallet, oneINCHICHIAddress } =
      await oneINCHICHIPowahFixture();
    const {
      ichiBancorFixture,
      ichiBancorInsuranceWallet,
      ichiBancorInsuranceLP,
      ichiBancorInsurancePoolID,
    } = await ichiBancorInsuranceFixture();
    const {
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
    } = await ichiFarmPowahFixture();
    const { bnICHIFixture, bnICHIAddress, bnICHIWallet } =
      await bnICHIPowahFixture();
    const hundred = BigNumber.from(100)
    const null_bytes = ethers.constants.HashZero
  

    await fixture.insertConstituency(bnICHIFixture.address,bnICHIAddress,hundred, null_bytes)
    await fixture.insertConstituency(oneINCHICHIFixture.address,oneINCHICHIAddress,hundred, null_bytes)
    await fixture.insertConstituency(ichiBancorFixture.address,ichiBancorInsuranceLP,hundred, ichiBancorInsurancePoolID)
    await fixture.insertConstituency(sushiICHIFixture.address,ethICHIWallet,hundred, sushiICHIPoolID)

    await fixture.insertConstituency(ichiFarmFixture.address,ichiEthLP,hundred, ichiEthPoolID)
    await fixture.insertConstituency(ichiFarmFixture.address,ichiLinkLP,hundred, ichiLinkWallet)
    await fixture.insertConstituency(ichiFarmFixture.address,ichiEthUniLP,hundred, ichiEthUniLP)
    await fixture.insertConstituency(xICHIfixture.address,xICHIAddress,hundred, null_bytes)

    return {
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
      bnICHIWallet
    };
  };
