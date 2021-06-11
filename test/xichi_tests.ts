import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { XICHIPowah } from '../typechain/xICHIPowah'

chai.use(solidity);
const { expect } = chai;

describe('xICHI_Powah', () => {
    let xICHIPowah: XICHIPowah

    beforeEach(async () => {
        
        // 1
        const [deployer, user] = await ethers.getSigners()

        // 2
        const xICHIPowahFactory = await ethers.getContractFactory('xICHIPowah')
        xICHIPowah = (await xICHIPowahFactory.deploy()) as XICHIPowah
        await xICHIPowah.deployed()

    })

    describe('Return Values', async() => {
        it('totalSupply should be > 1', async() => {
            const supply = await xICHIPowah.totalSupply()
            expect(!supply.isNegative)
            expect(!supply.isZero)
        })
    })
})