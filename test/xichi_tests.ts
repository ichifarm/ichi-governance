import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { XICHIPowah } from '../typechain/xICHIPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { powahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('xICHI_Powah', () => {
    let xICHIPowah: XICHIPowah
    let fixture: ICHIPowah
    const xICHIAddress = "0x70605a6457B0A8fBf1EEE896911895296eAB467E"
    const hundred = BigNumber.from(100)
    const null_bytes = ethers.constants.HashZero

    beforeEach(async () => {
        
        // 1
        const [deployer, user] = await ethers.getSigners()

        // 2
        const xICHIPowahFactory = await ethers.getContractFactory('xICHIPowah')
        xICHIPowah = (await xICHIPowahFactory.deploy()) as XICHIPowah
        await xICHIPowah.deployed()

        // 3 
        fixture = (await powahFixture()).fixture

    })

    describe('Return Values', async() => {
        it('Number of constituency should be 1', async() => {
            //can really only test this for forks on mainnet
            await fixture.insertConstituency(xICHIPowah.address,xICHIAddress,hundred, null_bytes)
            const count = await fixture.constituencyCount()
            expect(count.toNumber() == 1)
        })
        it('Check constituency added', async() => {
            await fixture.insertConstituency(xICHIPowah.address,xICHIAddress,hundred, null_bytes)
            const constituency = await fixture.constituencyAtIndex((await fixture.constituencyCount()).toNumber() - 1)
            expect(constituency == xICHIAddress)
        })
        it('getSupply should be > 1', async() => {
            const supply = await xICHIPowah.getSupply(xICHIAddress)
            expect(!supply.isNegative)
            expect(!supply.isZero)
        })
        it('getPowah shoud be > 1', async() => {
            const wallet = '0xef03c219614c5b2532f9bE17f92E2CcB2c1Eb005'
            const powah = await xICHIPowah.getPowah(xICHIAddress, wallet, null_bytes)
            expect(!powah.isNegative)
            expect(!powah.isZero)
        })
    })
})