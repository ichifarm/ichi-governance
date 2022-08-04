import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { XICHIPowah } from '../typechain/xICHIPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { xICHIPowahFixture, ichiPowahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('xICHI_Powah', () => {
    let xICHIFixture: XICHIPowah
    let ICHIPowahFixture: ICHIPowah
    let xICHIAddress: string;
    let xICHIWallet: string;
    const hundred = BigNumber.from(100)
    const null_bytes = ethers.constants.HashZero

    beforeEach(async () => {
        
        // 1
        xICHIFixture = (await xICHIPowahFixture()).xICHIfixture
        xICHIAddress = (await xICHIPowahFixture()).xICHIAddress
        xICHIWallet = (await xICHIPowahFixture()).xICHIWallet

        // 3 
        ICHIPowahFixture = (await ichiPowahFixture()).fixture

    })

    describe('Return Values', async() => {
        it('Number of constituency should be 1', async() => {
            //can really only test this for forks on mainnet
            await ICHIPowahFixture.insertConstituency(xICHIFixture.address,xICHIAddress,hundred, null_bytes)
            const count = await ICHIPowahFixture.constituencyCount()
            expect(count.toNumber() == 1)
        })
        it('Check constituency added', async() => {
            await ICHIPowahFixture.insertConstituency(xICHIFixture.address,xICHIAddress,hundred, null_bytes)
            const constituency = await ICHIPowahFixture.constituencyAtIndex((await ICHIPowahFixture.constituencyCount()).toNumber() - 1)
            expect(constituency == xICHIAddress)
        })
        it('getSupply should be > 1', async() => {
            const supply = await xICHIFixture.getSupply(xICHIAddress)
            expect(!supply.isNegative)
            expect(!supply.isZero)
        })
        it('getPowah shoud be > 1', async() => {
            const powah = await xICHIFixture.getPowah(xICHIAddress, xICHIWallet, null_bytes)
            expect(!powah.isNegative)
            expect(!powah.isZero)
        })
    })
})