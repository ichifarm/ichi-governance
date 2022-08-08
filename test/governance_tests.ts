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

describe("System Level Testing", () => {
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
  const twoHundred = BigNumber.from(200);
  const null_bytes = ethers.constants.HashZero;

  before(async () => {
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
    } = await ichiGovernanceTestFixture())
  });

  describe("Return Values", async () => {
    it('Number of constituency should be 8', async() => {
      //can really only test this for forks on mainnet
      const count = await fixture.constituencyCount()
      console.log(count.toNumber())
      expect(count.eq(8))
    })
    it('Check constituency added in correct order - first', async() => {
      const bnICHIConstit1 = await fixture.constituencyAtIndex(0)      
      expect(bnICHIAddress == bnICHIConstit1)
    })
    it('Check constituency added in correct order - last', async() => {
      const xICHIConstit1 = await fixture.constituencyAtIndex(7)      
      expect(xICHIAddress == xICHIConstit1)
    })
    it('Total supply should be greater than one', async() => {
      const totalSupply = await fixture.totalSupply()      
      expect(totalSupply.isNegative()).to.equal(false)
      expect(totalSupply.isZero()).to.equal(false)
    })
    it('getPowah should produce accurate value for random user', async() => {
      const expected_powah = await fixture.balanceOf("0x2ecda5574e4ae1b257eb439bc9930fb3aebef53a")
      const calculated_powah = await ichiBancorFixture.getPowah(ichiBancorInsuranceLP, ichiBancorInsuranceWallet, ichiBancorInsurancePoolID)
      expect(calculated_powah.eq(expected_powah));
    })
    it('Constituency should be succesfully deleted', async() => {
      await fixture.deleteConstituency(bnICHIFixture.address)
      const count = await fixture.constituencyCount()
      expect(count.eq(7))
    })
    it('Deleted constituency should have no powah', async() => {
      const calculated_powah = await bnICHIFixture.getPowah(bnICHIAddress, bnICHIWallet, null_bytes)
      const expected_powah = 0
      expect(calculated_powah.eq(expected_powah));
    })
    it('Succesfully update constituency', async() => {
      const calculated_powah_first = await xICHIfixture.getPowah(xICHIAddress, xICHIWallet, null_bytes)
      await fixture.updateConstituency(xICHIfixture.address,xICHIAddress,twoHundred, null_bytes)
      const calculated_powah_second = await xICHIfixture.getPowah(xICHIAddress, xICHIWallet, null_bytes)
      expect(calculated_powah_second.toNumber() == (2 * calculated_powah_first.toNumber()));
    })
    it('Not succesfully update wrong constituency', async() => {
      const badAddress = "0x3Dd7050e65a2557a78d9ddb3eD796860be735435"
      await expect(fixture.updateConstituency(badAddress,xICHIAddress,hundred, null_bytes)).to.be.revertedWith("ICHIPowah unknown constituency")
    })
  })
});
