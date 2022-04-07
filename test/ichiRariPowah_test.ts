import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { ICHIRariPowah } from '../typechain/ICHIRariPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { powahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('ICHIRari_Powah', () => {
    let ICHIRari: ICHIRariPowah
    let fixture: ICHIPowah
    const ICHIRariAddress = "0xaFf95ac1b0A78Bd8E4f1a2933E373c66CC89C0Ce"
    const null_bytes = ethers.constants.HashZero

    beforeEach(async () => {
        
        // 1
        const [deployer, user] = await ethers.getSigners()

        // 2
        const ICHIRariFactory = await ethers.getContractFactory('xICHIRariPowah')
        ICHIRari = (await ICHIRariFactory.deploy()) as ICHIRariPowah
        await ICHIRari.deployed()

        // 3 
        fixture = (await powahFixture()).fixture

    })

    describe('Return Values', async() => {
        it('getSupply should be > 1', async() => {
            const supply = await ICHIRari.getSupply(ICHIRariAddress)
            expect(!supply.isNegative)
            expect(!supply.isZero)
        })
        it('getPowah shoud be > 1', async() => {
            const wallet = '0xc8b5c6363ad036883fc663766ecd87928ad3dc36'
            const powah = await ICHIRari.getPowah(ICHIRariAddress, wallet, null_bytes)
            expect(!powah.isNegative)
            expect(!powah.isZero)
        })
    })
})