import { ethers } from 'hardhat'
import { Contract } from 'ethers'
import chai from 'chai'
import { solidity } from "ethereum-waffle"
import { BigNumber } from 'ethers'
import { BnICHIPowah } from '../typechain/BnICHIPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { bnICHIPowahFixture, ichiPowahFixture } from '../lib/fixtures'
import { abi } from '@openzeppelin/contracts/build/contracts/IERC20.json'

chai.use(solidity);
const { expect } = chai;

describe('bnICHI_Powah', () => {
    let bnICHIFixture: BnICHIPowah
    let bnICHIToken: Contract
    let ICHIPowahFixture: ICHIPowah
    let bnICHIWallet: string
    let bnICHIAddress: string 
    const hundred = BigNumber.from(100)
    const null_bytes = ethers.constants.HashZero

    beforeEach(async () => {
        
        // 1
        const [deployer] = await ethers.getSigners()

        // 2
        bnICHIFixture = (await bnICHIPowahFixture()).bnICHIFixture
        bnICHIWallet = (await bnICHIPowahFixture()).bnICHIWallet
        bnICHIAddress = (await bnICHIPowahFixture()).bnICHIAddress

        // 3
        ICHIPowahFixture = (await ichiPowahFixture()).fixture
        bnICHIToken = new Contract(bnICHIAddress, abi, deployer);
    })

    describe('Return Values', async() => {
        it('Number of constituency should be 1', async() => {
            //can really only test this for forks on mainnet
            await ICHIPowahFixture.insertConstituency(bnICHIFixture.address,bnICHIAddress,hundred, null_bytes)
            const count = await ICHIPowahFixture.constituencyCount()
            expect(count.toNumber() >= 1)
        })
        it('Check constituency added', async() => {
            await ICHIPowahFixture.insertConstituency(bnICHIFixture.address,bnICHIAddress,hundred, null_bytes)
            const constituency = await ICHIPowahFixture.constituencyAtIndex((await ICHIPowahFixture.constituencyCount()).toNumber() - 1)
            expect(constituency == bnICHIAddress)
        })
        it('getSupply should be > 1', async() => {
            const supply = await bnICHIFixture.getSupply(bnICHIAddress)
            expect(!supply.isNegative)
            expect(!supply.isZero)
        })
        it('getPowah should produce accurate value', async() => {
            const calculated_powah = await bnICHIFixture.getPowah(bnICHIAddress, bnICHIWallet, null_bytes)
            const expected_powah = await bnICHIToken.balanceOf(bnICHIWallet);
            expect(calculated_powah.eq(expected_powah));
        })
    })
})