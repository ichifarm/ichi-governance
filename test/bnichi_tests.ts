import { ethers } from 'hardhat'
import { Contract } from 'ethers'
import chai from 'chai'
import { solidity } from "ethereum-waffle"
import { BigNumber } from 'ethers'
import { BnICHIPowah } from '../typechain/BnICHIPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { powahFixture } from '../lib/fixtures'
import { abi } from '@openzeppelin/contracts/build/contracts/IERC20.json'

chai.use(solidity);
const { expect } = chai;

describe('bnICHI_Powah', () => {
    let bnICHIPowah: BnICHIPowah
    let bnICHIToken: Contract
    let fixture: ICHIPowah
    const BancorICHIAddress = "0x36FAbE4cAeF8c190550b6f93c306A5644E7dCef6"
    const hundred = BigNumber.from(100)
    const null_bytes = ethers.constants.HashZero

    beforeEach(async () => {
        
        // 1
        const [deployer, user] = await ethers.getSigners()

        // 2
        const bnICHIPowahFactory = await ethers.getContractFactory('bnICHIPowah')
        bnICHIPowah = (await bnICHIPowahFactory.deploy()) as BnICHIPowah
        await bnICHIPowah.deployed()

        // 3
        fixture = (await powahFixture()).fixture
        bnICHIToken = new Contract(BancorICHIAddress, abi, deployer);
    })

    describe('Return Values', async() => {
        it('Number of constituency should be 1', async() => {
            //can really only test this for forks on mainnet
            await fixture.insertConstituency(bnICHIPowah.address,BancorICHIAddress,hundred, null_bytes)
            const count = await fixture.constituencyCount()
            expect(count.toNumber() >= 1)
        })
        it('Check constituency added', async() => {
            await fixture.insertConstituency(bnICHIPowah.address,BancorICHIAddress,hundred, null_bytes)
            const constituency = await fixture.constituencyAtIndex((await fixture.constituencyCount()).toNumber() - 1)
            expect(constituency == BancorICHIAddress)
        })
        it('getSupply should be > 1', async() => {
            const supply = await bnICHIPowah.getSupply(BancorICHIAddress)
            expect(!supply.isNegative)
            expect(!supply.isZero)
        })
        it('getPowah should produce accurate value', async() => {
            const wallet = '0x62a874497db511f7e4c8d6eeaaf61daf39e43aa4'
            const calculated_powah = await bnICHIPowah.getPowah(BancorICHIAddress, wallet, null_bytes)
            const expected_powah = await bnICHIToken.balanceOf(wallet);
            expect(calculated_powah.eq(expected_powah));
        })
    })
})