import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { XICHIRariPowah } from '../typechain/xICHIRariPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { powahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('xICHI_Powah', () => {
    let xICHIRariPowah: XICHIRariPowah
    let fixture: ICHIPowah
    const xICHIRariAddress = "0xb7Abc13dB4aeaEA90A17aE46291317Ef8554F076"
    const null_bytes = ethers.constants.HashZero

    beforeEach(async () => {
        
        // 1
        const [deployer, user] = await ethers.getSigners()

        // 2
        const xICHIRariPowahFactory = await ethers.getContractFactory('xICHIRariPowah')
        xICHIRariPowah = (await xICHIRariPowahFactory.deploy()) as XICHIRariPowah
        await xICHIRariPowah.deployed()

        // 3 
        fixture = (await powahFixture()).fixture

    })

    describe('Return Values', async() => {
        it('getSupply should be > 1', async() => {
            const supply = await xICHIRariPowah.getSupply(xICHIRariAddress)
            expect(!supply.isNegative)
            expect(!supply.isZero)
        })
        it('getPowah shoud be > 1', async() => {
            const wallet = '0x4fe5f268e5053a05108ebaf13ebd9a825e6fb6f2'
            const powah = await xICHIRariPowah.getPowah(xICHIRariAddress, wallet, null_bytes)
            expect(!powah.isNegative)
            expect(!powah.isZero)
        })
    })
})