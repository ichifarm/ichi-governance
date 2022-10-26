import { ethers, waffle, network } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";

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

  beforeEach(async () => {
    ({
      fixture, // ICHIPowahContract
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

    
    await fixture.insertConstituency(bnICHIAddress,bnICHIFixture.address,hundred, null_bytes)
    await fixture.insertConstituency(oneINCHICHIAddress,oneINCHICHIFixture.address,hundred, null_bytes)
    await fixture.insertConstituency(ichiBancorInsuranceLP,ichiBancorFixture.address,hundred, ichiBancorInsurancePoolID)
    await fixture.insertConstituency(ethICHIWallet,sushiICHIFixture.address,hundred, sushiICHIPoolID)
    await fixture.insertConstituency(ichiEthLP,ichiFarmFixture.address,hundred, ichiEthPoolID)
    /*
    await fixture.insertConstituency(ichiFarmFixture.address,ichiLinkLP,hundred, ichiLinkPoolID)
    await fixture.insertConstituency(ichiFarmFixture.address,ichiEthUniLP,hundred, ichiEthUniPoolID)
    */
    await fixture.insertConstituency(xICHIAddress,xICHIfixture.address,hundred, null_bytes)
    
  });

  describe("Return Values", async () => {
    
    it('Number of constituency should be 6', async() => {
      //can really only test this for forks on mainnet
      const count = await fixture.constituencyCount();
      expect(count.eq(6)).to.be.true;
    })   
    // Check This
    it('Random user should have accurate powah', async() => {
      const expectedPowah = await bnICHIFixture.getPowah(bnICHIAddress, bnICHIWallet, null_bytes);
      const calculatedPowah = await fixture.balanceOf(bnICHIWallet);
      expect(expectedPowah.eq(calculatedPowah)).to.be.true;
    })
    // Check This
    it('Zero user should have no powah', async() => {
      //can really only test this for forks on mainnet
      const badAddress = "0x0000000000000000000000000000000000000000";
      const badUserPowah = await fixture.balanceOf(badAddress);
      expect(badUserPowah.isZero()).to.be.true;
    })
    // Check This
    it('Bad user should have no powah', async() => {
      //can really only test this for forks on mainnet
      const badAddress = "0x3Dd7050e65a2557a78d9ddb3eD796860be735435";
      const badUserPowah = await fixture.balanceOf(badAddress);
      expect(badUserPowah.isZero()).to.be.true;
    })
    // Check This
    it('Total supply should be positive', async() => {
      const totalSupply = await fixture.totalSupply()
      expect(totalSupply.gt(0)).to.be.true;
    })
    it('Constituency should not be added twice', async() => {
      //can really only test this for forks on mainnet
      await expect(fixture.insertConstituency(ichiEthLP, ichiFarmFixture.address,hundred, ichiLinkPoolID)).to.be.revertedWith("ICHIPowah: constituency is already registered.")
    })
    it('Check constituency added in correct order - first', async() => {
      const bnICHIConstit1 = await fixture.constituencyAtIndex(0) ;     
      expect(bnICHIAddress == bnICHIConstit1).to.be.true;
    })
    it('Check constituency added in correct order - last', async() => {
      const xICHIConstit1 = await fixture.constituencyAtIndex(5)      
      expect(xICHIAddress == xICHIConstit1).to.be.true;
    })
    it('Constituency should be succesfully deleted', async() => {
      await fixture.deleteConstituency(bnICHIAddress);
      const count = await fixture.constituencyCount();
      expect(count.eq(5)).to.be.true;
    })
    it('Deleted constituency cannot be removed again', async() => {
      await fixture.deleteConstituency(bnICHIAddress);
      await expect(fixture.deleteConstituency(bnICHIAddress)).to.be.revertedWith("ICHIPowah: unknown instance");
    })
    it('Succesfully update constituency', async() => {
      const initialSupply = await ichiFarmFixture.getSupply(ichiEthUniLP);
      await fixture.updateConstituency(ichiEthLP,ichiFarmFixture.address,twoHundred, ichiLinkPoolID);
      const finalSupply = await ichiFarmFixture.getSupply(ichiEthUniLP);
      expect(finalSupply.gte(initialSupply)).to.be.true;
    })
    it('Not succesfully update wrong constituency', async() => {
      const badAddress = "0x3Dd7050e65a2557a78d9ddb3eD796860be735435";
      await expect(fixture.updateConstituency(badAddress,xICHIfixture.address,hundred, null_bytes)).to.be.revertedWith("ICHIPowah unknown constituency");
    })
    it('Remove all constituencies without error', async() => {
      await fixture.deleteConstituency(bnICHIAddress);
      await fixture.deleteConstituency(oneINCHICHIAddress);
      await fixture.deleteConstituency(ichiBancorInsuranceLP);
      await fixture.deleteConstituency(ethICHIWallet);
      await fixture.deleteConstituency(ichiEthLP);
      await fixture.deleteConstituency(xICHIAddress);

      const count = await fixture.constituencyCount();
      expect(count.eq(0)).to.be.true;
    })
  })
});
