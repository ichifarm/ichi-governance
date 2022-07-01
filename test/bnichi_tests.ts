import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { BnICHIPowah } from '../typechain/BnICHIPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { powahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('bnICHI_Powah', () => {
    let bnICHIPowah: BnICHIPowah
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

    })

    describe('Return Values', async() => {
        it('Number of constituency should be 1', async() => {
            //can really only test this for forks on mainnet
            await fixture.insertConstituency(bnICHIPowah.address,BancorICHIAddress,hundred, null_bytes)
            const count = await fixture.constituencyCount()
            expect(count.toNumber() == 1)
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
        it('getPowah shoud be > 1', async() => {
            const wallet = '0xef03c219614c5b2532f9bE17f92E2CcB2c1Eb005'
            const powah = await bnICHIPowah.getPowah(BancorICHIAddress, wallet, null_bytes)
            expect(!powah.isNegative)
            expect(!powah.isZero)
        })
    })
})