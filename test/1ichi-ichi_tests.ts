import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { OneINCHPowah } from '../typechain/oneINCHPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { powahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('1INCH-ICHI', () => {
    let oneINCHPowah: OneINCHPowah
    let fixture: ICHIPowah
    const oneINCH_ICHI_Address = "0x1dcE26F543E591c27717e25294AEbbF59AD9f3a5"
    const hundred = BigNumber.from(100)

    beforeEach(async () => {
        
        // 1
        const [deployer, user] = await ethers.getSigners()

        // 2
        const oneINCHPowahFactory = await ethers.getContractFactory('oneINCHPowah')
        oneINCHPowah = (await oneINCHPowahFactory.deploy()) as OneINCHPowah
        await oneINCHPowah.deployed()

        // 3 
        fixture = (await powahFixture()).fixture

    })

    describe('Return Values', async() => {
        it('Number of constituency should be 1', async() => {
            //can really only test this for forks on mainnet
            await fixture.insertConstituency(oneINCHPowah.address,oneINCH_ICHI_Address,hundred)
            const count = await fixture.constituencyCount()
            expect(count.toNumber()).to.equal(1)
        })
        it('Check constituency added', async() => {
            await fixture.insertConstituency(oneINCHPowah.address,oneINCH_ICHI_Address,hundred)
            const constituency = await fixture.constituencyAtIndex((await fixture.constituencyCount()).toNumber() - 1)
            expect(constituency).to.equal(oneINCH_ICHI_Address)
        })
        it('getSupply should be > 1', async() => {
            const supply = await oneINCHPowah.getSupply(oneINCH_ICHI_Address)
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1', async() => {
            const wallet = "0x11111D16485aa71D2f2BfFBD294DCACbaE79c1d4"
            const powah = await oneINCHPowah.getPowah(oneINCH_ICHI_Address, wallet)
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
    })
})